import { NextFunction, Request, Response } from "express";
import { httpRequestDurationMs, httpRequestTotal } from "../lib/metrics";
import { logger } from "../utils/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - startTime;
    const route = req.path || "/";
    const statusCode = res.statusCode.toString();

    httpRequestTotal.inc({
      method: req.method,
      route,
      status_code: statusCode
    });

    httpRequestDurationMs.observe(
      {
        method: req.method,
        route,
        status_code: statusCode
      },
      durationMs
    );

    logger.info("http_request_completed", {
      event: "http_request_completed",
      method: req.method,
      route,
      originalUrl: req.originalUrl,
      statusCode: res.statusCode,
      durationMs,
      ip: req.ip,
      userAgent: req.get("user-agent") ?? "unknown"
    });
  });

  next();
};
