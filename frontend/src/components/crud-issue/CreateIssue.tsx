"use client";

import { useContext, useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { usePostData } from "@/requests/PostRequest";
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
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import PopoutContent from '@/components/ui/PopoutContent';
import AuthContext from "@/context/AuthContext";
import { IProject, IUser } from "@/lib/types";
import useFetch from "@/hooks/useFetch";


const formSchema = z.object({
  issueType: z.enum(["EPIC", "STORY", "BUG", "TASK"]),
  title: z.string().min(4).max(50),
  description: z.string().min(0).max(250),
  assigned_to: z.number().optional(),
  project: z.number().optional(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]),
  status: z.enum(["TO_DO", "IN_PROGRESS", "COMPLETED"]),
  attachment: z.instanceof(File).nullable(),
  tags: z.string().array(),
  start_date: z.string().optional(), 
  target_date: z.string().optional(), 
});

export function CreateIssue() {
  const {data: userData, loading: userLoading} = useFetch<IUser[]>('/api/users/')
  const {data: projectData, loading: projectLoading} = useFetch<IProject[]>('/api/projects/')

  const { user } = useContext(AuthContext)

  const [success, setSuccess] = useState<boolean | undefined>(undefined)
  const [popoutText, setPopoutText] = useState<string>('');

  const issue_url = new Map([
    ["EPIC", "/api/epic/"],
    ["STORY", "/api/story/"],
    ["TASK", "/api/task/"],
    ["BUG", "/api/bug/"],
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issueType: "EPIC",
      title: "",
      description: "",
      assigned_to: undefined,
      project: undefined,
      priority: "LOW",
      status: "TO_DO",
      attachment: null,
      tags: [],
      start_date: undefined,
      target_date: undefined,
    },
  });

  const { postRequest } = usePostData();

  async function handleCreateIssue(values: z.infer<typeof formSchema>) {
    console.log(values)
    await postRequest(issue_url.get(values.issueType) ?? "", {
      title: values.title,
      description: values.description,
      assigned_to: values.assigned_to,
      created_by: user.user_id,
      project: values.project,
      priority: values.priority,
      status: values.status,
      attachment: values.attachment,
      tags: values.tags,
      start_date: values.start_date,
      target_date: values.target_date,
    }).then((response) => {
      setSuccess(response.status === 201);
      setPopoutText(response.statusText);
    }).catch((err) => {
      setSuccess(false);
      setPopoutText(err.message || "An error occurred.")
    });
  }

  function onActionHandler(){
    setSuccess(undefined)
    setPopoutText('')
  }

  const { isValid } = form.formState;

  if(userLoading || projectLoading){
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
          <CardTitle>Create Issue</CardTitle>
          <CardDescription>
            Fill out the form to create an Issue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateIssue)}
              className="space-y-4"
            >
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
              {
                user.is_admin ?               
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
                              <SelectValue placeholder="Choose a user" />
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
                  /> : null
              }
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
                          <SelectValue placeholder="Choose a project" />
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
                          {user.is_admin ? <SelectItem value="COMPLETED">Completed</SelectItem> : null}
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
                    <Input
                      type="date"
                      placeholder="Start Date"
                      {...field}
                      value={field.value || ''} // display value directly as string
                      onChange={(e) => {
                        const selectedDate = e.target.value;
                        field.onChange(selectedDate); // store as 'YYYY-MM-DD' string
                      }}
                    />
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
                    <Input
                      type="date"
                      placeholder="Target Date"
                      {...field}
                      value={field.value || ''} // display value directly as string
                      onChange={(e) => {
                        const selectedDate = e.target.value;
                        field.onChange(selectedDate); // store as 'YYYY-MM-DD' string
                      }}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialog>
                <AlertDialogTrigger type="submit">Create</AlertDialogTrigger>
                {isValid ? <PopoutContent result={success} title="Create Status" message={popoutText} onAction={onActionHandler}></PopoutContent> : null}
              </AlertDialog>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
