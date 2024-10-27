'use client'; 

import { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { usePostData } from '@/CustomHooks/usePostData';
import { z, ZodObject } from "zod"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

import { link } from "fs"
import { useFetchQuerySet } from '../CustomHooks/useFetchQuerySet';

interface Project {
    id: number;
    title: string;
}

interface User {
    id: number;
    username: string;
}

const formSchema = z.object({
    issueType: z.enum(["EPIC", "STORY", "BUG", "TASK"]),
    title: z.string().min(4).max(50),
    description: z.string().min(0).max(250),
    assignedToID: z.number().optional(),
    projectID: z.number().optional(),
    priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]),
    status: z.enum(["TO_DO", "IN_PROGRESS", "COMPLETED"]),
    attachment: z.instanceof(File).nullable(),
    tags: z.string().array(),
    startDate: z.date().nullable(),
    targetDate: z.date().nullable(),
  })

export function CreateIssue(){
    const router = useRouter();

    const [issueType, setIssueType] = useState<string>('EPIC');
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [assignedToID, setAssignedToID] = useState<number | undefined>(undefined);
    const [projectID, setProjectID] = useState<number | undefined>(undefined);
    const [priority, setPriority] = useState("LOW");
    const [status, setStatus] = useState("TO_DO");
    const [attachment, setAttachment] = useState<File | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [targetDate, setTargetDate] = useState<Date | null>(null);

    const issue_url = new Map([
        ["EPIC", "api/epic/"],
        ["STORY", "api/story/"],
        ["TASK", "api/task/"],
        ["BUG", "api/bug/"],
    ]);
        
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            issueType: "EPIC",
            title: "",
            description: "",
            assignedToID: undefined,
            projectID: undefined,
            priority: "LOW",
            status: "TO_DO",
            attachment: null,
            tags: [],
            startDate: null,
            targetDate: null,
        },
    })

    const issue = {
        title: title,
        description: description,
        assigned_to: assignedToID,
        project: projectID,
        priority: priority,
        status: status,
        attachment: attachment,
        tags: tags,
        start_date: startDate,
        target_date: targetDate
    }

    const { makeRequest, success } = usePostData();
    const userData = useFetchQuerySet<User>('api/users/');
    const projectData = useFetchQuerySet<Project>('api/project/');

    function handleLogin (values: z.infer<typeof formSchema>) {
        // this is all called in the same cycle (makeRequest uses the old values)
        /*
        setIssueType(values.issueType);
        setTitle(values.title);
        setDescription(values.description);
        setAssignedToID(values.assignedToID);
        setProjectID(values.projectID);
        setPriority(values.priority);
        setStatus(values.status);
        setAttachment(values.attachment);
        setTags(values.tags);
        setStartDate(values.startDate);
        setTargetDate(values.targetDate);
        */

        makeRequest(issue_url.get(values.issueType) ?? '', {
            title: values.title,
            description: values.title,
            assigned_to: values.assignedToID,
            project: values.projectID,
            priority: values.priority,
            status: values.status,
            attachment: values.attachment,
            tags: values.tags,
            start_date: values.startDate,
            target_date: values.targetDate
        });
        //console.log("was it a success: " + success);
        console.log(values);
    }

    return (
        <div className='flex h-full justify-center items-center pt-4 pb-4'>
            <Card className='h-full overflow-y-scroll'>
            <CardHeader>
                <CardTitle>
                    Create Issue
                </CardTitle>
                <CardDescription>
                    Fill out the form to create an Issue.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="issueType"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Issue Type</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange} 
                                    value={field.value} 
                                >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Issue Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="EPIC">Epic</SelectItem>
                                    <SelectItem value="STORY">Story</SelectItem>
                                    <SelectItem value="BUG">Bug</SelectItem>
                                    <SelectItem value="TASK">Task</SelectItem>
                                </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    <FormField
                        control={form.control}
                        name="assignedToID"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Assigned To</FormLabel>
                            <FormControl>
                            <Select
                                    onValueChange={(value) => field.onChange(Number(value))} 
                                >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Choose a user" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        userData.map(user => (
                                            <SelectItem 
                                                key={user.id} 
                                                value={String(user.id)} 
                                            >
                                                {user.username}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="projectID"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Project</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(value) => field.onChange(Number(value))} 
                                >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Choose a project" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        projectData.map(project => (
                                            <SelectItem 
                                                key={project.id} 
                                                value={String(project.id)} 
                                            >
                                                {project.title}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange} 
                                    value={field.value} 
                                >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Choose a priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LOW">Low</SelectItem>
                                    <SelectItem value="NORMAL">Normal</SelectItem>
                                    <SelectItem value="HIGH">High</SelectItem>
                                    <SelectItem value="URGENT">Urgent</SelectItem>
                                </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                            <Select
                                onValueChange={field.onChange} 
                                value={field.value} 
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Choose a Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TO_DO">To Do</SelectItem>
                                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="attachment"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Attachment</FormLabel>
                            <FormControl>
                                <Input            
                                    type="file"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        field.onChange(e.target.files?.[0] || null); // if no file is selected, set it to null
                                    }}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                                <Input placeholder="Start Date" {...startDate}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                    control={form.control}
                    name="targetDate"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Target Date</FormLabel>
                        <FormControl>
                            <Input placeholder="Target Date" {...targetDate}/>
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
