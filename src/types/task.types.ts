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