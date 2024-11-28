'use client'
import Header from "@/components/Header"
import PageEnd from "@/components/PageEnd"
import DisplayRoadmaps from "@/components/roadmapPages/DisplayRoadmaps";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserProfile from "@/components/User/UserProfile";
import { User } from "next-auth";
import { useSession } from "next-auth/react";

const page = () => {
    const { data: session } = useSession();
    const user : User = session?.user as User;
    console.log(user);
  return (
    <div className="MainContainer">
        <Header/>
        <div className="WholePage flex">
            <div className="flex border-2 rounded-md m-1 flex-col p-10 w-3/12">
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
            </div>
            <div className="w-9/12 m-1">
                <UserProfile/>
            </div>
        </div>
        <PageEnd/>
    </div>
  )
}

export default page
