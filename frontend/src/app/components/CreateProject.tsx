'use client'; 

import { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { usePostData } from '@/app/CustomHooks/usePostData';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { link } from "fs"

const formSchema = z.object({
  title: z.string().min(4).max(50),
  description: z.string().min(0).max(250),
})

export function CreateProject(){
    const router = useRouter();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
        
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    const postProjectData = {
        title: title,
        description: description,
    }

    const { makeRequest, success } = usePostData();

    async function handleLogin (values: z.infer<typeof formSchema>) {
        //setTitle(values.title);
        //setDescription(values.description);
        makeRequest('api/login/', {
            title: values.title,
            description: values.description,
        });
    }

    return (
        <div className='flex h-full justify-center items-center'>
            <Card>
            <CardHeader>
                <CardTitle>
                    Create Project
                </CardTitle>
                <CardDescription>
                    Fill out the form to create a project.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Title" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input placeholder="Description" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Create</Button>
                </form>
                </Form>
            </CardContent>
            </Card>
        </div>
    )
};
