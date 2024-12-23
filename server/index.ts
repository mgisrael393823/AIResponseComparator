import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // Create HTTP server
    const server = registerRoutes(app);

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`Error: ${status} - ${message}`);
      res.status(status).json({ message });
      throw err;
    });

    // Setup environment-specific middleware
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Always serve on port 5000 as required by Replit
    const PORT = 5000;
    server.listen(PORT, "0.0.0.0", () => {
      log(`Server successfully started and listening on port ${PORT}`);
      // Log additional information about the server binding
      log(`Server is bound to all interfaces (0.0.0.0) for custom domain support`);
      log(`Environment: ${app.get("env")}`);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      log("Received SIGTERM signal, shutting down gracefully");
      server.close(() => {
        log("Server closed");
        process.exit(0);
      });
    });

  } catch (error) {
    log(`Fatal error: ${error}`);
    process.exit(1);
  }
})();