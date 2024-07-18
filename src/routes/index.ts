import express from "express";
import * as userController from "../controllers/user.controller";
import * as todoController from "../controllers/todo.controller";
import * as assignmentController from "../controllers/assignment.controller";
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

router.get("/auth/:username", authenticateJWT, userController.getUserInfor);

router.get("/todo/", authenticateJWT, todoController.getTodoList);

router.get("/todo/:id", authenticateJWT, todoController.getTodoById);

router.post("/todo/", authenticateJWT, todoController.addTodo);

router.put("/todo/:id", authenticateJWT, todoController.updateTodo);

router.delete("/todo/:id", authenticateJWT, todoController.deleteTodo);

router.get(
  "/users/:userId/todos",
  authenticateJWT,
  todoController.getTodosByUserId
);

router.get(
  "/assignment/",
  authenticateJWT,
  assignmentController.getAllAssignment
);

router.get(
  "/assignment/:id",
  authenticateJWT,
  assignmentController.getAssignmentById
);

router.post(
  "/assignment/",
  authenticateJWT,
  assignmentController.addAssignment
);

router.put(
  "/assignment/:id",
  authenticateJWT,
  assignmentController.updateAssignment
);

router.delete(
  "/assignment/:id",
  authenticateJWT,
  assignmentController.deleteAssignment
);

router.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "This route is protected." });
});
