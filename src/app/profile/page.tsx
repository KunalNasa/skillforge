/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Header from "@/components/Header"
import PageEnd from "@/components/PageEnd"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import RoadmapCards from "@/components/User/RoadmapCards";
import UserProfile from "@/components/User/UserProfile";
import { fact as factFromArr } from "@/helpers/roadmapFacts";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const page = () => {
    const { data: session } = useSession();
    const user : User = session?.user as User;
    const [fact , setFact] = useState<string>("");
    // to resolve hydration error
    useEffect(() => {
        setFact(factFromArr);
    }, [])
  return (
    <div className="MainContainer">
        <Header/>
        <div className="WholePage flex md:flex-row flex-col">
            <div className="flex md:p-5 md:m-5 rounded-md m-1 flex-col p-10 w-full md:w-3/12">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="p-2 py-5 font-semibold text-gray-300 text-3xl">{user?.name}</p>
                <div className="p-2">
                    <label className="font-semibold text-gray-500" htmlFor="">Email</label>
                    <p className="font-semibold text-gray-300">{user?.email}</p>
                </div>
                <div className="p-2">
                    <label className="font-semibold text-gray-500" htmlFor="">Member since</label>
                    <p className="font-semibold text-gray-300">
                        {user?.date_created
                            ? new Date(user.date_created).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })
                            : 'No date available'}
                    </p>
                </div>
                <div className="p-2">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="hover:bg-red-600 font-semibold hover:text-gray-300" variant="outline">Log Out</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will Log you out of your account
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => signOut()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <div className="md:w-9/12 md:m-5 md:p-5 w-full m-1 flex flex-col">
                <h1 className="text-3xl font-semibold text-gradient py-4">Your Profile</h1>
                <UserProfile/>
                <RoadmapCards/>
                <div>
                    <h2 className="text-2xl font-semibold text-gradient pt-5 pb-2">Fact</h2>
                    <p className="text-gray-300 pb-4 font-semibold font-mono">{fact}</p>
                </div>
            </div>
        </div>
        <PageEnd/>
    </div>
  )
}

export default page
