import { Pool, PoolClient } from "pg";
import { Todo } from "../schemas/todo.schema";
import { TodoModel } from "../models/todo.model";
async function addTodo(
  title: string,
  description: string,
  db: Pool | PoolClient
): Promise<Todo> {
  const todoModel = new TodoModel(db);
  return await todoModel.createTodo(title, description);
}

async function getTodoById(
  todoId: number,
  db: Pool | PoolClient
): Promise<Todo | null> {
  const todoModel = new TodoModel(db);
  return await todoModel.findTodoById(todoId);
}

async function getTodoList(db: Pool | PoolClient): Promise<Todo[] | null> {
  const todoModel = new TodoModel(db);
  return await todoModel.getTodoList();
}

async function updateTodo(
  todoId: number,
  title: string,
  description: string,
  isCompleted: boolean,
  db: Pool | PoolClient
): Promise<Todo> {
  const todoModel = new TodoModel(db);
  return await todoModel.updateTodo(
    todoId,
    title,
    description,
    isCompleted ? "true" : "false"
  );
}

async function deleteTodo(
  todoId: number,
  db: Pool | PoolClient
): Promise<Todo> {
  const todoModel = new TodoModel(db);
  return await todoModel.deleteTodo(todoId);
}

async function getTodosByUserId(
  userId: number,
  db: Pool | PoolClient
): Promise<Todo[]> {
  const todoModel = new TodoModel(db);
  return await todoModel.findTodosByUserId(userId);
}

const TodoService = {
  addTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  getTodoList,
  getTodosByUserId,
};

export default TodoService;
