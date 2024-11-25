import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import { RoadmapModel } from "@/models/roadmap.model";
import { ApiResponse } from "@/types/api-response.types";
import { StatusCodes } from "@/types/statusCodes";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { roadmapId: string; taskId: string } }) {
    const session = await getServerSession(authOptions); 
    const userId = session?.user._id; 

    if (!userId) {
      return NextResponse.json<ApiResponse>({
        success : false,
        message : "Unauthorised User"
      }, { status: StatusCodes.UNAUTHORIZED});
    }

    try {
        await connectDB();
        const {roadmapId, taskId} = params;
        const roadmap = await RoadmapModel.findById(roadmapId);
        if(!roadmap){
            return NextResponse.json<ApiResponse>({
                success : false,
                message : "Roadmap not found"
            }, {status : StatusCodes.NOT_FOUND});
        }
        const updatedRoadmap = await RoadmapModel.findOneAndUpdate(
            { _id: roadmapId, "tasks._id": taskId }, // Match the roadmap and task ID
            [
              {
                $set: {
                  "tasks.$.is_completed": { $not: "$tasks.$.is_completed" }, // Toggle the value
                },
              },
            ],
            { new: true } // Return the updated roadmap
        );
        if(!updatedRoadmap){
            return NextResponse.json<ApiResponse>({
                success : false,
                message : "Roadmap or Task Not found"
            }, {status : StatusCodes.NOT_FOUND})
        }

        return NextResponse.json<ApiResponse>({
            success : true,
            message : "Successfully updated task"
        }, {status : StatusCodes.CREATED});
    } catch (error) {
        console.log("Internal server error in update task", error);
        return NextResponse.json<ApiResponse>({
            success : false,
            message : "Internal server error"
        }, {status : StatusCodes.INTERNAL_SERVER_ERROR})
    }
}