'use client'

import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { promptSchema } from "@/zodSchemas/userPromptSchema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useGenerateRoadmap from "@/hooks/useGenerateRoadmap";
import { BiLoader } from "react-icons/bi";
import Loader from "../Loader";

const CreateRoadmap = () => {
  const form = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
      duration: 0,
      title: ""
    }
  });
  const { generateRoadmap, loading } = useGenerateRoadmap();
  const onSubmit = async (data: z.infer<typeof promptSchema>) => {
    await generateRoadmap(data);
  }

  return (
    <div className="MainContainer my-5">
      {loading && <Loader />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-2/3 mx-auto space-x-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <Input
                    className="w-full"
                    placeholder="Add title"
                    type="text"
                    {...field}
                    name="title"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="duration"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <Input
                    className="w-full"
                    placeholder="Add duration"
                    type="number"
                    {...field}
                    name="duration"
                    value={Number(field.value).toString()}
                    onChange={(e) => {
                      const value = Math.max(Number(e.target.value), 0); // Ensure value is >= 0
                      field.onChange(value);
                    }}
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <div className="w-2/3 mx-auto mt-4">
            <FormField
              name="prompt"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Input
                    className="h-14 w-full"
                    placeholder="Add prompt to generate your roadmap"
                    type="text"
                    {...field}
                    name="prompt"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-2/3 mx-auto mt-6 flex justify-center">
            <Button
              type="submit"
              className="bg-purple-600 w-full font-semibold hover:bg-purple-800">
              {loading ? <BiLoader /> : "Generate"}
            </Button>
          </div>
        </form>
      </Form>

    </div>
  )
}

export default CreateRoadmap
