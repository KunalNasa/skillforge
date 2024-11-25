
import mongoose, { Schema } from "mongoose";
import { RoadmapSchema } from "./roadmap.model";
import { User } from "@/types/user.types";



// User Schema
const UserSchema: Schema<User> = new Schema({
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
    default : ""
    // required: [true, "Goal is required"],
  },
  current_status: {
    type: String,
    default : ""
    // required: [true, "Current status is required"],
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
