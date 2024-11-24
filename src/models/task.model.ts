import { Task } from "@/types/task.types";
import { Schema } from "mongoose";



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
