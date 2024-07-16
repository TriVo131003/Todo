"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const user_service_1 = require("../services/user.service");
const signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await (0, user_service_1.registerUser)(username, password);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: "register fail" });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await (0, user_service_1.authenticateUser)(username, password);
        res.json({ token });
    }
    catch (error) {
        res.status(400).json({ error: "login fail" });
    }
};
exports.login = login;
