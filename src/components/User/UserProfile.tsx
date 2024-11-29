import { userProfileSchema } from "@/zodSchemas/userProfileSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import useUserData from "@/hooks/useUserData"
import { User } from "@/types/user.types"
import Loader from "../Loader"


const UserProfile = () => {
    const [dbUser, setDbUser] = useState<User>();
    const [toggle, setToggle] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, fetchUserDetails, updateUserDetails } = useUserData();
    useEffect(() => {
        const callFetchDetails = async () => {
            const response = await fetchUserDetails();
            setDbUser(response);
        }
        callFetchDetails();
    }, [])
    const onSubmit = async (data: z.infer<typeof userProfileSchema>) => {
        await updateUserDetails(data);
    }
    const form = useForm<z.infer<typeof userProfileSchema>>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: {
            username: dbUser?.username || "",
            goal: dbUser?.goal || "",
            other_details: dbUser?.other_details || "",
            current_status: "Beginner"
        }
    })
    return (
        <div className="border-2 rounded-md w-full h-full">
            {loading && <Loader />}
            {toggle ? <Form {...form}>
                <form className="p-6 rounded-lg shadow-lg mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name="username"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-col mb-4">
                                <FormLabel className="text-white">Username</FormLabel>
                                <Input
                                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Add Username"
                                    type="text"
                                    {...field}
                                />
                                <FormMessage className="text-red-500 mt-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="current_status"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-col mb-4">
                                <FormLabel className="text-white">Current Level</FormLabel>
                                <select
                                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 bg-black focus:ring-purple-500"
                                    {...field}
                                    name="current_status"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                                <FormMessage className="text-red-500 mt-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="goal"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-col mb-4">
                                <FormLabel className="text-white">Next Goal</FormLabel>
                                <Input
                                    className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Add your next goal"
                                    type="text"
                                    {...field}
                                />
                                <FormMessage className="text-red-500 mt-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="other_details"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-col mb-6">
                                <FormLabel className="text-white">Short Bio</FormLabel>
                                <textarea
                                    className="w-full bg-black p-5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Add your short bio"
                                    {...field}
                                />
                                <FormMessage className="text-red-500 mt-1" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-green-700 text-white p-3 rounded-md font-semibold hover:bg-green-500 transition-colors mt-6"
                    >
                        Submit
                    </Button>
                </form>
            </Form> :
                <div className="p-6 rounded-lg shadow-lg mx-auto space-y-4">
                    {/* Display dbUser information when toggle is false */}
                    <div className="flex flex-col">
                        <label className="text-white">Username</label>
                        <input
                            className="w-full p-3 rounded-md border border-gray-300 bg-black cursor-not-allowed"
                            value={dbUser?.username || ''}
                            disabled
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-white">Current Level</label>
                        <input
                            className="w-full p-3 rounded-md border border-gray-300 bg-black cursor-not-allowed"
                            value={dbUser?.current_status || ''}
                            disabled
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-white">Next Goal</label>
                        <input
                            className="w-full p-4 rounded-md border border-gray-300 bg-black cursor-not-allowed"
                            value={dbUser?.goal || ''}
                            disabled
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-white">Short Bio</label>
                        <textarea
                            className="w-full p-5 bg-black rounded-md border border-gray-300 cursor-not-allowed"
                            value={dbUser?.other_details || ''}
                            disabled
                        />
                    </div>
                </div>}
            <div className="flex items-center justify-end p-2">
                <Button className={`bg-green-700 hover:bg-green-500 w-1/12 font-semibold ${toggle && 'bg-red-500 hover:bg-red-700'}`}
                    onClick={() => { setToggle(!toggle) }}>{toggle ? "Discard" : "Edit"}</Button>

            </div>
        </div>
    )
}

export default UserProfile
