import axios from "axios";
import { useState } from "react";
import { toast } from "./use-toast";

const useFetchProgress = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const fetchProgressFromDB = async (roadmapId: string) => {
        try {
            const res = await axios.get(`/api/get-progress/${roadmapId}`);
            toast({
                title: "Success",
                description: "progress fetched successfully",
                variant: "default",
            })
            return res.data.progress;
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: "Error fetching progress",
                variant: "destructive",
            })
            return null;
        }
    }

    return { fetchProgressFromDB, loading };
}

export default useFetchProgress
