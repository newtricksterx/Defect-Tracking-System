"use client";

import { useContext, useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { z, ZodObject } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthContext from "@/context/AuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import { Issue } from "@/lib/types";
import { usePatchData } from "@/hooks/usePatchData";
import { default_issue } from "@/lib/constants";

interface Project {
  id: number;
  title: string;
}

interface User {
  id: number;
  username: string;
}

interface ISlugData {
    issue_type: "epic" | "story" | "bug" | "task";
    id: number
}

const formSchema = z.object({
  //issueType: z.enum(["EPIC", "STORY", "BUG", "TASK"]),
  title: z.string().min(4).max(50),
  description: z.string().min(0).max(250),
  assigned_to: z.number().optional(),
  project: z.number().optional(),
  priority: z.string().min(1).max(50),
  status: z.string().min(1).max(50),
  attachment: z.instanceof(File).nullable(),
  tags: z.string().array(),
  start_date: z.date().nullable(),
  target_date: z.date().nullable(),
});

export function UpdateIssue(
    { issue_type, id } :  ISlugData
) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const [userData, setUserData] = useState<User[]>()
  const [projectData, setProjectData] = useState<Project[]>()
  
  const issue_url = `/api/${issue_type}/${id}/`;

  const { fetchRequest } = useFetchData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      const response = await fetchRequest(issue_url);
      return await response.data
    },
  });

  const getUsername = (id: number | undefined) => {
    if(!id) return "Choose a user";
    const user = userData?.find((user) => user.id === id);
    return user ? user.username : "Choose a user";
  };
  

  const getProjectTitle = (id: number | undefined) => {
    if(!id) return "Choose a project";
    const project = projectData?.find((project) => project.id === id);
    return project ? project.title : "Choose a project";
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const userData = (await fetchRequest('/api/users/')).data
      const projectData = (await fetchRequest('/api/project/')).data
      setUserData(userData)
      setProjectData(projectData)

      setLoading(false);
    }

    fetchData()
  }, [])

  /*
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])
  */

  const { makeRequest } = usePatchData()

  async function handleUpdateIssue(values: z.infer<typeof formSchema>) {
    await makeRequest(issue_url, {
      title: values.title,
      description: values.description,
      assigned_to: values.assigned_to,
      project: values.project,
      priority: values.priority,
      status: values.status,
      attachment: values.attachment,
      tags: values.tags,
      start_date: values.start_date,
      target_date: values.target_date,
    });
  }

  if(loading){
    return (
        <div>
            Loading...
        </div>
    )
  }

  return (
    <div className="flex h-full justify-center items-center pb-16">
      <Card className="h-full overflow-y-scroll">
        <CardHeader>
          <CardTitle>Update Issue</CardTitle>
          <CardDescription>
            Fill out the form to update an Issue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form   
              onSubmit={form.handleSubmit(handleUpdateIssue)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder={form.getValues().title} {...field} />
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
                      <Input placeholder={form.getValues().description} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assigned_to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={getUsername(form.getValues().assigned_to)} />
                        </SelectTrigger>
                        <SelectContent>
                          {userData?.map((user) => (
                            <SelectItem key={user.id} value={String(user.id)}>
                              {user.username}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={getProjectTitle(form.getValues().project)} />
                        </SelectTrigger>
                        <SelectContent>
                          {projectData?.map((project) => (
                            <SelectItem
                              key={project.id}
                              value={String(project.id)}
                            >
                              {project.title}
                            </SelectItem>
                          ))}
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
                        value={form.getValues().priority}
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
                        value={form.getValues().status}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Choose a Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TO_DO">To Do</SelectItem>
                          <SelectItem value="IN_PROGRESS">
                            In Progress
                          </SelectItem>
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
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input placeholder="Start Date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="target_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Date</FormLabel>
                    <FormControl>
                      <Input placeholder="Target Date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
