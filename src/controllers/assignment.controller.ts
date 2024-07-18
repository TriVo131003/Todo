import { Request, Response } from "express";
import { pool } from "../config";
import AssignmentService from "../services/assignment.service";
import { StatusCodes } from "http-status-codes";

export async function addAssignment(req: Request, res: Response) {
  const { todoId, userId } = req.body;
  try {
    const assignment = await AssignmentService.addAssignment(
      todoId,
      userId,
      pool
    );
    res.status(StatusCodes.CREATED).json(assignment);
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Failed to add assignment" });
  }
}

export async function getAllAssignment(req: Request, res: Response) {
  try {
    const assignments = await AssignmentService.getAllAssignment(pool);

    res.status(StatusCodes.OK).json(assignments);
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Failed to retrieve assignment" });
  }
}

export async function getAssignmentById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const assignment = await AssignmentService.getAssignmentById(
      Number(id),
      pool
    );
    if (assignment) {
      res.status(StatusCodes.OK).json(assignment);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Assignment not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Failed to retrieve assignment" });
  }
}

export async function updateAssignment(req: Request, res: Response) {
  const assignmentId = req.params.id;
  const { todoId, userId } = req.body;
  try {
    const assignment = await AssignmentService.updateAssignment(
      Number(assignmentId),
      todoId,
      userId,
      pool
    );
    if (assignment) {
      res.status(StatusCodes.OK).json(assignment);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Assignment not found" });
    }
  } catch (error) {
    console.error("Error updating assignment:", error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Failed to update assignment" });
  }
}

export async function deleteAssignment(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const assignment = await AssignmentService.deleteAssignment(
      Number(id),
      pool
    );
    if (assignment) {
      res.status(StatusCodes.OK).json(assignment);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Assignment not found" });
    }
  } catch (error) {
    console.error("Error deleting assignment:", error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Failed to delete assignment" });
  }
}
