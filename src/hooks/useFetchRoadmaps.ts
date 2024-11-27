import axios from 'axios'
import { useState } from 'react';
const useFetchRoadmaps = () => {
    const [loading, setLoading] = useState(false);
    const fetchRoadmapsFromDB = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/get-all-roadmaps');
            return response.data.allRoadmaps;
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    } 
    return {fetchRoadmapsFromDB, loading};
}

export default useFetchRoadmaps
