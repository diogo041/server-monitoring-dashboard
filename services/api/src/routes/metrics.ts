import { Request, Response, Router } from "express";
import { register } from "../lib/metrics";
import { logger } from "../utils/logger";

const router = Router();

router.get("/metrics", async (_req: Request, res: Response) => {
  try {
    logger.info("metrics_requested", {
      event: "metrics_requested",
      service: "api"
    });

    res.setHeader("Content-Type", register.contentType);
    res.status(200).send(await register.metrics());
  } catch (error) {
    logger.error("metrics_generation_failed", {
      event: "metrics_generation_failed",
      service: "api",
      error: error instanceof Error ? error.message : "Unknown error"
    });

    res.status(500).json({
      status: "error",
      message: "Unable to generate metrics",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;
