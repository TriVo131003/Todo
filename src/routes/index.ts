import express from "express";
import * as userController from "../controllers/user.controller";
import * as todoController from "../controllers/todo.controller";
import {
  authenticateJWT,
  csrfProtection,
} from "../middlewares/authen.middleware";
import { validateData } from "../middlewares/validation.middleware";
import { userSchema } from "../schemas/user.schema";

export const router = express.Router();

router.post("/auth/login", userController.login);

router.post("/auth/signup", validateData(userSchema), userController.signup);

router.post("/auth/logout", authenticateJWT, userController.logout);

router.get("/todo/:id", authenticateJWT, todoController.getTodoById);

router.post("/todo/", authenticateJWT, todoController.addTodo);

router.put("/todo/:id", authenticateJWT, todoController.updateTodo);

router.delete("/todo/:id", authenticateJWT, todoController.deleteTodo);

router.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "This route is protected." });
});
