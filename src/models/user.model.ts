import bcrypt from "bcryptjs";
import { pool } from "../config";
import { User } from "../schemas/user.schema";

export const createUser = async (
  username: string,
  password: string
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
    [username, hashedPassword]
  );
  return result.rows[0];
};

export const findUserByUsername = async (
  username: string
): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
};
