import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import { RoadmapModel } from "@/models/roadmap.model";
import UserModel from "@/models/user.model";
import { ApiResponse } from "@/types/api-response.types";
import { StatusCodes } from "@/types/statusCodes";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id : string;
}
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authOptions); 
  const userId = session?.user._id; 

  if (!userId) {
    return NextResponse.json<ApiResponse>({
      success: false,
      message: "Unauthorized User",
    }, { status: StatusCodes.UNAUTHORIZED });
  }

  try {
    await connectDB();
    const {id} = params;
    if (!id) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: "Roadmap ID is required",
      }, { status: StatusCodes.BAD_REQUEST });
    }

    // Find the user and remove the roadmap with the specified ID from their `roadmaps` array
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { roadmaps: { _id: id } } }, // Remove the roadmap by its ID
      { new: true }
    );

    if (!user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: "User not found",
      }, { status: StatusCodes.NOT_FOUND });
    }

    const deleteRoadmapFromModel = await RoadmapModel.findByIdAndDelete(id);
    if (!deleteRoadmapFromModel) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: "Failed to delete Roadmap",
      }, { status: StatusCodes.BAD_REQUEST });
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Roadmap deleted successfully",
    }, { status: StatusCodes.OK });

  } catch (error) {
    console.error("Error deleting roadmap:", error);
    return NextResponse.json<ApiResponse>({
      success: false,
      message: "Internal Server Error",
    }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}
