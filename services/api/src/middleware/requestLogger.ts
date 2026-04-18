import { NextFunction, Request, Response } from "express";
import { httpRequestDurationMs, httpRequestTotal } from "../lib/metrics";

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

    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${durationMs}ms`
    );

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
  });

  next();
};
