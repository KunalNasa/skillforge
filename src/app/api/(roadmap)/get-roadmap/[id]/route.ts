import connectDB from "@/lib/connectDB";
import { RoadmapModel } from "@/models/roadmap.model";
import { ApiResponse } from "@/types/api-response.types";
import { Roadmap } from "@/types/roadmap.types";

export async function GET(request: Request, { params }: { params: { id: string } }) {

    try {
        await connectDB();

        const { id } = params; // roadmap id

        const roadmap: Roadmap | null = await RoadmapModel.findById(id);

        if (!roadmap) { // if roadmap dont exist
            return Response.json({
                success: false,
                messsage: "Roadmap you requested does not exist"
            }, { status: 400 });
        }

        return Response.json({ // if roadmap exist  send roadmap
            success: true,
            message: "Roadmap successfully fetched",
            roadmap
        }, { status: 200 });


    } catch (error) {
        console.log("Error getting roadmap : " + error);

        return Response.json({
            success: false,
            message: "Error occurred while getting roadmap"
        }, { status: 500 });
    }

}