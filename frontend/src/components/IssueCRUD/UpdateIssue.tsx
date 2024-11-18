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
import { GetRequest } from "@/requests/GetRequest";
import { usePatchData } from "@/requests/PatchRequest";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import PopoutContent from '@/components/UIComponents/PopoutContent';
import useFetch from "@/hooks/useFetch";
import { User, Project } from "@/lib/types";
import { getUsername, getProjectTitle } from "@/lib/utils";
import AuthContext from "@/context/AuthContext";

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
  start_date: z.string().optional(), 
  target_date: z.string().optional(), 
});

export function UpdateIssue(
    { issue_type, id } :  ISlugData
) {
  const router = useRouter();

  const { user } = useContext(AuthContext)

  const {data: userData, loading: userLoading} = useFetch<User[]>('/api/users/')
  const {data: projectData, loading: projectLoading} = useFetch<Project[]>('/api/projects/')
  
  const [success, setSuccess] = useState<boolean | undefined>(undefined)
  const [popoutText, setPopoutText] = useState<string>('');
  const [loadingDV, setLoadingDV] = useState(true)
  
  const issue_url = `/api/${issue_type}/${id}/`;

  const { getRequest } = GetRequest();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      const response = await getRequest(issue_url);
      setLoadingDV(false);
      return response.data
    },
  });

  const { patchRequest } = usePatchData()

  async function handleUpdateIssue(values: z.infer<typeof formSchema>) {
    //console.log(values)
    
    await patchRequest(issue_url, {
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
    }).then((response) => {
      setSuccess(response.status === 200);
      setPopoutText(response.statusText);
    }).catch((err) => {
      setSuccess(false);
      setPopoutText(err)
    });
  }

  function onActionHandler(){
    setSuccess(undefined)
    setPopoutText('')
  }

  const { isValid } = form.formState;

  if(userLoading || projectLoading || loadingDV){
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
                              <SelectValue placeholder={getUsername(form.getValues().assigned_to, userData)} />
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
                          <SelectValue placeholder={getProjectTitle(form.getValues().project, projectData)} />
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
              {
                user.is_admin ?               
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
                  /> : null
              }
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
                <AlertDialogTrigger type="submit">Update</AlertDialogTrigger>
                {isValid ? <PopoutContent result={success} title="Update Status" message={popoutText} onAction={onActionHandler}></PopoutContent> : null}
              </AlertDialog>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
