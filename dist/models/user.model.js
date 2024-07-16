"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.findUserByUsername = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../config");
const createUser = async (username, password) => {
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const result = await config_1.pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username", [username, hashedPassword]);
    return result.rows[0];
};
exports.createUser = createUser;
const findUserByUsername = async (username) => {
    const result = await config_1.pool.query("SELECT * FROM users WHERE username = $1", [
        username,
    ]);
    return result.rows.length > 0 ? result.rows[0] : null;
};
exports.findUserByUsername = findUserByUsername;
const findUserById = async (id) => {
    const result = await config_1.pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};
exports.findUserById = findUserById;
