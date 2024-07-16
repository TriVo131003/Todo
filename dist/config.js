"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL ||
        "postgres://postgres:131003@localhost:5432/postgres",
    nodeEnv: process.env.NODE_ENV || "development",
};
exports.config = config;
const pool = new pg_1.Pool({
    connectionString: config.databaseUrl,
});
exports.pool = pool;
