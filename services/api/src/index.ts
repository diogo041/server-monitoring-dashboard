import express, { Request, Response } from "express";
import { requestLogger } from "./middleware/requestLogger";
import healthRoutes from "./routes/health";
import metricsRoutes from "./routes/metrics";

const app = express();
const PORT = 4100;

app.use(express.json());
app.use(requestLogger);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Server Monitoring Dashboard API is running"
  });
});

app.use("/", healthRoutes);
app.use("/", metricsRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
