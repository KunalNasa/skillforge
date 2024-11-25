import connectDB from "@/lib/connectDB";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import UserModel from "@/models/user.model";
import { ApiResponse } from "@/types/api-response.types";
import { NextResponse } from "next/server";
import { StatusCodes } from "@/types/statusCodes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        const userId = session?.user._id;

        const user = await UserModel.findById(userId);

        if (!user) { // if user dont exist
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User not found"
            }, { status: StatusCodes.BAD_REQUEST })
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "User found",
            roadmap: user.roadmaps[0]
        }, { status: StatusCodes.OK })

    } catch (error) {
        console.log("Error fetching roadmaps : " + error);
        return NextResponse.json({
            success: false,
            message: "Error occurred while fetching roadmaps"
        }, { status: StatusCodes.INTERNAL_SERVER_ERROR })

    }
}