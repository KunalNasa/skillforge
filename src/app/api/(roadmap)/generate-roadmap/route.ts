import { model } from "@/lib/geminiAIConfig";


export async function POST(request: Request) {
    try {
        const prompt1 = ""; // get from file prompt.ts
        const { prompt2, prompt3 }: { prompt2: string, prompt3: string } = await request.json();
        const finalPrompt: string = prompt1 + prompt2 + prompt3;  // create final prompt

        const result = await model.generateContent(finalPrompt);
        const responseText = result.response.text();

        const roadmap = responseText;//Parse response text to proper json format and form roadmap from it, implement after seeing responses coming from gemini api

        return Response.json({ //roadmap successfully generated
            success: true,
            message: "Roadmap successfully generated, Please confirm the roadmap",
            roadmap: roadmap
        }, { status: 200 })

    } catch (error) {
        console.log("Error generating roadmap : " + error);
        return Response.json({
            success: true,
            message: "Error occurred while generating roadmap"
        })
    }
}