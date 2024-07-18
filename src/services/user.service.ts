import dotenv from "dotenv";
import { User, UserInfo } from "../schemas/user.schema";
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
): Promise<void> {
  const userModel = new UserModel(db);
  const existingUser = await userModel.findUserByUsername(username);
  if (existingUser) {
    throw new Error("User already exists");
  }
  await userModel.createUser(username, password, email);
  const user = await userModel.findUserByUsername(username);
  await userModel.assignRole(user.user_id);
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

async function getUserInfor(
  username: string,
  db: Pool | PoolClient
): Promise<UserInfo> {
  const userModel = new UserModel(db);
  const user: User = await userModel.findUserByUsername(username);
  const role: string = await userModel.getRoleByUserId(user.user_id);
  return new UserInfo(user, role);
}

const userService = {
  registerUser,
  authenticateUser,
  getUserInfor,
};

export default userService;
