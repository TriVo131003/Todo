import { Pool, PoolClient } from "pg";
import { Assignment } from "../schemas/assignment.schema";
import { AssignmentModel } from "../models/assignment.model";

async function addAssignment(
  todoId: number,
  userId: number,
  create_by: number,
  db: Pool | PoolClient
): Promise<Assignment> {
  const assignmentModel = new AssignmentModel(db);
  return await assignmentModel.createAssignment(todoId, userId, create_by);
}

async function getAllAssignment(db: Pool | PoolClient): Promise<Assignment[]> {
  const assignmentModel = new AssignmentModel(db);
  return await assignmentModel.getAllAssignment();
}

async function getAssignmentById(
  assignmentId: number,
  db: Pool | PoolClient
): Promise<Assignment | null> {
  const assignmentModel = new AssignmentModel(db);
  return await assignmentModel.findAssignmentById(assignmentId);
}

async function updateAssignment(
  assignmentId: number,
  todoId: number,
  userId: number,
  update_by: number,
  db: Pool | PoolClient
): Promise<Assignment | null> {
  const assignmentModel = new AssignmentModel(db);
  return await assignmentModel.updateAssignment(
    assignmentId,
    todoId,
    userId,
    update_by
  );
}

async function deleteAssignment(
  assignmentId: number,
  db: Pool | PoolClient
): Promise<Assignment | null> {
  const assignmentModel = new AssignmentModel(db);
  return await assignmentModel.deleteAssignment(assignmentId);
}

const AssignmentService = {
  addAssignment,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  getAllAssignment,
};

export default AssignmentService;
