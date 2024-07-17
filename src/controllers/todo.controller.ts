import { Request, Response } from "express";
import { pool } from "../config";
import TodoService from "../services/todo.service";

export async function addTodo(req: Request, res: Response) {
  const { title, description } = req.body;
  try {
    const user = await TodoService.addTodo(title, description, pool);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "register fail" });
  }
}

export async function updateTodo(req: Request, res: Response) {
  const todoId = req.params.id;
  const { title, description, isCompleted } = req.body;
  try {
    const user = await TodoService.updateTodo(
      Number(todoId),
      title,
      description,
      isCompleted,
      pool
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "register fail" });
  }
}

export async function getTodoById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const user = await TodoService.getTodoById(Number(id), pool);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "register fail" });
  }
}

export async function deleteTodo(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const user = await TodoService.deleteTodo(Number(id), pool);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "register fail" });
  }
}
