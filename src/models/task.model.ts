import { Schema } from "mongoose";

// Task interface
export interface Task {
  id: string; // Unique task ID
  title: string; // Task title
  duration: number; // Duration of the task (in hours/days)
  subtopics: string[]; // Subtopics covered
  is_completed: boolean; // Completion status
  prerequisites: string[]; // Prerequisites
  resources: string[]; // Learning resources
}

// Task Schema
export const TaskSchema = new Schema<Task>({
  id: {
    type: String,
    required: [true, "Task ID is required"],
  },
  title: {
    type: String,
    required: [true, "Task title is required"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Task duration is required"],
  },
  subtopics: {
    type: [String],
    default: [],
  },
  is_completed: {
    type: Boolean,
    default: false,
  },
  prerequisites: {
    type: [String],
    default: [],
  },
  resources: {
    type: [String],
    default: [],
  },
});
