import knex from "knex";
import { QueryConfig } from "pg";

export function createTodo(
  title: string,
  description: string,
  create_by: number
): QueryConfig {
  const createdAt = new Date().toISOString();
  const query = knex({
    client: "pg",
  })
    .table("todos")
    .insert({
      title,
      description,
      create_by: create_by,
      created_at: createdAt,
    })
    .returning(["*"])
    .toSQL()
    .toNative();

  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}

export function getTodoList(): QueryConfig {
  const query = knex({
    client: "pg",
  })
    .select("*")
    .from("todos")
    .toSQL()
    .toNative();

  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}

export function getTodoById(todoId: number): QueryConfig {
  const query = knex({
    client: "pg",
  })
    .select("*")
    .from("todos")
    .where("todo_id", todoId)
    .toSQL()
    .toNative();

  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}

export function updateTodo(
  todoId: number,
  title?: string,
  description?: string,
  is_completed?: string,
  update_by?: number
): QueryConfig {
  const updateData: {
    title?: string;
    description?: string;
    is_completed?: string;
    updated_at?: string;
    update_by?: number;
  } = {};
  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (is_completed) updateData.is_completed = is_completed;
  updateData.updated_at = new Date().toISOString();
  updateData.update_by = update_by;
  const query = knex({
    client: "pg",
  })
    .table("todos")
    .where("todo_id", todoId)
    .update(updateData)
    .returning(["*"])
    .toSQL()
    .toNative();

  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}

export function deleteTodo(todoId: number): QueryConfig {
  const query = knex({
    client: "pg",
  })
    .from("todos")
    .where("todo_id", todoId)
    .del()
    .returning(["*"])
    .toSQL()
    .toNative();

  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}

export function getTodosByUserId(userId: number): QueryConfig {
  const query = knex({
    client: "pg",
  })
    .select("todos.*")
    .from("todos")
    .join("assignments", "todos.todo_id", "assignments.todo_id")
    .where("assignments.user_id", userId)
    .toSQL()
    .toNative();

  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}
