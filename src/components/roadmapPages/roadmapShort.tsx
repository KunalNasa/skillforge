'use client';
import { Roadmap } from '@/types/roadmap.types';
import Link from 'next/link';
import React from 'react';


export default function MirroredRoadmap({ roadmapData }: { roadmapData: Roadmap }) {
    if (!roadmapData?.tasks?.length) return null;

    const calculatePath = (taskCount: number) => {
        const width = 1000;
        const height = 600;
        const amplitude = height / 4;

        const points = roadmapData.tasks.map((_, index) => ({
            x: width * (index / (taskCount - 1)),
            y: height / 2 + amplitude * (index % 2 === 0 ? 1 : -1), // Zig-zag pattern
        }));

        return {
            pathData: points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' '),
            points,
        };
    };

    const { pathData, points } = calculatePath(roadmapData.tasks.length);

    return (
        <div className="bg-black min-h-screen p-8 relative">
            <div className="relative w-full h-[600px] flex justify-center items-center">
                <svg className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
                    <path
                        d={pathData}
                        fill="transparent"
                        stroke="rgba(168, 85, 247, 0.5)"
                        strokeWidth="4"
                        strokeDasharray="10 10"
                    />
                </svg>
                <div className="grid grid-cols-3 gap-8">
                    {roadmapData.tasks.map((task, index) => (
                        <Link href={`/roadmap/${roadmapData._id}/#${task.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                            key={index}
                            className={`w-40 h-40 rounded-full flex items-center justify-center bg-purple-700 border-4 border-purple-900 text-center p-4 ${index % 2 === 0 ? 'translate-y-[-20px]' : 'translate-y-[20px]'
                                }`}
                            style={{
                                position: 'absolute',
                                left: points[index].x,
                                top: points[index].y,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <div className="text-white">
                                <h2 className="font-bold text-lg">{task.title}</h2>
                                <p className="text-sm text-purple-200">{task.duration} days</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

// 'use client';
// import { Roadmap } from '@/types/roadmap.types';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';

// export default function MirroredRoadmap({ roadmapData }: { roadmapData: Roadmap }) {
//     if (!roadmapData?.tasks?.length) return null;

//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const checkMobile = () => {
//             setIsMobile(window.innerWidth < 768);
//         };
//         checkMobile();
//         window.addEventListener('resize', checkMobile);
//         return () => window.removeEventListener('resize', checkMobile);
//     }, []);

//     if (isMobile) {
//         return (
//             <div className="bg-black min-h-screen p-4 relative">
//                 <div className="relative w-full mx-auto max-w-[300px]">
//                     <svg
//                         className="absolute inset-0"
//                         style={{
//                             width: '2px',
//                             height: '100%',
//                             left: '50%',
//                             transform: 'translateX(-50%)'
//                         }}
//                     >
//                         <line
//                             x1="1"
//                             y1="0"
//                             x2="1"
//                             y2="100%"
//                             stroke="rgba(168, 85, 247, 0.5)"
//                             strokeWidth="2"
//                             strokeDasharray="10 10"
//                         />
//                     </svg>
//                     <div className="flex flex-col items-center gap-16 pt-8">
//                         {roadmapData.tasks.map((task, index) => (
//                             <Link
//                                 href={`/roadmap/${roadmapData._id}/#${task.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
//                                 key={index}
//                                 className="w-28 h-28 rounded-full flex items-center justify-center bg-purple-700 border-4 border-purple-900 text-center p-2 relative"
//                             >
//                                 <div className="text-white">
//                                     <h2 className="font-bold text-sm line-clamp-2">{task.title}</h2>
//                                     <p className="text-xs text-purple-200">{task.duration} days</p>
//                                 </div>
//                                 <div className="absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">
//                                     {index + 1}
//                                 </div>
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Original desktop layout
//     const calculatePath = (taskCount: number) => {
//         const width = 1000;
//         const height = 600;
//         const amplitude = height / 4;

//         const points = roadmapData.tasks.map((_, index) => ({
//             x: width * (index / (taskCount - 1)),
//             y: height / 2 + amplitude * (index % 2 === 0 ? 1 : -1),
//         }));

//         return {
//             pathData: points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' '),
//             points,
//         };
//     };

//     const { pathData, points } = calculatePath(roadmapData.tasks.length);

//     return (
//         <div className="bg-black min-h-screen p-8 relative">
//             <div className="relative w-full h-[600px] flex justify-center items-center">
//                 <svg className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
//                     <path
//                         d={pathData}
//                         fill="transparent"
//                         stroke="rgba(168, 85, 247, 0.5)"
//                         strokeWidth="4"
//                         strokeDasharray="10 10"
//                     />
//                 </svg>
//                 <div className="grid grid-cols-3 gap-8">
//                     {roadmapData.tasks.map((task, index) => (
//                         <Link
//                             href={`/roadmap/${roadmapData._id}/#${task.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
//                             key={index}
//                             className={`w-40 h-40 rounded-full flex items-center justify-center bg-purple-700 border-4 border-purple-900 text-center p-4 ${index % 2 === 0 ? 'translate-y-[-20px]' : 'translate-y-[20px]'}`}
//                             style={{
//                                 position: 'absolute',
//                                 left: points[index].x,
//                                 top: points[index].y,
//                                 transform: 'translate(-50%, -50%)',
//                             }}
//                         >
//                             <div className="text-white">
//                                 <h2 className="font-bold text-lg">{task.title}</h2>
//                                 <p className="text-sm text-purple-200">{task.duration} days</p>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

