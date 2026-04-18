import { Request, Response, Router } from "express";
import { register } from "../lib/metrics";

const router = Router();

router.get("/metrics", async (_req: Request, res: Response) => {
  try {
    res.setHeader("Content-Type", register.contentType);
    res.status(200).send(await register.metrics());
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to generate metrics",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;
