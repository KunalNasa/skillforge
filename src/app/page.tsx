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
    <main className="MainContainer my-5 p-20 flex">
      <div className="ContentContainer w-1/2 flex justify-center flex-col">
        <p className="text-gray-400">AI makes content fast and easy</p>
        <h1 className="text-7xl font-bold py-5">
          Shaping Your Future With <span className=" text-gradient">AI-Powered</span> Precision
        </h1>
        <p className="text-gray-400">
        Transform Your Journey with AI-Driven Roadmaps - Customizable, Data-Backed, and Tailored to Accelerate Your Success, Step by Step.
        </p>
        <Link href='/#features-section'>
        <Button className="w-1/3 h-12 bg-purple-600 hover:bg-purple-500 text-lg font-semibold my-5">Explore Features</Button>
        </Link>
      </div>
      <div className="ImageContainer w-1/2">
        <Image className="mx-auto my-auto" width={650} height={650} src="/Images/setup-wizard.svg" alt="Roadmap image" />
      </div>
    </main>
    <div className="flex items-center flex-col text-center">
      <h1 className="text-5xl py-5 my-10 mx-auto w-9/12 font-bold">Take the Leap and Dive into an Exceptional Experience on Our Website!</h1>
      <Button id="login-button" onClick={() => signIn('google')} className="flex items-center  hover:bg-purple-600 hover:text-white font-semibold h-14 w-3/12 text-lg bg-gray-100 text-gray-800 space-x-2">
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
