'use client';
import { Roadmap } from '@/types/roadmap.types';
import Link from 'next/link';
import React from 'react';

// interface RoadmapTask {
//     title: string;
//     duration: number;
// }

// interface RoadmapProps {
//     roadmapData: {
//         _id: string;
//         title: string;
//         tasks: RoadmapTask[];
//     };
// }

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

