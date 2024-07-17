import z from "zod";

export type User = {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: string;
};

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "at least 8 characters"),
});
