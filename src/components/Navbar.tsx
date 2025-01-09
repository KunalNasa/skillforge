import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SlSocialGithub } from "react-icons/sl";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <Image width={100} height={100} src="/Logo.svg" alt="Logo" />
        <h1 className="text-lg sm:text-xl md:text-2xl text-gradient font-semibold">SkillForge</h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-10 font-semibold text-gray-300">
        <Link
          href="https://github.com/KunalNasa/skillforge"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-xl hover:text-purple-600"
        >
          <SlSocialGithub />
        </Link>

        <div className="relative group inline-block">
          <Link href="/#login-button" className="border-none hover:text-purple-600">
            Get Started
          </Link>
          <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 ease-out group-hover:w-full"></div>
        </div>

        <div className="relative group inline-block">
          <Link href="/#features-section" className="border-none hover:text-purple-600">
            Features
          </Link>
          <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 ease-out group-hover:w-full"></div>
        </div>

        <div className="relative group inline-block">
          <Link href="/#footer" className="border-none hover:text-purple-600">
            Contact
          </Link>
          <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 ease-out group-hover:w-full"></div>
        </div>
      </div>

      {/* Hamburger Menu */}
      <div className="md:hidden">
        <button onClick={toggleSidebar} className="text-2xl text-gray-300">
          {isSidebarOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-950 text-white z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={toggleSidebar}
          className="text-2xl text-white absolute top-4 right-4"
        >
          <HiX />
        </button>
        <div className="flex flex-col gap-8 mt-20 p-4">
          <Link
            href="https://github.com/KunalNasa/skillforge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xl hover:text-purple-400"
            onClick={toggleSidebar}
          >
            <SlSocialGithub />
          </Link>

          <Link
            href="/#login-button"
            className="border-none hover:text-purple-400"
            onClick={toggleSidebar}
          >
            Get Started
          </Link>
          <Link
            href="/#features-section"
            className="border-none hover:text-purple-400"
            onClick={toggleSidebar}
          >
            Features
          </Link>
          <Link
            href="/#footer"
            className="border-none hover:text-purple-400"
            onClick={toggleSidebar}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
