import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { ApiResponse } from "@/types/api-response.types";
import { StatusCodes } from "@/types/statusCodes";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/user.model";
import { RoadmapModel } from "@/models/roadmap.model";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user._id;
    // console.log(session, userId);
    if (!userId) {
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Unauthorised request"
        }, { status: StatusCodes.UNAUTHORIZED });
    }
    try {
        await connectDB();
        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User not found in DB"
            }, { status: StatusCodes.NOT_FOUND })
        }

        const roadmapArray = user.roadmaps;

        for (let i = 0; i < roadmapArray.length; i++) {
            const roadmap = await RoadmapModel.findById(roadmapArray[i]._id);
            roadmapArray[i].progress = roadmap?.progress;
        }

        console.log(roadmapArray)

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "User Roadmaps fetched successfully",
            allRoadmaps: roadmapArray
        }, { status: StatusCodes.OK })
    } catch (error) {
        console.log("Internal server error in Fetching roadmap : " + error);
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Error occurred while fetching roadmaps"
        }, { status: StatusCodes.INTERNAL_SERVER_ERROR })

    }
}