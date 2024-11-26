import React from 'react'
import { Separator } from './ui/separator'
import Image from 'next/image'
import Link from 'next/link'


const Footer = () => {
  return (
    <div className='MainClass' id='footer'>        
      <Separator className='bg-gray-600'/>
      <div className="grid my-10 grid-cols-1 md:grid-cols-3 gap-8 p-5">
  <div className="flex flex-col items-start">
    <Image width={200} height={200} src="/Logo.svg" alt="Logo Icon" />
    <p className="mt-4 py-2 text-md w-1/2 md:w-8/12 text-left font-semibold text-gray-400">Navigating Your Success with Precision. Our roadmaps empower your digital transformation.</p>
  </div>

  <div className="flex flex-col space-y-2">
    <h1 className="text-xl font-semibold">Quick Links</h1>
    <Link href="/#login-button" className="text-gray-400">Get Started</Link>
    <Link href="/#features-section" className="text-gray-400">Features</Link>
    <Link href="/" className="text-gray-400">Work</Link>
  </div>

  <div className="flex flex-col space-y-2">
    <h1 className="text-xl font-semibold">Connect Us</h1>
    <Link href="/#features-section" className="text-gray-400">Twitter</Link>
    <Link href="/#features-section" className="text-gray-400">Github</Link>
    <Link href="/#features-section" className="text-gray-400">LinkedIn</Link>
  </div>
</div>
  <Separator className='bg-gray-600'/>
    <p className='my-5 text-gray-500'>
    © 2024 SkillForge. All rights reserved.
    </p>
</div>
  )
}

export default Footer
