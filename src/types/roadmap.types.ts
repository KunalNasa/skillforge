import { Task } from "./task.types";

// Roadmap interface
export interface Roadmap {
    _id: string; // Unique roadmap ID
    title: string; // Roadmap title
    duration: number; // Duration in days
    tasks: Task[]; // Embedded array of tasks
    progress?: number; // Roadmap progress percentage
    date_created?: Date; // Roadmap creation date
    generated_by?: string; // Roadmap generator src
}