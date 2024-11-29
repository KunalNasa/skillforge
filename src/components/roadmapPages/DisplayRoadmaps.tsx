'use client'

import useFetchRoadmaps from "@/hooks/useFetchRoadmaps"
import { Roadmap } from "@/types/roadmap.types";
import { useEffect, useState } from "react"
import { Separator } from "../ui/separator";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/navigation";

const DisplayRoadmaps = () => {
    // const sampleData = {
    //     id : 343434,
    //     title : "Full Stack Web Developer",
    //     duration : 3,
    //     tasks : [1,2,3,5,6,7],
    //     progress : 20
    // }
    const router = useRouter();
    const {fetchRoadmapsFromDB, loading} = useFetchRoadmaps();
    const [roadmaps, setRoadmaps] = useState<[Roadmap] | []>([]);
    useEffect(() => {
        const fetchRoadmaps = async () => {
            const data = await fetchRoadmapsFromDB();
            setRoadmaps(data);
        }
        fetchRoadmaps();
    }, [])
  return (
    <div className="MainContainer">
        <div>
            <h2 className="text-5xl font-bold text-gradient p-5 m-5 mb-2 pb-2">Your Roadmaps</h2>
            <Separator/>
        </div>
            {roadmaps.length === 0 ?
            <div className="min-h-[60vh]">
                <h4 className="text-4xl font-semibold m-5 p-5">No Roadmaps to Display, Please Create One</h4>
            </div> :
            <div className="min-h-[60vh]">
                {roadmaps.map((item, index) => (
                    <Card key={index} onClick={() => {router.replace(`/roadmap/${item._id}`)}} className="w-1/4 m-4 bg-gray-950 text-white">
                    <CardTitle className="p-5 text-2xl font-semibold text-gradient">{item.title}</CardTitle>
                    <CardContent className="text-gray-300 flex flex-col font-semibold">
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
                        data-tooltip-id= {`${item._id}`}
                        data-tooltip-content= {`${item.progress}% completed`}
                        data-tooltip-place="top" 
                        value={item.progress}/>
                    </CardFooter>
                    <Tooltip id={`${item._id}`} />
                </Card>
                ))}
            </div>
            }
    </div>
  )
}

export default DisplayRoadmaps
