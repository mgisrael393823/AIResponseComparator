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
        cloud: "This is a simulated Cloud AI response to: " + query,
      };

      res.json(responses);
    } catch (error) {
      console.error("Error processing AI comparison:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to process AI comparison" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}