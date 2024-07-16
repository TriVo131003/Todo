"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/todoapp',
    nodeEnv: process.env.NODE_ENV || 'development',
};
exports.default = config;
