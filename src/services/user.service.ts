import { User } from "../schemas/user.schema";
import { createUser, findUserByUsername } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "strongpassword";

export const registerUser = async (
  username: string,
  password: string
): Promise<User> => {
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    throw new Error("User already exists");
  }
  return await createUser(username, password);
};

export const authenticateUser = async (
  username: string,
  password: string
): Promise<string> => {
  const user = await findUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error("Invalid username or password");
  }
  return jwt.sign({ id: user.user_id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });
};
