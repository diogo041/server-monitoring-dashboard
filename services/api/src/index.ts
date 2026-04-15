import express, { Request, Response } from "express";
import { requestLogger } from "./middleware/requestLogger";
import healthRoutes from "./routes/health";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(requestLogger);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Server Monitoring Dashboard API is running"
  });
});

app.use("/", healthRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
