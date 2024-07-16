"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const config_1 = require("./config");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json({ limit: "100mb" }));
exports.app.use((req, res, next) => {
    const url = req.originalUrl;
    const urlSplit = url.split("/");
    next();
});
const PORT = config_1.config.port;
exports.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.app.use("/api", routes_1.router);
