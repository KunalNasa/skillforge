/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { toast } from "./use-toast";

const useFetchProgress = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const fetchProgressFromDB = async (roadmapId: string) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/get-progress/${roadmapId}`);
            toast({
                title: "Success",
                description: "progress fetched successfully",
                variant: "default",
            })
            return res.data.progress;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.data,
                variant: "destructive"
            })
        } finally {
            setLoading(false);
        }
    }

    return { fetchProgressFromDB, loading };
}

export default useFetchProgress
