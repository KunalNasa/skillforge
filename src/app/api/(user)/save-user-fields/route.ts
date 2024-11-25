import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api-response.types";
import { StatusCodes } from "@/types/statusCodes";

export async function POST(request: Request) {
    try {
        const { other_details, goal, current_status, profile_picture } = await request.json();

        const session = await getServerSession(authOptions);
        const userId = session?.user._id;

        const user = await UserModel.findById(userId);

        if (!user) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User not found"
            }, { status: StatusCodes.BAD_REQUEST })
        }

        user.other_details = other_details;
        user.goal = goal;
        user.current_status = current_status;
        user.profile_picture = profile_picture;

        await user.save();

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "User fields saved successfully",
        })

    } catch (error) {
        console.log("Error saving user fields : " + error);
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Error occurred while saving user fields"
        }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
    }
}