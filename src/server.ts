import express, { type Express, type Request, type Response } from "express";
import { router } from "./routes";
import { config } from "./config";

export const app: Express = express();

app.use(express.json({ limit: "100mb" }));

app.use((req, res, next) => {
  const url = req.originalUrl;
  const urlSplit = url.split("/");
  next();
});

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api", router);
