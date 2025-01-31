import connectDB from "@/lib/connectDB";
import { RoadmapModel } from "@/models/roadmap.model";
import { ApiResponse } from "@/types/api-response.types";
import { Roadmap } from "@/types/roadmap.types";
import { StatusCodes } from "@/types/statusCodes";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {

    try {
        await connectDB();

        const { id } = await params; // roadmap id

        const roadmap: Roadmap | null = await RoadmapModel.findById(id);

        if (!roadmap) { // if roadmap dont exist
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Roadmap you requested does not exist"
            }, { status: StatusCodes.BAD_REQUEST });
        }

        return NextResponse.json<ApiResponse>({ // if roadmap exist  send roadmap
            success: true,
            message: "Roadmap successfully fetched",
            roadmap
        }, { status: StatusCodes.OK });


    } catch (error) {
        console.log("Error getting roadmap : " + error);
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Error occurred while getting roadmap"
        }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
    }

}