import express, { Request, Response } from "express";

const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Server Monitoring Dashboard API is running"
  });
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "api",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
