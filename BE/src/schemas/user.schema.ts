import z from "zod";

export type User = {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: string;
};

export class UserInfo {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  role_name: string;

  constructor(user: User, role_name: string) {
    this.user_id = user.user_id;
    this.username = user.username;
    this.email = user.email;
    this.password_hash = user.password_hash;
    this.role_name = role_name;
  }
}

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "at least 8 characters"),
});
