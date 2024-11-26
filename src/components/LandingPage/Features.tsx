import React from 'react';
import { CardDemo } from '../ui/CardDemo';
import { featuresArr } from '@/helpers/ourFeatures';


const Features = () => {   
  return (
    <div id='features-section' className='flex flex-col items-center justify-center my-10'>
    <div className='text-6xl my-5 w-3/4 text-center font-semibold'><span className='text-gradient'>Revolutionize Your Workflow,</span> Explore Our Most Recent Features Now!</div>
    <div className="flex flex-wrap justify-evenly px-40 py-10 gap-5">
      {featuresArr.map((item, index) => (
        <div key={index} className="mx-5">
          <CardDemo
            title={item.title}
            heading={item.heading}
            avatar={item.avatar}
            content={item.content}
          />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Features;
