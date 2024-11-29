"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  _id: string;
  is_completed: boolean;
}

export const Timeline = ({ data, handleIsCompleted }: { data: TimelineEntry[], handleIsCompleted: (taskId: string) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);


  return (

    <div ref={containerRef} className="relative">


      <div
        className="w-full bg-black font-sans md:px-10"
        ref={containerRef}
      >
        <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
          <motion.div
            className="absolute left-8 top-0 w-[1px] h-full bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
            style={{
              scaleY: scrollYProgress,
              transformOrigin: "top",
              opacity: 1, // Ensure visibility
              zIndex: 1 // Bring to front
            }}
          />
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                  <div className={item.is_completed ? "h-4 w-4 rounded-full bg-neutral-800 border border-purple-600 p-2" : "h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700  p-2"} onClick={() => handleIsCompleted(item._id)} />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold 
              text-gradient ">
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-gradient">
                  {item.title}
                </h3>
                {item.content}{" "}
              </div>
            </div>
          ))}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
          >
          </div>
        </div>
      </div>

    </div>

  );
};
