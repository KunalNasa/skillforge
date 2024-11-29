import axios from "axios";
import { useState } from "react";

const useFetchProgress = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const fetchProgressFromDB = async (roadmapId: string) => {
        try {
            const res = await axios.get(`/api/get-progress/${roadmapId}`);
            return res.data.progress;
        } catch (error) {

        }
    }

    return { fetchProgressFromDB, loading };
}

export default useFetchProgress
