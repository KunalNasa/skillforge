'use client'
import Header from '@/components/Header'
import PageEnd from '@/components/PageEnd'
import { Progress } from '@/components/ui/progress';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const page = () => {
  const { data: session } = useSession();
  const [progress, getProgress] = useState(0);

  useEffect(() => {
    
  }, [])
  const user : User = session?.user as User;
  return (
    <div>
      <Header/>
      <div className='WelcomeAndProgress flex flex-col'>
        <div className='Welcome flex items-center justify-center'>
          <h2 className='text-5xl font-semibold '>
            Welcome <span className='text-gradient'>{user?.name || ""}</span>
          </h2>
        </div>
        <div className='Progress p-5'>
          <p className='text-2xl my-2 font-semibold'>Your Progress</p>
          <div className='flex items-center justify-start'>
            <Progress className='w-[90%]' value={33} />
          </div>
        </div>
      </div>
      <PageEnd/>
    </div>
  )
}

export default page
