/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import Header from '@/components/Header';
import PageEnd from '@/components/PageEnd';
import RoadmapVisualization from '@/components/roadmapPages/roadmapShort';
import { Progress } from '@/components/ui/progress';
import { Timeline } from '@/components/ui/timeline';
import { roadmapData } from '@/helpers/data';
import useFetchProgress from '@/hooks/useFetchProgress';
import useFetchSingleRoadmap from '@/hooks/useFetchSingleRoadmapFromDB';
import useMarkTaskAsCompleted from '@/hooks/useMarkTaskAsCompleted';
import { Roadmap } from '@/types/roadmap.types';
import { roadmapGraphType } from '@/types/roadmapGraph.types';
import { Task } from '@/types/task.types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
// import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { GoLinkExternal } from "react-icons/go";

const page = () => {
  const params = useParams();
  const {roadmapId} = params;
  const [modifiedDataForTimeline, setmodifiedDataForTimeline] = useState<roadmapGraphType[]>([]);
  const [roadmap, setRoadmap] = useState<Roadmap>();
  const [trigger, setTrigger] = useState<boolean>(false);

  const { markTaskASCompleted } = useMarkTaskAsCompleted();
  const { fetchProgressFromDB } = useFetchProgress();

  const handleIsCompleted = async (taskId: string) => {
    const updatedRoadmap = await markTaskASCompleted(taskId, roadmap?._id as string);
    //const progress = await fetchProgressFromDB(roadmap?._id as string);
    setRoadmap(updatedRoadmap);
    setTrigger(!trigger);
    // console.log(progress);
  }



  // fetching roadmap data from the server
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fetchSingleRoadmapFromDB, loading } = useFetchSingleRoadmap();

  useEffect(() => {

    const fetchSingleRoadmap = async () => {
      const data = await fetchSingleRoadmapFromDB(roadmapId as string)
      const modifiedData = data.tasks.map((task: Task) => { // parsing server response to Timeline component prop
        return {
          title: task.title,
          content: (
            <div>
              {task.subtopics.map((subtopic) => {
                return <div key={subtopic.title} id={task.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')} className='bg-gradient-to-r from-purple-800 via-purple-600 to-purple-500 border-r-4 my-10 p-5 text-left rounded-md'>
                  <div className=''><b>{subtopic.title}</b></div>
                  <div className='text-neutral-400'>
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      className='flex items-center gap-2  transition-transform transform hover:scale-100 hover:shadow-2xl hover:translate-x-1 hover:text-blue-600' href={subtopic.resources}>
                      <span>Resources</span>
                      <span><GoLinkExternal /></span>
                    </Link></div>
                </div>
              })}
            </div>
          ),
          _id: task._id,
          is_completed: task.is_completed
        }
      })

      setRoadmap(data);
      setmodifiedDataForTimeline(modifiedData);

      // const progress = await fetchProgressFromDB(roadmapId);
      // setRoadmap({ ...roadmap, progress: progress } as Roadmap);
    }

    fetchSingleRoadmap();
  }, [trigger])




  return (
    <div className="w-full flex  flex-col align-middle">
      <Header />
      <div className=" w-3/5 flex flex-col mx-auto text-center">
        <div className="text-7xl font-bold py-5">
          Shaping Your Future With <span className=" text-gradient">AI-Powered</span> Precision
        </div>
        <div className="text-gray-400">
          Transform Your Journey with AI-Driven Roadmaps - Customizable, Data-Backed, and Tailored to Accelerate Your Success, Step by Step.
        </div>
      </div>
      <div className='ml-52'>
        <RoadmapVisualization roadmapData={roadmap as Roadmap} />
      </div>

      <div className='text-neutral-500 text-center text-5xl'>
        {roadmap?.title}
      </div>
      <div className='Progress p-5 mx-20 justify-center'>
        <p className='text-2xl my-2 font-semibold'>Your Progress</p>
        <div className='flex items-center justify-start'>
          <Progress className='w-[90%]' value={roadmap?.progress} />
        </div>
      </div>
      <Timeline data={modifiedDataForTimeline} handleIsCompleted={handleIsCompleted} />
      <PageEnd />
    </div>
  );
}

export default page


//'use client';
// import Header from '@/components/Header';
// import PageEnd from '@/components/PageEnd';
// import RoadmapVisualization from '@/components/roadmapPages/roadmapShort';
// import { Progress } from '@/components/ui/progress';
// import { Timeline } from '@/components/ui/timeline';
// import { roadmapData as sampleData } from '@/helpers/data';
// import useFetchRoadmaps from '@/hooks/useFetchRoadmaps';
// import { Roadmap } from '@/types/roadmap.types';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { GoLinkExternal } from 'react-icons/go';

// const Page = () => {
//   const params = useParams();
//   const roadmapId = params.id;

//   const [roadmapData, setRoadmapData] = useState<Roadmap>();
//   const { fetchRoadmapDataFromDB } = useFetchRoadmaps();

//   useEffect(() => {
//     const fetchRoadmapData = async () => {
//       const response = await fetchRoadmapDataFromDB(roadmapId as string);
//       setRoadmapData(response);
//     };
//     fetchRoadmapData();
//   }, [fetchRoadmapDataFromDB, roadmapId]);

//   const dataTemp =
//     roadmapData?.tasks?.map((task) => {
//       return {
//         title: task.title,
//         content: (
//           <div>
//             {task.subtopics.map((subtopic) => (
//               <div
//                 key={subtopic.title}
//                 id={task.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
//                 className='bg-gradient-to-r from-purple-800 via-purple-600 to-purple-500 border-r-4 my-10 p-5 text-left rounded-md'
//               >
//                 <div>
//                   <b>{subtopic.title}</b>
//                 </div>
//                 <div className='text-neutral-400'>
//                   <Link
//                     target='_blank'
//                     rel='noopener noreferrer'
//                     className='flex items-center gap-2 transition-transform transform hover:scale-100 hover:shadow-2xl hover:translate-x-1 hover:text-blue-600'
//                     href={subtopic.resources}
//                   >
//                     <span>Resources</span>
//                     <span>
//                       <GoLinkExternal />
//                     </span>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ),
//       };
//     }) || [];

//   return (
//     <div className='w-full flex flex-col align-middle'>
//       <Header />
//       <div className='w-3/5 flex flex-col mx-auto text-center'>
//         <div className='text-7xl font-bold py-5'>
//           Shaping Your Future With <span className='text-gradient'>AI-Powered</span> Precision
//         </div>
//         <div className='text-gray-400'>
//           Transform Your Journey with AI-Driven Roadmaps - Customizable, Data-Backed, and Tailored to Accelerate Your
//           Success, Step by Step.
//         </div>
//       </div>
//       <div className='ml-52'>
//         {roadmapData ? (
//           <RoadmapVisualization roadmapData={roadmapData} />
//         ) : (
//           <div>Loading...</div>
//         )}
//       </div>

//       <div className='text-neutral-500 text-center text-5xl'>
//         {roadmapData?.title || 'Loading...'}
//       </div>
//       <div className='Progress p-5 mx-20 justify-center'>
//         <p className='text-2xl my-2 font-semibold'>Your Progress</p>
//         <div className='flex items-center justify-start'>
//           <Progress className='w-[90%]' value={33} />
//         </div>
//       </div>
//       <Timeline data={dataTemp} />
//       <PageEnd />
//     </div>
//   );
// };

// export default Page;
