import Image from 'next/image'
import { Separator } from './ui/separator'
import React from 'react'
import Link from 'next/link'
import { SlSocialGithub } from "react-icons/sl";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const PageEnd = () => {
  return (
    <div>
      <Separator className='w-full bg-gray-400'/>
      <div className='MainContainer flex items-center justify-between'>
        <div className='p-1 flex items-center'>
          <Image width={75} height={75} src="/Logo.svg" alt="" />
          <p className='my-5 text-sm text-gray-500'>
            © 2024 SkillForge. All rights reserved.
          </p>
        </div>
        <div className='flex md:flex-col gap-2 md:gap-5 mx-4'>
          <p className='my-5 text-gray-400'>
            Connect :
          </p>
          <div className='flex md:gap-5'>
          <Link 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xl hover:text-purple-600"
                >
                <FaTwitter />
          </Link>
          <Link 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xl hover:text-purple-600"
                >
                <FaLinkedin />
          </Link>
          <Link 
                href="https://github.com/KunalNasa/skillforge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xl hover:text-purple-600"
                >
                <SlSocialGithub />
          </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageEnd
