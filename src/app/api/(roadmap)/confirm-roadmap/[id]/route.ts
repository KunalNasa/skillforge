import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import { RoadmapModel } from "@/models/roadmap.model";
import UserModel from "@/models/user.model";
import { getServerSession } from "next-auth";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const { id } = params; // roadmap id
        let session = await getServerSession(authOptions);
        let userId = session?.user._id; // user id


        const roadmap = await RoadmapModel.findById(id);

        if (!roadmap) { // if roamap dont exist
            return Response.json({
                success: false,
                message: "Roadmap you requested does not exist"
            }, { status: 400 });
        }



        const user = await UserModel.findById(userId);

        if (!user) { // if user dont exist
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 400 });
        }


        user.roadmaps.push(roadmap); // add roadmap to user roadmaps
        await user.save(); // save user

        return Response.json({
            success: true,
            message: "Roadmap successfull confirmed",
            roadmap
        }, { status: 200 });


    } catch (error) {
        console.log("Error confirming roadmap : " + error);
        return Response.json({
            success: false,
            message: "Error occurred while confirming roadmap"
        }, { status: 500 });
    }
}