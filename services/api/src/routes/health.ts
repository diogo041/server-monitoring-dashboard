import { Request, Response, Router } from "express";
import { logger } from "../utils/logger";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  const payload = {
    status: "ok",
    service: "api",
    uptimeSeconds: Number(process.uptime().toFixed(2)),
    timestamp: new Date().toISOString()
  };

  logger.info("health_check_requested", {
    event: "health_check_requested",
    service: "api"
  });

  res.status(200).json(payload);
});

router.get("/ready", (_req: Request, res: Response) => {
  const payload = {
    status: "ready",
    service: "api",
    timestamp: new Date().toISOString()
  };

  logger.info("readiness_check_requested", {
    event: "readiness_check_requested",
    service: "api"
  });

  res.status(200).json(payload);
});

export default router;
