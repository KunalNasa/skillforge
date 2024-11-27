import RoadmapVisualization from '@/components/roadmapShort';
import { Timeline } from '@/components/ui/timeline';
import { roadmapData } from '@/helpers/data';
import Link from 'next/link';
import React from 'react'

const page = () => {

  const dataTemp = roadmapData.tasks.map((task) => {
    return {
      title: task.title,
      content: (
        <div>
          {task.subtopics.map((subtopic) => {
            return <div className='bg-purple-950  border-r-2 my-10 p-5 subtopic-card w-3/4 ml-20 pl-10'>
              <div className='text-left'><b>{subtopic.title}</b></div>
              <div className='text-neutral-400'><Link href={subtopic.resources}>{subtopic.resources}</Link></div>
            </div>
          })}
        </div>
      )
    }
  })

  return (
    <div className="w-full flex  flex-col align-middle">
      <div className=" w-3/5 flex flex-col mx-auto text-center">
        <div className="text-7xl font-bold py-5">
          Shaping Your Future With <span className=" text-gradient">AI-Powered</span> Precision
        </div>
        <div className="text-gray-400">
          Transform Your Journey with AI-Driven Roadmaps - Customizable, Data-Backed, and Tailored to Accelerate Your Success, Step by Step.
        </div>
      </div>
      <div className='ml-52'>
        <RoadmapVisualization roadmapData={roadmapData} />
      </div>

      <div className='text-neutral-500 text-center text-5xl'>{roadmapData.title}</div>
      <Timeline data={dataTemp} />
    </div>
  );
}

export default page
