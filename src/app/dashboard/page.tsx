/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Header from '@/components/Header'
import PageEnd from '@/components/PageEnd'
import CreateRoadmap from '@/components/roadmapPages/CreateRoadmap';
import DisplayRoadmaps from '@/components/roadmapPages/DisplayRoadmaps';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
const page = () => {
  const { data: session } = useSession();
  const user : User = session?.user as User;
  return (
    <div>
      <Header/>
      <div className='WelcomeAndProgress flex flex-col'>
        <div className='Welcome flex items-center justify-center'>
          <h2 className=' text-3xl p-2 md:text-5xl font-semibold'>
            Welcome <span className='text-gradient'>{user?.name}</span>
          </h2>
        </div>
      </div>
      <CreateRoadmap/>
      <DisplayRoadmaps/>
      <PageEnd/>
    </div>
  )
}

export default page
