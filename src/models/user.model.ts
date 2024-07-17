import bcrypt from "bcryptjs";
import { User } from "../schemas/user.schema";
import * as userSQL from "../sql/user.sql";
import { BaseModel } from "./base.model";

export class UserModel extends BaseModel {
  public async createUser(
    username: string,
    password: string,
    email: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const queryConfig = userSQL.createUser(username, hashedPassword, email);
    const queryResult = await this.query(queryConfig);
    return queryResult[0] as User;
  }

  public async findUserByUsername(username: string): Promise<User> {
    const queryConfig = userSQL.getUserByUsername(username);
    const queryResult = await this.query(queryConfig);
    return queryResult[0] as User;
  }

  public async findUserById(id: number): Promise<User | null> {
    const queryConfig = userSQL.getUserById(id);
    const queryResult = await this.query(queryConfig);
    return queryResult[0] as User;
  }
}
