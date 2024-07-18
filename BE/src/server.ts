import express, { Request, Response, NextFunction, Express } from "express";
import { router } from "./routes";
import { config } from "./config";
import cookieParser from "cookie-parser";
import { swaggerDocs, swaggerUi } from "./swagger";
export const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", router);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
