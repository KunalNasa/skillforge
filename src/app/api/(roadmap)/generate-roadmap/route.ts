import { model } from "@/lib/geminiAIConfig";
import { prompt1 } from "@/lib/prompt";
import { ApiResponse } from "@/types/api-response.types";
import { StatusCodes } from "@/types/statusCodes";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/models/user.model";
import { generatePromptForGemini } from "@/lib/generatePromptForGemini";


export async function POST(request: Request) {
    try {
        // get from file prompt.ts
        const session = await getServerSession(authOptions);
        const userId = session?.user._id;

        const user = await UserModel.findById(userId);

        if (!user) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User not found"
            }, { status: StatusCodes.BAD_REQUEST })
        }

        const { prompt }: { prompt: string } = await request.json();
        const finalPrompt: string = generatePromptForGemini(user, prompt);  // create final prompt

        const result = await model.generateContent(finalPrompt);
        const responseText = result.response.text();

        console.log(responseText);
        const roadmap = responseText;//Parse response text to proper json format and form roadmap from it, implement after seeing responses coming from gemini api

        return Response.json({ //roadmap successfully generated
            success: true,
            message: "Roadmap successfully generated, Please confirm the roadmap",
            roadmap: roadmap
        }, { status: StatusCodes.CREATED })

    } catch (error) {
        console.log("Error generating roadmap : " + error);
        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Error occurred while generating roadmap"
        }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
    }
}