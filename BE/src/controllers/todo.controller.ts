import { Request, Response } from "express";
import { pool } from "../config";
import TodoService from "../services/todo.service";
import { StatusCodes } from "http-status-codes";

export async function addTodo(req: Request, res: Response) {
  const { title, description } = req.body;
  try {
    const todo = await TodoService.addTodo(title, description, pool);
    res.status(StatusCodes.CREATED).json({
      message: "Todo added successfully",
      todo,
    });
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Failed to add todo" });
  }
}

export async function updateTodo(req: Request, res: Response) {
  const todoId = req.params.id;
  const { title, description, isCompleted } = req.body;
  try {
    const todo = await TodoService.updateTodo(
      Number(todoId),
      title,
      description,
      isCompleted,
      pool
    );
    res.status(StatusCodes.OK).json({
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Failed to update todo" });
  }
}

export async function getTodoList(req: Request, res: Response) {
  try {
    const todos = await TodoService.getTodoList(pool);
    res.status(StatusCodes.OK).json(todos);
  } catch (error) {
    console.error("Error retrieving todo list:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve todo list" });
  }
}

export async function getTodoById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const todo = await TodoService.getTodoById(Number(id), pool);
    if (todo) {
      res.status(StatusCodes.OK).json(todo);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.error("Error retrieving todo:", error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Failed to retrieve todo" });
  }
}

export async function deleteTodo(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await TodoService.deleteTodo(Number(id), pool);
    res.status(StatusCodes.OK).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Failed to delete todo" });
  }
}

export async function getTodosByUserId(req: Request, res: Response) {
  const userId = req.params.userId;
  try {
    const todos = await TodoService.getTodosByUserId(Number(userId), pool);
    res.status(StatusCodes.OK).json(todos);
  } catch (error) {
    console.error("Error retrieving todos:", error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Failed to retrieve todos" });
  }
}
