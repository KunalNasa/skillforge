import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import { RoadmapModel } from "@/models/roadmap.model";
import UserModel from "@/models/user.model";
import { ApiResponse } from "@/types/api-response.types";
import { StatusCodes } from "@/types/statusCodes";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  roadmapId : string;
}
export async function GET(request: NextRequest,{ params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?._id;

  if (!userId) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Unauthorized user",
      },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }

  try {
    const { roadmapId } = params;
    await connectDB();

    // Fetch roadmap and user in parallel
    const [roadmap, user] = await Promise.all([
      RoadmapModel.findById(roadmapId),
      UserModel.findById(userId),
    ]);

    if (!roadmap) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "No roadmap found with this ID",
        },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User not found",
        },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    const tasks = roadmap.tasks || [];
    const totalTasks = tasks.length;

    if (totalTasks === 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "No tasks found in the roadmap",
        },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Calculate completed tasks
    const completedTasks = tasks.filter(task => task.is_completed).length;
    const progress = Math.floor((completedTasks / totalTasks) * 100);

    // Update roadmap progress
    roadmap.progress = progress;
    await roadmap.save();

    // Update user's roadmap progress
    // const userRoadmap = user.roadmaps?.find(r => r._id.toString() === roadmapId.toString());
    // if (userRoadmap) {
    //   userRoadmap.progress = progress;
    //   await user.save();
    // }
    let index = 0;
    while(index < user.roadmaps.length){
        if(user.roadmaps[index]._id.toString() === roadmapId.toString()){
            user.roadmaps[index].progress = progress;
            await user.save();
            break;
        }
        index++;
    }
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Progress calculated successfully",
        progress,
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    console.error("Internal server error in GET /api/get-roadmap/[id]:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
