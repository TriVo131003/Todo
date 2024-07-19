import { Todo } from "../schemas/todo.schema";
import { BaseModel } from "./base.model";
import * as TodoSQL from "../sql/todo.sql";
export class TodoModel extends BaseModel {
  public async createTodo(
    title: string,
    description: string,
    create_by: number
  ): Promise<Todo> {
    const queryConfig = TodoSQL.createTodo(title, description, create_by);
    const queryResult = await this.query(queryConfig);
    return queryResult[0] as Todo;
  }

  public async findTodoById(id: number): Promise<Todo | null> {
    const queryConfig = TodoSQL.getTodoById(id);
    const queryResult = await this.query(queryConfig);
    return queryResult[0] as Todo;
  }

  public async getTodoList(): Promise<Todo[]> {
    const queryConfig = TodoSQL.getTodoList();
    const queryResult = await this.query(queryConfig);
    return queryResult as Todo[];
  }

  public async deleteTodo(id: number): Promise<Todo> {
    const queryConfig = TodoSQL.deleteTodo(id);
    const queryResult = await this.query(queryConfig);
    return queryResult[0] as Todo;
  }

  public async updateTodo(
    todoId: number,
    title?: string,
    description?: string,
    is_completed?: string,
    update_by?: number
  ): Promise<Todo> {
    const queryConfig = TodoSQL.updateTodo(
      todoId,
      title,
      description,
      is_completed,
      update_by
    );
    const queryResult = await this.query(queryConfig);
    return queryResult[0] as Todo;
  }

  public async findTodosByUserId(userId: number): Promise<Todo[]> {
    const queryConfig = TodoSQL.getTodosByUserId(userId);
    const queryResult = await this.query(queryConfig);
    return queryResult as Todo[];
  }
}
