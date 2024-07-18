import express, { Request, Response, NextFunction, Express } from "express";
import { router } from "./routes";
import { config } from "./config";
import cookieParser from "cookie-parser";

export const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
