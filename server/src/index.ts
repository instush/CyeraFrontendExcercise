import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import apiRouter from "./api";
import { loadEnvs, printEnvs } from "./utils/env-utils";

// Load environment variables
loadEnvs();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running");
});

app.use("/api", apiRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  printEnvs();
});
