import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import { RoadmapModel } from "@/models/roadmap.model";
import { ApiResponse } from "@/types/api-response.types";
import { StatusCodes } from "@/types/statusCodes";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest, {params} : {params : {roadmapId : string}}) {
    const session = await getServerSession(authOptions); 
    const userId = session?.user._id; 

    if (!userId) {
      return NextResponse.json<ApiResponse>({
        success : false,
        message : "Unauthorised User"
      }, { status: StatusCodes.UNAUTHORIZED});
    }
    try {
        const {roadmapId} = params;
        await connectDB();
        const roadmap = await RoadmapModel.findById(roadmapId);
        if(!roadmap){
            return NextResponse.json<ApiResponse>({
                success : false,
                message : "No Roadmap found with this id"
            }, {status : StatusCodes.NOT_FOUND})
        }
        // below code can be replaced by using aggregation pipelines
        const taskArray = roadmap.tasks;
        const totalTasks = taskArray.length;
        let completedTask = 0;
        //can be replaced by array.filter method
        for(const obj of taskArray){
            if(obj.is_completed){
                completedTask++;
            }
        }
        let progress;
        if(totalTasks > 0){
            progress = (completedTask/totalTasks)*100;
            roadmap.progress = Math.floor(progress);
            await roadmap.save();
        }else{
            return NextResponse.json<ApiResponse>({
                success : false,
                message : "No Task found in this array"
            }, {status : StatusCodes.BAD_REQUEST})
        }
        // above code can be replaced by using aggregation pipelines
        
        return NextResponse.json<ApiResponse>({
            success : true,
            message : "Progress calculated successfully",
            progress
        }, {status : StatusCodes.OK});

    } catch (error) {
        console.log("Internal server error in get progress route", error);
        return NextResponse.json<ApiResponse>({
            success : false,
            message : "Internal server error"
        }, {status : StatusCodes.INTERNAL_SERVER_ERROR})
        
    }
    
}