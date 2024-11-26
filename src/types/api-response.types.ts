import { User } from "next-auth";
import { Roadmap } from "./roadmap.types";

export interface ApiResponse {
    success: boolean,
    message: string,
    //roadmap?: Roadmap,
    roadmap?: any,
    user?: User,
    progress?: number,
}