import { promptSchema } from "@/zodSchemas/userPromptSchema";
import axios from "axios";
import { useState } from "react"
import { z } from "zod";
import { toast } from "./use-toast";

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
            toast({
                title : "Success",
                description : response.data.message,
                variant : "default"
            })
            window.location.reload();
        } catch (error : any) {
            toast({
                title : "Error",
                description : error.data.message,
                variant : "destructive"
            })
        }finally{
            setLoading(false);
        }
    }
    return {generateRoadmap, loading};
}

export default useGenerateRoadmap
