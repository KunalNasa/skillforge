import axios from 'axios'
import { useState } from 'react';
const useFetchRoadmaps = () => {
    const [loading, setLoading] = useState(false);
    const fetchRoadmapsFromDB = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/get-all-roadmaps');
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    } 
    return fetchRoadmapsFromDB;
}

export default useFetchRoadmaps
