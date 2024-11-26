import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SlSocialGithub } from "react-icons/sl";
const Navbar = () => {
  return (
    <nav className='flex items-center justify-between'>
        <div className='p-2 flex'>
            <Image width={100} height={100} src="/Logo.svg" alt='Logo' />
            <h1 className='text-2xl text-gradient font-semibold'>SkillForge</h1>
        </div>
        <div className='flex gap-10 p-5 font-semibold text-gray-300'>
            <Link 
                href="https://github.com/KunalNasa/skillforge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xl hover:text-purple-600"
                >
                <SlSocialGithub />
            </Link>

            <div className="relative group inline-block">
                <Link href='/#login-button' className="border-none hover:text-purple-600">Get Started</Link>
                <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 ease-out group-hover:w-full"></div>
            </div>
            <div className="relative group inline-block">
            <Link href='/#features-section' className="border-none hover:text-purple-600">features</Link>
            <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 ease-out group-hover:w-full"></div>
            </div>

            <div className="relative group inline-block">
            <Link href='/#footer' className="border-none hover:text-purple-600">contact</Link>
            <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 ease-out group-hover:w-full"></div>
            </div>

        </div>
    </nav>
  )
}

export default Navbar
