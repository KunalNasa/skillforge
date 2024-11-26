import mongoose, { Schema } from "mongoose";
import { TaskSchema } from './task.model';
import { Roadmap } from "@/types/roadmap.types";



// Roadmap Schema
export const RoadmapSchema = new Schema<Roadmap>({
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
  generated_by: {
    type: String,
    default: "Gemini AI",
  },
});

export const RoadmapModel = (mongoose.models.Roadmap as mongoose.Model<Roadmap>) || mongoose.model<Roadmap>("Roadmap", RoadmapSchema);
