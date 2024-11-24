import { Schema } from "mongoose";
import { TaskSchema } from './task.model';
import { Roadmap } from "@/types/roadmap.types";



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
