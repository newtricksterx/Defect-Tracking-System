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
import { useFetchData } from "@/CustomHooks/useFetchData";
import { Issue } from "@/lib/types";

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
  assignedToID: z.number().optional(),
  projectID: z.number().optional(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]),
  status: z.enum(["TO_DO", "IN_PROGRESS", "COMPLETED"]),
  attachment: z.instanceof(File).nullable(),
  tags: z.string().array(),
  startDate: z.date().nullable(),
  targetDate: z.date().nullable(),
});

export function UpdateIssue(
    { issue_type, id } :  ISlugData
) {
  const router = useRouter();
  const { authTokens } = useContext(AuthContext);
  const [defaultValues, setDefaultValues] = useState({
    title: "",
    description: "",
    assignedToID: undefined as number | undefined,
    projectID: undefined as number | undefined,
    priority: "LOW" as "LOW" | "NORMAL" | "HIGH" | "URGENT",
    status: "TO_DO" as "TO_DO"| "IN_PROGRESS"| "COMPLETED",
    attachment: null,
    tags: [],
    startDate: null,
    targetDate: null,
  });
  const [loading, setLoading] = useState(true)

  const default_issue: Issue = {
    id: 0,
    issueType: "EPIC",
    title: "",
    description: "",
    assignedToID: 0,
    projectID: 0,
    status: "COMPLETED",
    priority: "URGENT",
  }

  const fetchedData = useFetchData<Issue>(`/api/${issue_type}/${id}`, authTokens ? authTokens.access : "", default_issue);

  useEffect(() => {
    if(fetchedData.id !== 0){
        setLoading(false);
        console.log(fetchedData.title)
        setDefaultValues({
            title: fetchedData.title,
            description: fetchedData.description,
            assignedToID: fetchedData.assignedToID,
            projectID: fetchedData.projectID,
            priority: fetchedData.priority as "LOW" | "NORMAL" | "HIGH" | "URGENT",
            status: fetchedData.status as "TO_DO"| "IN_PROGRESS"| "COMPLETED",
            attachment: null,
            tags: [],
            startDate: null,
            targetDate: null,
        })
    }
  }, [fetchedData])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const userData = useFetchData<User[]>(
    "/api/users/",
    authTokens ? authTokens.access : "",
    []
  );
  const projectData = useFetchData<Project[]>(
    "/api/project/",
    authTokens ? authTokens.access : "",
    []
  );

  function handleUpdateIssue(values: z.infer<typeof formSchema>) {
    console.log("Updated Issue!")
    console.log(values.title)
  }

  if(loading){
    return (
        <div>
            Loading...
        </div>
    )
  }

  return (
    <div className="flex h-full justify-center items-center pt-4 pb-4">
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
                      <Input placeholder={defaultValues.title} {...field} />
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
                      <Input placeholder={defaultValues.description} {...field} />
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
                          {userData.map((user) => (
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
                          {projectData.map((project) => (
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
                name="startDate"
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
                name="targetDate"
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
