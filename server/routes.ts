import type { Express } from "express";
import { createServer, type Server } from "http";
import { getOpenAIResponse } from "./services/openai";
import { getClaudeResponse } from "./services/claude";
import { getGeminiResponse } from "./services/gemini";

export function registerRoutes(app: Express): Server {
  app.post("/api/compare", async (req, res) => {
    try {
      console.log("Received compare request:", req.body);
      const { query } = req.body;

      if (!query) {
        return res.status(400).json({ message: "Query is required" });
      }

      // Execute API calls in parallel and handle individual failures
      const [openaiResponse, geminiResponse, claudeResponse] = await Promise.allSettled([
        getOpenAIResponse(query).catch(error => {
          console.error("OpenAI API error:", error);
          return `Error: ${error.message}`;
        }),
        getGeminiResponse(query).catch(error => {
          console.error("Gemini API error:", error);
          return `Error: ${error.message}`;
        }),
        getClaudeResponse(query).catch(error => {
          console.error("Claude API error:", error);
          return `Error: ${error.message}`;
        })
      ]);

      const responses = {
        openai: openaiResponse.status === 'fulfilled' ? openaiResponse.value : 'Failed to get OpenAI response',
        gemini: geminiResponse.status === 'fulfilled' ? geminiResponse.value : 'Failed to get Gemini response',
        claude: claudeResponse.status === 'fulfilled' ? claudeResponse.value : 'Failed to get Claude response',
      };

      console.log("Sending responses:", responses);
      res.json(responses);
    } catch (error) {
      console.error("Error processing AI comparison:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to process AI comparison";
      const statusCode = errorMessage.includes('API key') ? 401 : 500;

      res.status(statusCode).json({ message: errorMessage });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}