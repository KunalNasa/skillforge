import React from 'react'
import { Separator } from './ui/separator'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className="MainClass text-center sm:text-left" id="footer">
      <Separator className="bg-gray-600" />
      <div className="grid my-10 grid-cols-1 sm:grid-cols-3 gap-8 p-5">
        {/* Logo Section */}
        <div className="flex flex-col items-center sm:items-start">
          <Image width={200} height={200} src="/Logo.svg" alt="Logo Icon" />
          <p className="mt-4 py-2 text-md w-3/4 md:w-8/12 text-center sm:text-left font-semibold text-gray-400">
            Navigating Your Success with Precision. Our roadmaps empower your digital transformation.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col items-center sm:items-start space-y-2">
          <h1 className="text-xl font-semibold">Quick Links</h1>
          <Link href="/#login-button" className="text-gray-400 hover:text-purple-600">
            Get Started
          </Link>
          <Link href="/#features-section" className="text-gray-400 hover:text-purple-600">
            Features
          </Link>
          <Link href="/" className="text-gray-400 hover:text-purple-600">
            Work
          </Link>
        </div>

        {/* Connect Us Section */}
        <div className="flex flex-col items-center sm:items-start space-y-2">
          <h1 className="text-xl font-semibold">Connect Us</h1>
          <Link href="/#features-section" className="text-gray-400 hover:text-purple-600">
            Twitter
          </Link>
          <Link href="/#features-section" className="text-gray-400 hover:text-purple-600">
            Github
          </Link>
          <Link href="/#features-section" className="text-gray-400 hover:text-purple-600">
            LinkedIn
          </Link>
        </div>
      </div>

      <Separator className="bg-gray-600" />
      <p className="my-5 text-gray-500">© 2024 SkillForge. All rights reserved.</p>
    </div>
  )
}

export default Footer
