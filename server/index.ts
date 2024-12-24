import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import dns from 'dns';
import { exec } from 'child_process';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Clean up any existing process on port 5000
const cleanupPort = () => {
  return new Promise<void>((resolve, reject) => {
    log('Attempting to clean up port 5000...');
    exec('kill-port 5000', (error) => {
      if (error) {
        log('No existing process on port 5000 to clean up');
      } else {
        log('Successfully cleaned up port 5000');
      }
      resolve();
    });
  });
};

// Reduce DNS logging frequency to prevent log flooding
let lastDNSLog = 0;
const DNS_LOG_INTERVAL = 60000; // Log DNS resolutions once per minute

app.use((req, res, next) => {
  const now = Date.now();
  const hostname = req.hostname;

  // Only log DNS resolutions periodically
  if (now - lastDNSLog >= DNS_LOG_INTERVAL) {
    dns.resolve(hostname, (err, addresses) => {
      if (err) {
        log(`DNS Resolution Error for ${hostname}: ${err.message}`);
      } else {
        log(`DNS Resolution Success for ${hostname}: ${addresses.join(', ')}`);
      }
      lastDNSLog = now;
    });
  }
  next();
});

// Enhanced request logging middleware
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
        const responsePreview = JSON.stringify(capturedJsonResponse).slice(0, 50);
        logLine += ` :: ${responsePreview}${responsePreview.length > 50 ? '...' : ''}`;
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    log('Starting server initialization...');

    // Clean up port before starting
    await cleanupPort();

    // Create HTTP server
    log('Creating HTTP server...');
    const server = registerRoutes(app);

    // Error handling middleware with improved logging
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      const stack = app.get('env') === 'development' ? err.stack : undefined;

      log(`Error [${status}]: ${message}`);
      if (stack) {
        log(`Stack trace: ${stack}`);
      }

      res.status(status).json({ message });
    });

    // Setup environment-specific middleware
    if (app.get("env") === "development") {
      log('Setting up development middleware...');
      await setupVite(app, server);
    } else {
      log('Setting up production middleware...');
      serveStatic(app);
    }

    // Always serve on port 5000
    const PORT = 5000;

    const startServer = () => {
      server.listen(PORT, "0.0.0.0", () => {
        log('=== Server Status ===');
        log(`✓ Server successfully started on port ${PORT}`);
        log(`✓ Bound to all interfaces (0.0.0.0)`);
        log(`✓ Environment: ${app.get("env")}`);
        log(`✓ Checking DNS resolution...`);

        // Check DNS resolution for the server
        dns.resolve4('0.0.0.0', (err, addresses) => {
          if (err) {
            log(`! DNS Initial Check Error: ${err.message}`);
          } else {
            log(`✓ DNS Initial Check Success: ${addresses.join(', ')}`);
          }
        });
      }).on('error', (err: NodeJS.ErrnoException) => {
        if (err.code === 'EADDRINUSE') {
          log(`! Port ${PORT} is already in use. Attempting cleanup...`);
          cleanupPort().then(() => {
            log('Retrying server start in 1 second...');
            setTimeout(startServer, 1000);
          });
        } else {
          log(`! Critical server error: ${err.message}`);
          throw err;
        }
      });
    };

    startServer();

    // Graceful shutdown
    process.on("SIGTERM", () => {
      log("Received SIGTERM signal, initiating graceful shutdown...");
      server.close(() => {
        log("Server closed successfully");
        process.exit(0);
      });
    });

  } catch (error) {
    log(`! Fatal server error: ${error}`);
    process.exit(1);
  }
})();