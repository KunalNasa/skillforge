import { model } from "@/lib/geminiAIConfig";
import { prompt1 } from "@/lib/prompt";
import { ApiResponse } from "@/types/api-response.types";
import { StatusCodes } from "@/types/statusCodes";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        // get from file prompt.ts
        const { prompt2, prompt3 }: { prompt2: string, prompt3: string } = await request.json();
        const finalPrompt: string = prompt1 + prompt2 + prompt3;  // create final prompt

        const result = await model.generateContent(finalPrompt);
        const responseText = result.response.text();

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