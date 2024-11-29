/* eslint-disable @typescript-eslint/no-explicit-any */
import { userProfileSchema } from "@/zodSchemas/userProfileSchema";
import axios from "axios";
import { useState } from "react"
import { z } from "zod";
import { toast } from "./use-toast";

const useUserData = () => {
    const [loading, setLoading] = useState(false);
    const fetchUserDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/save-user-fields');
            return response.data.user
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
    const updateUserDetails = async (data : z.infer<typeof userProfileSchema>) => {
        try {
            const response = await axios.patch('/api/save-user-fields', {
                username : data.username,
                other_details : data.other_details,
                goal : data.goal,
                current_status : data.current_status
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
        }
    }
    return {loading, fetchUserDetails, updateUserDetails};
}

export default useUserData
