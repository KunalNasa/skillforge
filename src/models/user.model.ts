import mongoose, { Document, Schema } from "mongoose";
import { Roadmap, RoadmapSchema } from "./roadmap.model";

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

// User Schema
const UserSchema: Schema<User> = new Schema({
  id: {
    type: String,
    required: [true, "User ID is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please use a valid email address",
    ],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  other_details: {
    type: String,
    default: "",
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
    required: [true, "Goal is required"],
  },
  current_status: {
    type: String,
    required: [true, "Current status is required"],
  },
  specifications: {
    type: String,
    default: "",
  },
  profile_picture: {
    type: String,
    default: "",
  },
  roadmaps: {
    type: [RoadmapSchema],
    default: [],
  },
});

// Exporting User model
const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
