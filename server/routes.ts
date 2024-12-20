import type { Express } from "express";
import { createServer, type Server } from "http";

export function registerRoutes(app: Express): Server {
  app.post("/api/compare", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ message: "Query is required" });
      }

      // Simulate API responses for demo
      // In production, these would be real API calls to respective services
      const responses = {
        openai: "This is a simulated OpenAI response to: " + query,
        perplexity: "This is a simulated Perplexity response to: " + query,
        cloud: "This is a simulated Cloud AI response to: " + query,
      };

      // Add artificial delay to simulate network latency
      await new Promise(resolve => setTimeout(resolve, 1000));

      res.json(responses);
    } catch (error) {
      console.error("Error processing AI comparison:", error);
      res.status(500).json({ message: "Failed to process AI comparison" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
