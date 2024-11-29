/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { useState } from 'react';
import { toast } from './use-toast';
const useFetchRoadmaps = () => {
    const [loading, setLoading] = useState(false);
    const fetchRoadmapsFromDB = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/get-all-roadmaps');
            console.log(response.data.allRoadmaps[0]);
            return response.data.allRoadmaps;

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.data.message,
                variant: "destructive"
            })
        } finally {
            setLoading(false);
        }
    }
    const fetchRoadmapDataFromDB = async (id: string) => {
        try {
            const response = await axios.get(`/api/get-roadmap/${id}`);
            return response.data.roadmap;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.data,
                variant: "destructive"
            })
        }
    }
    return { fetchRoadmapsFromDB, loading, fetchRoadmapDataFromDB };
}

export default useFetchRoadmaps
