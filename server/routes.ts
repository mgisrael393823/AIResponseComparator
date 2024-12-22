import type { Express } from "express";
import { createServer, type Server } from "http";
import { getOpenAIResponse } from "./services/openai";
import { getClaudeResponse } from "./services/claude";
import { getGeminiResponse } from "./services/gemini";

export function registerRoutes(app: Express): Server {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "healthy" });
  });

  app.post("/api/compare", async (req, res) => {
    try {
      const { query } = req.body;

      if (!query || typeof query !== 'string') {
        return res.status(400).json({ 
          message: "Invalid request: query must be a non-empty string" 
        });
      }

      // Execute API calls in parallel
      const results = await Promise.allSettled([
        getOpenAIResponse(query),
        getGeminiResponse(query),
        getClaudeResponse(query)
      ]);

      // Process results
      const responses = {
        openai: results[0].status === 'fulfilled' ? results[0].value : null,
        gemini: results[1].status === 'fulfilled' ? results[1].value : null,
        claude: results[2].status === 'fulfilled' ? results[2].value : null
      };

      // Check if all responses failed
      const allFailed = Object.values(responses).every(r => r === null);
      if (allFailed) {
        return res.status(502).json({ 
          message: "All AI services failed to respond" 
        });
      }

      res.json(responses);
    } catch (error) {
      console.error("Error in /api/compare:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      const statusCode = errorMessage.includes('API key') ? 401 : 500;
      res.status(statusCode).json({ message: errorMessage });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}