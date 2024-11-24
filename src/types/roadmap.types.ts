import { Task } from "./task.types";

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