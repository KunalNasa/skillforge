import { Roadmap } from "./roadmap.types";

// User interface
export interface User extends Document {
    id: string; // Unique user ID
    email: string; // User email
    username: string; // Display name
    other_details: string; // Short bio or user-provided details
    progress: number; // Progress percentage across all roadmaps
    date_created: Date; // Account creation date
    goal: string; // User's primary goal
    current_status: string; // User's current state (e.g., "Student," "Professional")
    specifications: string; // Optional user-specific details
    profile_picture: string; // URL of profile picture
    roadmaps: Roadmap[]; // Embedded array of roadmaps
}