'use client'
import Footer from "@/components/Footer";
import Features from "@/components/LandingPage/Features";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Home() {
  return (
   <div>
    <Navbar/>
    <main className="MainContainer my-5 p-5 items-center justify-center sm:p-20 flex md:flex-row flex-col-reverse">
      <div className="ContentContainer p-5 md:p-0 w-full md:w-1/2 flex justify-center flex-col">
        <p className="text-center md:text-left text-gray-400">AI makes content fast and easy</p>
        <h1 className="text-center md:text-left text-3xl sm:text-5xl md:text-7xl font-bold py-5">
          Shaping Your Future With <span className=" text-gradient">AI-Powered</span> Precision
        </h1>
        <p className="text-center md:text-left text-gray-400">
        Transform Your Journey with AI-Driven Roadmaps - Customizable, Data-Backed, and Tailored to Accelerate Your Success, Step by Step.
        </p>
        <Link className="flex items-center md:justify-start justify-center md:items-start" href='/#features-section'>
          <Button className="h-12 bg-purple-600 hover:bg-purple-500 text-lg font-semibold my-5">Explore Features</Button>
        </Link>
      </div>
      <div className="ImageContainer w-full md:w-1/2 my-auto">
        <Image className="mx-auto my-auto" width={650} height={650} src="/Images/setup-wizard.svg" alt="Roadmap image" />
      </div>
    </main>
    <div className="flex items-center flex-col text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl py-5 my-10 mx-auto w-full md:w-9/12 font-bold">Take the Leap and Dive into an Exceptional Experience on Our Website!</h1>
      <Button id="login-button" onClick={() => signIn('google')} className="flex items-center  hover:bg-purple-600 hover:text-white font-semibold h-14 text-lg bg-gray-100 text-gray-800 space-x-2">
        <FcGoogle size={40}/> 
        <div className="border-l  border-gray-400 h-6 mx-2"></div> 
        <span>Continue With Google</span> 
    </Button>
    </div>
    <Features/>
    <Footer/>
   </div>
  );
}
