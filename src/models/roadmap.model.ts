import { Schema } from "mongoose";
import { Task, TaskSchema } from './task.model';

// Roadmap interface
export interface Roadmap {
  id: string; // Unique roadmap ID
  title: string; // Roadmap title
  duration: number; // Duration in days
  tasks: Task[]; // Embedded array of tasks
  progress: number; // Roadmap progress percentage
  date_created: Date; // Roadmap creation date
  goal: string; // The goal of the roadmap
  specifications: string; // Optional user-specific customizations
  generated_by: string; // Source of roadmap generation
}

// Roadmap Schema
export const RoadmapSchema = new Schema<Roadmap>({
  id: {
    type: String,
    required: [true, "Roadmap ID is required"],
  },
  title: {
    type: String,
    required: [true, "Roadmap title is required"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Roadmap duration is required"],
  },
  tasks: {
    type: [TaskSchema],
    default: [],
  },
  progress: {
    type: Number,
    default: 0,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  goal: {
    type: String,
    required: [true, "Roadmap goal is required"],
  },
  specifications: {
    type: String,
    default: "",
  },
  generated_by: {
    type: String,
    default: "Gemini AI",
  },
});
