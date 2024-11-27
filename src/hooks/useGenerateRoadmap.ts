import { promptSchema } from "@/zodSchemas/userPromptSchema";
import axios from "axios";
import { useState } from "react"
import { z } from "zod";
import useFetchRoadmaps from "./useFetchRoadmaps";

const useGenerateRoadmap = () => {
    const [loading, setLoading] = useState(false);

    const generateRoadmap = async (data : z.infer<typeof promptSchema>) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/generate-roadmap', {
                prompt: data.prompt,
                title : data.title,
                duration : data.duration
            });
            console.log(response);
        } catch (error) {
            console.log("Error in making call to generate roadmap", error);
        }finally{
            setLoading(false);
        }
    }
    return {generateRoadmap, loading};
}

export default useGenerateRoadmap
