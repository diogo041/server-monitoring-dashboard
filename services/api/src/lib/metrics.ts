import client from "prom-client";

export const register = new client.Registry();

register.setDefaultLabels({
  service: "api"
});

client.collectDefaultMetrics({
  register
});

export const httpRequestTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"] as const,
  registers: [register]
});

export const httpRequestDurationMs = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in milliseconds",
  labelNames: ["method", "route", "status_code"] as const,
  buckets: [50, 100, 200, 300, 500, 1000, 2000, 5000],
  registers: [register]
});
