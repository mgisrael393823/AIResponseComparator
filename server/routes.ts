import type { Express } from "express";
import { createServer, type Server } from "http";
import { getOpenAIResponse } from "./services/openai";
import { getClaudeResponse } from "./services/claude";
import { getGeminiResponse } from "./services/gemini";

export function registerRoutes(app: Express): Server {
  app.post("/api/compare", async (req, res) => {
    try {
      console.log("Received compare request with body:", req.body);
      const { query } = req.body;

      if (!query || typeof query !== 'string') {
        console.error("Invalid query in request body:", req.body);
        return res.status(400).json({ message: "Query must be a non-empty string" });
      }

      console.log("Processing query:", query);

      // Execute API calls in parallel
      const results = await Promise.allSettled([
        getOpenAIResponse(query),
        getGeminiResponse(query),
        getClaudeResponse(query)
      ]);

      console.log("API responses received:", results);

      // Process results
      const responses = {
        openai: results[0].status === 'fulfilled' ? results[0].value : `Error: ${results[0].status === 'rejected' ? results[0].reason.message : 'Unknown error'}`,
        gemini: results[1].status === 'fulfilled' ? results[1].value : `Error: ${results[1].status === 'rejected' ? results[1].reason.message : 'Unknown error'}`,
        claude: results[2].status === 'fulfilled' ? results[2].value : `Error: ${results[2].status === 'rejected' ? results[2].reason.message : 'Unknown error'}`
      };

      console.log("Sending final response:", responses);
      res.json(responses);
    } catch (error) {
      console.error("Error processing compare request:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      const statusCode = errorMessage.includes('API key') ? 401 : 500;
      res.status(statusCode).json({ message: errorMessage });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}