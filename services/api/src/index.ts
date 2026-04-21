import express, { NextFunction, Request, Response } from "express";
import { requestLogger } from "./middleware/requestLogger";
import healthRoutes from "./routes/health";
import metricsRoutes from "./routes/metrics";
import { logger } from "./utils/logger";

const app = express();
const PORT = 4100;

app.use(express.json());
app.use(requestLogger);

app.get("/", (_req: Request, res: Response) => {
  logger.info("root_endpoint_requested", {
    event: "root_endpoint_requested",
    service: "api"
  });

  res.json({
    message: "Server Monitoring Dashboard API is running"
  });
});

app.use("/", healthRoutes);
app.use("/", metricsRoutes);

app.use((req: Request, res: Response) => {
  logger.warn("route_not_found", {
    event: "route_not_found",
    method: req.method,
    route: req.originalUrl
  });

  res.status(404).json({
    message: "Route not found"
  });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error("unhandled_application_error", {
    event: "unhandled_application_error",
    error: error.message
  });

  res.status(500).json({
    message: "Internal server error"
  });
});

app.listen(PORT, () => {
  logger.info("api_server_started", {
    event: "api_server_started",
    port: PORT,
    service: "api"
  });
});
