import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api-response.types";
import { StatusCodes } from "@/types/statusCodes";
import connectDB from "@/lib/connectDB";
import { User } from "@/types/user.types";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user._id;
    if(!userId){
        return NextResponse.json<ApiResponse>({
            success : false,
            message : "Unauthorised request"
        }, {status : StatusCodes.UNAUTHORIZED})
    }
    try {
        await connectDB();
        const user = await UserModel.findById(userId);

        if (!user) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User not found"
            }, { status: StatusCodes.BAD_REQUEST })
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "User fields saved successfully",
            user : user
        }, {status : StatusCodes.OK});

    } catch (error) {
        console.log("Error saving user fields : " + error);
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Error occurred while saving user fields"
        }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
    }
}

export async function PATCH(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user._id;

    if (!userId) {
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Unauthorised user"
        }, { status: StatusCodes.UNAUTHORIZED });
    }

    try {
        await connectDB();
        const { username, other_details, goal, current_status } = await request.json();
        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            username,
            other_details,
            goal,
            current_status,
        }, { new: true });
        if (updateUser) {
            return NextResponse.json<ApiResponse>({
                success: true,
                message: "Details updated Successfully",

            }, { status: StatusCodes.CREATED })
        } else {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User not found with given userID"
            }, { status: StatusCodes.NOT_FOUND });
        }
    } catch (error) {
        console.log("Internal server error in update user details", error);
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Internal server error"
        }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
    }
}