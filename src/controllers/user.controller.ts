import { Request, Response } from "express";
import { registerUser, authenticateUser } from "../services/user.service";

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await registerUser(username, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "register fail" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = await authenticateUser(username, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: "login fail" });
  }
};
