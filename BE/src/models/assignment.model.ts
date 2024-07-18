import { Assignment } from "../schemas/assignment.schema";
import { BaseModel } from "./base.model";
import * as AssignmentSQL from "../sql/assignment.sql";
export class AssignmentModel extends BaseModel {
  public async createAssignment(
    todoId: number,
    userId: number
  ): Promise<Assignment> {
    const queryConfig = AssignmentSQL.createAssignment(todoId, userId);
    const queryResult = await this.query(queryConfig);
    return queryResult[0] as Assignment;
  }

  public async getAllAssignment(): Promise<Assignment[]> {
    const queryConfig = AssignmentSQL.getAllAssignment();
    const queryResult = await this.query(queryConfig);
    return queryResult as Assignment[];
  }

  public async findAssignmentById(id: number): Promise<Assignment | null> {
    const queryConfig = AssignmentSQL.getAssignmentById(id);
    const queryResult = await this.query(queryConfig);
    return queryResult[0] as Assignment;
  }

  public async deleteAssignment(id: number): Promise<Assignment | null> {
    const queryConfig = AssignmentSQL.deleteAssignment(id);
    const queryResult = await this.query(queryConfig);
    return queryResult[0] as Assignment;
  }

  public async updateAssignment(
    assignmentId: number,
    todoId?: number,
    userId?: number
  ): Promise<Assignment | null> {
    const queryConfig = AssignmentSQL.updateAssignment(
      assignmentId,
      todoId,
      userId
    );
    const queryResult = await this.query(queryConfig);
    return queryResult[0] as Assignment;
  }
}
