'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ImProfile } from "react-icons/im";
import { BiSolidDashboard } from "react-icons/bi";
import { Tooltip } from 'react-tooltip'
const Header = () => {
  return (
    <nav className='MainContainer flex justify-between'>
        <div className='p-2 flex items-center'>
            <Image width={100} height={100} src="/Logo.svg" alt='Logo' />
            <h1 className='text-2xl text-gradient font-semibold'>SkillForge</h1>
        </div>
        <div className='flex items-center gap-10 p-5 font-semibold text-gray-300'>
            <Link 
                data-tooltip-id="dashboard"
                data-tooltip-content="Dashboard"
                data-tooltip-place="top"
                href="/dashboard"
                className="flex items-center text-4xl hover:text-purple-600"
                > 
                <BiSolidDashboard />
            </Link>
            <Tooltip id="dashboard" />
            <Link 
                data-tooltip-id="profile"
                data-tooltip-content="Profile"
                data-tooltip-place="top"
                href="/profile"
                className="flex items-center text-3xl hover:text-purple-600"
                >
                    <ImProfile/>
            </Link>
            <Tooltip id="profile" />


        </div>
    </nav>
  )
}

export default Header
