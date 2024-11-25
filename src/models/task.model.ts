import { Task } from "@/types/task.types";
import mongoose, { Model, Schema } from "mongoose";



// Task Schema
export const TaskSchema = new Schema<Task>({
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
    title: {
      type: String,
      required: [true, "Subtopic title is required"],
    },
    resources: {
      type: String,
    },
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
});

export const TaskModel = (mongoose.models.TaskModel as mongoose.Model<Task>) || mongoose.model<Task>("Task", TaskSchema);
