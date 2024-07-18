// src/routes/user.routes.js
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

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 */

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: To-Do management
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Invalid credentials
 */
router.post("/auth/login", userController.login);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [Authentication]
 *     summary: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully signed up
 *       400:
 *         description: Validation error
 */
router.post("/auth/signup", validateData(userSchema), userController.signup);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Authentication]
 *     summary: Log out a user
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *           example: access_token=123
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized
 *     security:
 *       - cookieAuth: []
 */
router.post("/auth/logout", authenticateJWT, userController.logout);

/**
 * @swagger
 * /auth/{username}:
 *   get:
 *     tags: [Authentication]
 *     summary: Get user information
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *           example: access_token=123
 *     responses:
 *       200:
 *         description: Successfully retrieved user information
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.get("/auth/:username", authenticateJWT, userController.getUserInfor);

/**
 * @swagger
 * /todo:
 *   get:
 *     tags: [Todos]
 *     summary: Get all to-dos
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *           example: access_token=123
 *     responses:
 *       200:
 *         description: Successfully retrieved to-dos
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get("/todo", authenticateJWT, todoController.getTodoList);

/**
 * @swagger
 * /todo/{id}:
 *   get:
 *     tags: [Todos]
 *     summary: Get a to-do by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *           example: access_token=123
 *     responses:
 *       200:
 *         description: Successfully retrieved to-do
 *       400:
 *         description: Bad request
 *       404:
 *         description: To-do not found
 *       401:
 *         description: Unauthorized
 */
router.get("/todo/:id", authenticateJWT, todoController.getTodoById);

/**
 * @swagger
 * /todo:
 *   post:
 *     tags: [Todos]
 *     summary: Add a new to-do
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *           example: access_token=123
 *     responses:
 *       201:
 *         description: Successfully added to-do
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/todo", authenticateJWT, todoController.addTodo);

/**
 * @swagger
 * /todo/{id}:
 *   put:
 *     tags: [Todos]
 *     summary: Update a to-do
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *           example: access_token=123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated to-do
 *       400:
 *         description: Bad request
 *       404:
 *         description: To-do not found
 *       401:
 *         description: Unauthorized
 */
router.put("/todo/:id", authenticateJWT, todoController.updateTodo);

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     tags: [Todos]
 *     summary: Delete a to-do
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *           example: access_token=123
 *     responses:
 *       200:
 *         description: Successfully deleted to-do
 *       400:
 *         description: Bad request
 *       404:
 *         description: To-do not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/todo/:id", authenticateJWT, todoController.deleteTodo);

/**
 * @swagger
 * /users/{userId}/todos:
 *   get:
 *     tags: [Todos]
 *     summary: Get to-dos by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *           example: access_token=123
 *     responses:
 *       200:
 *         description: Successfully retrieved to-dos
 *       400:
 *         description: Bad request
 *       404:
 *         description: User or to-dos not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/users/:userId/todos",
  authenticateJWT,
  todoController.getTodosByUserId
);

/**
 * @swagger
 * /assignment/:
 *   get:
 *     tags: [Assignment]
 *     summary: Get all assignments
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *           example: access_token=123
 *     responses:
 *       200:
 *         description: Successfully retrieved all assignments
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *     security:
 *       - cookieAuth: []
 */
router.get(
  "/assignment/",
  authenticateJWT,
  assignmentController.getAllAssignment
);

/**
 * @swagger
 * /assignment/{id}:
 *   get:
 *     tags: [Assignment]
 *     summary: Get an assignment by ID
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string

 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the assignment
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       404:
 *         description: Assignment not found
 *     security:
 *       - cookieAuth: []
 */
router.get(
  "/assignment/:id",
  authenticateJWT,
  assignmentController.getAssignmentById
);

/**
 * @swagger
 * /assignment/:
 *   post:
 *     tags: [Assignment]
 *     summary: Add a new assignment
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todoId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Successfully created an assignment
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *     security:
 *       - cookieAuth: []
 */
router.post(
  "/assignment/",
  authenticateJWT,
  assignmentController.addAssignment
);

/**
 * @swagger
 * /assignment/{id}:
 *   put:
 *     tags: [Assignment]
 *     summary: Update an assignment by ID
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todoId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully updated the assignment
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       404:
 *         description: Assignment not found
 *     security:
 *       - cookieAuth: []
 */
router.put(
  "/assignment/:id",
  authenticateJWT,
  assignmentController.updateAssignment
);

/**
 * @swagger
 * /assignment/{id}:
 *   delete:
 *     tags: [Assignment]
 *     summary: Delete an assignment by ID
 *     parameters:
 *       - in: header
 *         name: Cookie
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted the assignment
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       404:
 *         description: Assignment not found
 *     security:
 *       - cookieAuth: []
 */
router.delete(
  "/assignment/:id",
  authenticateJWT,
  assignmentController.deleteAssignment
);

router.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "This route is protected." });
});
