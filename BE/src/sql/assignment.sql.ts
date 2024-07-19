import knex from "knex";
import { QueryConfig } from "pg";

export function createAssignment(
  todoId: number,
  userId: number,
  create_by: number
): QueryConfig {
  const created_at = new Date().toISOString();
  const query = knex({
    client: "pg",
  })
    .table("assignments")
    .insert({
      todo_id: todoId,
      user_id: userId,
      created_at,
      create_by,
    })
    .returning(["*"])
    .toSQL()
    .toNative();

  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}

export function getAllAssignment(): QueryConfig {
  const query = knex({
    client: "pg",
  })
    .from("assignments")
    .select("*")
    .toSQL()
    .toNative();

  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}

export function getAssignmentById(assignmentId: number): QueryConfig {
  const query = knex({
    client: "pg",
  })
    .from("assignments")
    .select("assignment_id AS id", "todo_id", "user_id", "assigned_at")
    .where("assignment_id", assignmentId)
    .toSQL()
    .toNative();

  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}

export function updateAssignment(
  assignmentId: number,
  todoId?: number,
  userId?: number,
  update_by?: number
): QueryConfig {
  const updateData: {
    todo_id?: number;
    user_id?: number;
    update_by?: number;
    updated_at?: string;
  } = {};
  if (todoId) updateData.todo_id = todoId;
  if (userId) updateData.user_id = userId;
  updateData.updated_at = new Date().toISOString();
  updateData.update_by = update_by;

  const query = knex({
    client: "pg",
  })
    .table("assignments")
    .where("assignment_id", assignmentId)
    .update(updateData)
    .returning(["*"])
    .toSQL()
    .toNative();

  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}

export function deleteAssignment(assignmentId: number): QueryConfig {
  const query = knex({
    client: "pg",
  })
    .from("assignments")
    .where("assignment_id", assignmentId)
    .del()
    .returning(["assignment_id AS id", "todo_id", "user_id", "assigned_at"])
    .toSQL()
    .toNative();

  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}
