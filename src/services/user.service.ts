import dotenv from "dotenv";
import { User } from "../schemas/user.schema";
import { UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Pool, PoolClient } from "pg";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

async function registerUser(
  username: string,
  password: string,
  email: string,
  db: Pool | PoolClient
): Promise<User> {
  const userModel = new UserModel(db);
  const existingUser = await userModel.findUserByUsername(username);
  if (existingUser) {
    throw new Error("User already exists");
  }
  return await userModel.createUser(username, password, email);
}

const authenticateUser = async (
  username: string,
  password: string,
  db: Pool | PoolClient
): Promise<string> => {
  const userModel = new UserModel(db);
  const user = await userModel.findUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error("Invalid username or password");
  }
  return jwt.sign({ id: user.user_id, username: user.username }, JWT_SECRET, {
    expiresIn: "30m",
  });
};

const userService = {
  registerUser,
  authenticateUser,
};

export default userService;
