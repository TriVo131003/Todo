import knex from "knex";
import { QueryConfig } from "pg";

export function createTodo(title: string, description: string): QueryConfig {
  const query = knex({
    client: "pg",
  })
    .table("todos")
    .insert({
      title,
      description,
    })
    .returning(["*"])
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
  is_completed?: string
): QueryConfig {
  const updateData: {
    title?: string;
    description?: string;
    is_completed?: string;
  } = {};
  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (is_completed) updateData.is_completed = is_completed;
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