import axios from "axios";
import { useState } from "react";
import { toast } from "./use-toast";

const useMarkTaskAsCompleted = () => {
    const [loading, setLoading] = useState(false);

    const markTaskASCompleted = async (taskId: string, roadmapId: string) => {
        try {
            setLoading(true);
            const res = await axios.patch(`/api/update-roadmap/${roadmapId}/${taskId}`);
            toast({
                title: "Success",
                description: res.data.message,
                variant: "default"
            });
            return res.data.roadmap;
        } catch (error: any) {
            console.log("Error marking task as completed : " + error);
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            })
        } finally {
            setLoading(false);
        }
    }

    return { markTaskASCompleted, loading };

}

export default useMarkTaskAsCompleted;