"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "strongpassword";
const registerUser = async (username, password) => {
    const existingUser = await (0, user_model_1.findUserByUsername)(username);
    if (existingUser) {
        throw new Error("User already exists");
    }
    return await (0, user_model_1.createUser)(username, password);
};
exports.registerUser = registerUser;
const authenticateUser = async (username, password) => {
    const user = await (0, user_model_1.findUserByUsername)(username);
    if (!user || !(await bcryptjs_1.default.compare(password, user.password_hash))) {
        throw new Error("Invalid username or password");
    }
    return jsonwebtoken_1.default.sign({ id: user.user_id, username: user.username }, JWT_SECRET, {
        expiresIn: "1h",
    });
};
exports.authenticateUser = authenticateUser;
