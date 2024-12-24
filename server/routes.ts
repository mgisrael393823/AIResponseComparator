import type { Express } from "express";
import { createServer, type Server } from "http";
import { getOpenAIResponse } from "./services/openai";
import { getClaudeResponse } from "./services/claude";
import { getGeminiResponse } from "./services/gemini";
import { log } from "./vite";
import { db } from "@db";
import { apiSettings } from "@db/schema";
import { eq } from "drizzle-orm";

interface AttachedFile {
  name: string;
  content: string;
  type: string;
}

export function registerRoutes(app: Express): Server {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "healthy" });
  });

  // Get API settings
  app.get("/api/settings", async (req, res) => {
    try {
      // For now, we'll just return the first user's settings
      // In a real app, you'd get the current user's ID from the session
      const settings = await db.query.apiSettings.findFirst();

      // Return masked API keys
      if (settings) {
        const maskedSettings = {
          openaiApiKey: settings.openaiApiKey ? "••••" + settings.openaiApiKey.slice(-4) : "",
          anthropicApiKey: settings.anthropicApiKey ? "••••" + settings.anthropicApiKey.slice(-4) : "",
          geminiApiKey: settings.geminiApiKey ? "••••" + settings.geminiApiKey.slice(-4) : "",
        };
        res.json(maskedSettings);
      } else {
        res.json({
          openaiApiKey: "",
          anthropicApiKey: "",
          geminiApiKey: "",
        });
      }
    } catch (error) {
      log(`Error fetching API settings: ${error}`);
      res.status(500).json({ message: "Failed to fetch API settings" });
    }
  });

  // Update API settings
  app.post("/api/settings", async (req, res) => {
    try {
      const { openaiApiKey, anthropicApiKey, geminiApiKey } = req.body;

      // For now, we'll just update the first user's settings
      // In a real app, you'd get the current user's ID from the session
      const existingSettings = await db.query.apiSettings.findFirst();

      if (existingSettings) {
        await db.update(apiSettings)
          .set({ openaiApiKey, anthropicApiKey, geminiApiKey })
          .where(eq(apiSettings.id, existingSettings.id));
      } else {
        await db.insert(apiSettings).values({
          userId: 1, // Temporary: In real app, get from session
          openaiApiKey,
          anthropicApiKey,
          geminiApiKey,
        });
      }

      res.json({ message: "Settings updated successfully" });
    } catch (error) {
      log(`Error updating API settings: ${error}`);
      res.status(500).json({ message: "Failed to update API settings" });
    }
  });

  app.post("/api/compare", async (req, res) => {
    try {
      const { query, files } = req.body;
      const queryText = query || '';
      const attachments = (files || []) as AttachedFile[];

      log(`Processing compare request with query: "${queryText.substring(0, 50)}..."`);

      if (!queryText.trim() && attachments.length === 0) {
        log("Invalid request: missing query and files");
        return res.status(400).json({ 
          message: "Invalid request: must provide either text or files" 
        });
      }

      const contextString = attachments.length 
        ? `${queryText}\n[Attached files: ${attachments.map((f: AttachedFile) => f.name).join(', ')}]`
        : queryText;

      log(`Making API requests with context: "${contextString.substring(0, 50)}..."`);

      // Get API settings
      const settings = await db.query.apiSettings.findFirst();
      if (!settings) {
        return res.status(400).json({ 
          message: "Please configure your API keys in settings first" 
        });
      }

      // Execute API calls in parallel with user's API keys
      const results = await Promise.allSettled([
        getOpenAIResponse(contextString, settings.openaiApiKey).catch(err => {
          log(`OpenAI API error: ${err.message}`);
          throw err;
        }),
        getGeminiResponse(contextString, settings.geminiApiKey).catch(err => {
          log(`Gemini API error: ${err.message}`);
          throw err;
        }),
        getClaudeResponse(contextString, settings.anthropicApiKey).catch(err => {
          log(`Claude API error: ${err.message}`);
          throw err;
        })
      ]);

      // Process results
      const responses = {
        openai: results[0].status === 'fulfilled' ? results[0].value : null,
        gemini: results[1].status === 'fulfilled' ? results[1].value : null,
        claude: results[2].status === 'fulfilled' ? results[2].value : null
      };

      // Log the response status for each API
      Object.entries(responses).forEach(([api, response]) => {
        log(`${api} API response status: ${response ? 'success' : 'failed'}`);
      });

      // Check if all responses failed
      const allFailed = Object.values(responses).every(r => r === null);
      if (allFailed) {
        log("All AI services failed to respond");
        return res.status(502).json({ 
          message: "All AI services failed to respond" 
        });
      }

      res.json(responses);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      const statusCode = errorMessage.includes('API key') ? 401 : 500;

      log(`Error in /api/compare: ${errorMessage}`);
      res.status(statusCode).json({ message: errorMessage });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}