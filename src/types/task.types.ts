// Task interface
export interface Task {
    _id: string; // Unique task ID
    title: string; // Task title
    duration: number; // Duration of the task (in hours/days)
    subtopics: { title: string, resources: string }[]; // Subtopics covered
    is_completed: boolean; // Completion status
    prerequisites: string[]; // Prerequisites
}