import { model } from "@/lib/geminiAIConfig";
import { ApiResponse } from "@/types/api-response.types";
import { StatusCodes } from "@/types/statusCodes";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/models/user.model";
import { generatePromptForGemini } from "@/lib/generatePromptForGemini";
import { RoadmapModel } from "@/models/roadmap.model";
import { parseRawToJson } from "@/lib/geminiOpToJSObject";

function removeJsonPrefix(input: string) {
    return input.replace(/^```json\s*/, "").replace(/```$/, "").trim();
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const userId = session?.user._id;
    if (!userId) {
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Unatuhorised request"
        }, { status: StatusCodes.UNAUTHORIZED });
    }
    try {

        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User not found"
            }, { status: StatusCodes.BAD_REQUEST })
        }

        const { prompt, title, duration }: { prompt: string, title: string, duration: number } = await request.json();
        const finalPrompt: string = generatePromptForGemini(user, prompt);  // create final prompt

        const result = await model.generateContent(finalPrompt);
        const responseText = result.response.text();

        const updatedResponseText = removeJsonPrefix(responseText); // remove json prefix

        const jsonData = parseRawToJson(updatedResponseText); //parse gemini response to json object
        const roadmap_tasks = JSON.stringify(jsonData, null, 2); // json object to js 
        // console.log(JSON.parse(roadmap_tasks));

        const roadmap = await RoadmapModel.create({
            title,
            duration,
            tasks: JSON.parse(roadmap_tasks)
        })

        await roadmap.save();
        user.roadmaps.push(roadmap); // add roadmap to user roadmaps
        await user.save(); // save user




        return NextResponse.json<ApiResponse>({ //roadmap successfully generated
            success: true,
            message: "Roadmap successfully generated",
            roadmap: roadmap
        }, { status: StatusCodes.CREATED })

    } catch (error) {
        console.log("Error generating roadmap : " + error);
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Error occurred while generating roadmap"
        }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
    }
}