import axios from "axios";
import { useState } from "react";
import { toast } from "./use-toast";

const useFetchSingleRoadmap = () => {

    const [loadingRoadmap, setLoading] = useState<boolean>(false);

    const fetchSingleRoadmapFromDB = async (roadmapId: string) => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/get-roadmap/${roadmapId}`);

            toast({
                title: "Success",
                description: res.data.message,
                variant: "default"
            });

            return res.data.roadmap;

        } catch (error: any) {
            console.log("Error fetching single roadmap : " + error);
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            })
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { fetchSingleRoadmapFromDB, loadingRoadmap };
}

export default useFetchSingleRoadmap;