import type { Express } from "express";
import { createServer, type Server } from "http";
import { getOpenAIResponse } from "./services/openai";

export function registerRoutes(app: Express): Server {
  app.post("/api/compare", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ message: "Query is required" });
      }

      // Get real OpenAI response, keep others simulated for now
      const responses = {
        openai: await getOpenAIResponse(query),
        perplexity: "This is a simulated Perplexity response to: " + query,
        claude: "This is a simulated Claude response to: " + query,
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