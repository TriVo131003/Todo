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

  public async findUserById(id: number): Promise<User> {
    const queryConfig = userSQL.getUserById(id);
    const queryResult = await this.query(queryConfig);
    console.log(queryResult);
    return queryResult[0] as User;
  }

  public async getRoleByUserId(id: number): Promise<string> {
    const queryConfig = userSQL.getUserRoleNameByUserId(id);
    const queryResult = await this.query(queryConfig);
    return queryResult[0].role_name;
  }

  public async assignRole(id: number): Promise<string> {
    const queryConfig = userSQL.assignRole(id, 2);
    const queryResult = await this.query(queryConfig);
    return queryResult[0] as string;
  }
}
