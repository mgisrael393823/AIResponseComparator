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
  const server = registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Try multiple ports if the default is in use
  const startServer = async (port: number = 5000, maxRetries: number = 3): Promise<void> => {
    return new Promise((resolve, reject) => {
      const handleError = (error: any) => {
        if (error.code === 'EADDRINUSE' && maxRetries > 0) {
          log(`Port ${port} in use, trying port ${port + 1}`);
          server.removeAllListeners();
          startServer(port + 1, maxRetries - 1)
            .then(resolve)
            .catch(reject);
        } else {
          log(`Failed to start server: ${error.message}`);
          reject(error);
        }
      };

      server.once('error', handleError);

      server.listen(port, "0.0.0.0", () => {
        log(`serving on port ${port}`);
        resolve();
      });
    });
  };

  try {
    await startServer();
  } catch (error) {
    log(`Fatal error starting server: ${error}`);
    process.exit(1);
  }
})();