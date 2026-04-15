import { Request, Response, Router } from "express";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "api",
    uptimeSeconds: Number(process.uptime().toFixed(2)),
    timestamp: new Date().toISOString()
  });
});

router.get("/ready", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ready",
    service: "api",
    timestamp: new Date().toISOString()
  });
});

export default router;
