import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgres://postgres:131003@localhost:5432/postgres",
  nodeEnv: process.env.NODE_ENV || "development",
};

const pool = new Pool({
  connectionString: config.databaseUrl,
});

export { config, pool };
