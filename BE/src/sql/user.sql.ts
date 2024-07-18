import knex, { Knex } from "knex";
import { QueryConfig } from "pg";
export function createUser(
  username: string,
  password: string,
  email: string
): QueryConfig {
  const query = knex({
    client: "pg",
  })
    .table("users")
    .insert({
      username,
      email,
      password_hash: password,
    })
    .toSQL()
    .toNative();
  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}

export function getUserByUsername(username: string): QueryConfig {
  const query = knex({
    client: "pg",
  })
    .select("*")
    .from("users")
    .where("username", username)
    .toSQL()
    .toNative();
  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}

export function getUserById(id: number): QueryConfig {
  const query = knex({
    client: "pg",
  })
    .select("*")
    .from("users")
    .where("user_id", id)
    .toSQL()
    .toNative();

  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}

export function getUserRoleNameByUserId(userId: number) {
  const query = knex({
    client: "pg",
  })
    .select("roles.role_name")
    .from("users")
    .join("user_roles", "users.user_id", "user_roles.user_id")
    .join("roles", "user_roles.role_id", "roles.role_id")
    .where("users.user_id", userId)
    .toSQL()
    .toNative();

  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}

export function assignRole(user_id: number, role_id: number): QueryConfig {
  const query = knex({
    client: "pg",
  })
    .table("user_roles")
    .insert({
      user_id,
      role_id,
    })
    .toSQL()
    .toNative();
  const text = query.sql;
  const values = [...query.bindings];

  return { text, values };
}
