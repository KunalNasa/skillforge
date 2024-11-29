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

const RoadmapCards = () => {
    const [roadmaps, setRoadmaps] = useState<[Roadmap] | []>([]);
    const {fetchRoadmapsFromDB,loading} = useFetchRoadmaps();
    const router = useRouter();
    const fetchRoadmaps = useCallback(async () => {
        const response = await fetchRoadmapsFromDB();
            setRoadmaps(response);
    }, [])
    useEffect(() => {
        fetchRoadmaps();
    }, []);
  return (
    <div>
        <div className="w-full">
            <h1 className="text-3xl pb-2 pt-5 font-semibold text-gradient">Your Roadmaps </h1>
            <Separator className="w-[100%]"/>
        </div>
      {roadmaps.length === 0 ? 
      <div className="border-2 my-2 p-5 rounded-md">
        <h3 className="text-xl font-semibold text-gray-300 py-5">You haven't created any roadmap yet !!</h3>
        <Image className="mx-auto" width={300} height={300} src="/Images/roadmapsNotFound.svg" alt="Not Found!!" />
      </div> : (roadmaps.map((item, index) => (
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
                )))}
    </div>
  )
}

export default RoadmapCards
