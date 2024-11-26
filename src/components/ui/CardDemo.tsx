"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
type props = {
    title : string,
    heading : string,
    avatar : string,
    content : string
}
export function CardDemo({title, heading, avatar, content} : props) {
  return (
    <div id="features-section" className="max-w-xs w-full group/card">
      <div
        className={cn(
          " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          "bg-[url('/card-bg.jpg')] bg-cover"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          <Image
            height="100"
            width="100"
            alt="Avatar"
            src={`/CardImages/${avatar}`}
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              {title}
            </p>
           
          </div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gradient relative z-10">
            {heading}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
