'use client'

import { Tooltip } from "react-tooltip"
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { useCallback, useEffect, useState } from "react"
import { Roadmap } from "@/types/roadmap.types"
import useFetchRoadmaps from "@/hooks/useFetchRoadmaps"
import { useRouter } from "next/navigation"
import { Separator } from "../ui/separator"
import Image from "next/image"
import Loader from "../Loader"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Button } from "../ui/button"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { MdDelete } from "react-icons/md"

const RoadmapCards = () => {
    const [roadmaps, setRoadmaps] = useState<[Roadmap] | []>([]);
    const { fetchRoadmapsFromDB, loading } = useFetchRoadmaps();
    const router = useRouter();
    const fetchRoadmaps = useCallback(async () => {
        const response = await fetchRoadmapsFromDB();
        setRoadmaps(response);
    }, [])
    useEffect(() => {
        fetchRoadmaps();
    }, []);
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/delete-roadmap/${id}`);
            toast({
                title: "Deleted",
                description: "Roadmap deleted successfully",
                variant: "default"
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to delete the roadmap.",
                variant: "destructive",
            });
        }
    };
    
    return (
        <div>
            {loading && <Loader />}
            <div className="w-full">
                <h1 className="text-3xl pb-2 pt-5 font-semibold text-gradient">Your Roadmaps </h1>
                <Separator className="w-[100%] bg-gray-400" />
            </div>
            {roadmaps.length === 0 ?
                <div className="border-2 my-2 p-5 rounded-md">
                    <h3 className="text-xl font-semibold text-gray-300 py-5">You haven&apos;t created any roadmap yet !!</h3>
                    <Image className="mx-auto" width={300} height={300} src="/Images/roadmapsNotFound.svg" alt="Not Found!!" />
                </div> : (
                    <div className="flex flex-wrap">
                        {roadmaps.map((item, index) => (
                            <Card key={index} className=" w-11/12 md:w-1/4 m-4 bg-gray-950 cursor-pointer transform hover:scale-110 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl text-white">
                                <CardTitle className="p-5 text-2xl flex items-center justify-between font-semibold text-gradient">
                                    {item.title}
                                    <div className="p-2">
                                        <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="hover:bg-red-600 text-gray-300 font-semibold text-xl hover:text-gray-300" variant="outline">
                                            <MdDelete/>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your roadmap
                                            and remove its data from our servers.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(item._id.toString())} >Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                    </CardTitle>
                                <CardContent 
                                 onClick={() => { router.replace(`/roadmap/${item._id}`) }}className="text-gray-300 flex flex-col font-semibold">
                                    <p>
                                        Sections : {item.tasks.length}
                                    </p>
                                    <p>
                                        duration : {item.duration} months
                                    </p>
                                </CardContent>
                                <CardFooter className="flex flex-col text-left items-start justify-start" >
                                    <p className="p-1 font-semibold text-gradient">Progress</p>
                                    <Progress
                                        data-tooltip-id={`${item._id}`}
                                        data-tooltip-content={`${item.progress}% completed`}
                                        data-tooltip-place="top"
                                        value={item.progress} />
                                </CardFooter>
                                <Tooltip id={`${item._id}`} />
                            </Card>
                        ))}
                    </div>
                )}
        </div>
    )
}

export default RoadmapCards
