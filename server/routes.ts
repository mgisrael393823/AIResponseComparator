import type { Express } from "express";
import { createServer, type Server } from "http";
import { getOpenAIResponse } from "./services/openai";
import { getClaudeResponse } from "./services/claude";

export function registerRoutes(app: Express): Server {
  app.post("/api/compare", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ message: "Query is required" });
      }

      // Execute API calls in parallel and handle individual failures
      const [openaiResponse, claudeResponse] = await Promise.allSettled([
        getOpenAIResponse(query),
        getClaudeResponse(query)
      ]);

      const responses = {
        openai: openaiResponse.status === 'fulfilled' ? openaiResponse.value : 'Error: Failed to get OpenAI response',
        perplexity: "This is a simulated Perplexity response to: " + query,
        claude: claudeResponse.status === 'fulfilled' ? claudeResponse.value : 'Error: Failed to get Claude response',
      };

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