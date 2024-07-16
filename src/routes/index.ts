import express from "express";
import * as userController from "../controllers/user.controller";

export const router = express.Router();

router.post("/login", userController.login);

router.post("/signup", userController.signup);
