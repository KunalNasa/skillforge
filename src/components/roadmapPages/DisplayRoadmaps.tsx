'use client'

import useFetchRoadmaps from "@/hooks/useFetchRoadmaps"
import { Roadmap } from "@/types/roadmap.types";
import { useEffect, useState } from "react"

const DisplayRoadmaps = () => {
    const fetchRoadmapsFromDB = useFetchRoadmaps();
    const [roadmaps, setRoadmaps] = useState<[Roadmap] | []>([]);
    useEffect(() => {
        fetchRoadmapsFromDB();
    }, [])
  return (
    <div>

    </div>
  )
}

export default DisplayRoadmaps
