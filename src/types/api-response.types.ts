import { User } from "./user.types";
import { Roadmap } from "./roadmap.types";

export interface ApiResponse {
    success: boolean,
    message: string,
    allRoadmaps? : Roadmap[],
    roadmap?: Roadmap,
    user?: User,
    progress?: number,
}