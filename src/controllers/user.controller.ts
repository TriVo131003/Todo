import { Request, Response } from "express";
import { pool } from "../config";
import userService from "../services/user.service";

export const signup = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    const user = await userService.registerUser(
      username,
      password,
      email,
      pool
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "register fail" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = await userService.authenticateUser(username, password, pool);
    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ error: "login fail" });
  }
};

export async function logout(req: Request, res: Response) {
  res.clearCookie("access_token"),
    {
      httpOnly: true,
      sameSite: "strict",
    };
  res.status(201).json({ message: "Logout successful" });
}
