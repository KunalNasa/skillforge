import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import { RoadmapModel } from "@/models/roadmap.model";
import UserModel from "@/models/user.model";
import { ApiResponse } from "@/types/api-response.types";
import { StatusCodes } from "@/types/statusCodes";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { roadmapId: string; taskId: string } }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user._id;

  if (!userId) {
    return NextResponse.json<ApiResponse>({
      success: false,
      message: "Unauthorised User"
    }, { status: StatusCodes.UNAUTHORIZED });
  }

  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const userId = session?.user._id;
    const { roadmapId, taskId } = params;
    const roadmap = await RoadmapModel.findById(roadmapId);
    if (!roadmap) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: "Roadmap not found"
      }, { status: StatusCodes.NOT_FOUND });
    }
    // const updatedRoadmap = await RoadmapModel.findOneAndUpdate(
    //   { _id: roadmapId, "tasks._id": taskId }, // Match the roadmap and task ID
    //   [
    //     {
    //       $set: {
    //         "tasks.$": {
    //           $mergeObjects: [
    //             "$tasks.$",
    //             {
    //               is_completed: { $not: "$tasks.$.is_completed" }
    //             }
    //           ]
    //         }
    //       }
    //     }
    //   ],
    //   { new: true } // Return the updated roadmap
    // );

    roadmap.tasks.map((task) => {
      if (task._id == taskId) {
        task.is_completed = !task.is_completed;
      }
    })

    const taskArray = roadmap.tasks;
    const totalTasks = taskArray.length;
    let completedTask = 0;
    //can be replaced by array.filter method
    for (const obj of taskArray) {
      if (obj.is_completed) {
        completedTask++;
      }
    }
    let progress;
    if (totalTasks > 0) {
      progress = (completedTask / totalTasks) * 100;
    } else {
      progress = 0;
    }

    roadmap.progress = progress;

    await roadmap.save();
    const user = await UserModel.findById(userId);
    user?.roadmaps.map((roadmap) => {
      if (roadmap._id == roadmapId) {
        roadmap.progress = progress;
      }
    })
    await user?.save();

    // if (!updatedRoadmap) {
    //   return NextResponse.json<ApiResponse>({
    //     success: false,
    //     message: "Roadmap or Task Not found"
    //   }, { status: StatusCodes.NOT_FOUND })
    // }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Successfully updated task",
      roadmap
    }, { status: StatusCodes.CREATED });
  } catch (error) {
    console.log("Internal server error in update task", error);
    return NextResponse.json<ApiResponse>({
      success: false,
      message: "Internal server error"
    }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}