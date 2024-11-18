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
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import PopoutContent from '@/components/UIComponents/PopoutContent';
import AuthContext from "@/context/AuthContext";
import { Project, User } from "@/lib/types";
import useFetch from "@/hooks/useFetch";


const formSchema = z.object({
  groupName: z.string().min(4).max(50),
});

/*
class Group(models.Model):
    id = models.BigAutoField(primary_key=True)
    groupName = models.CharField(max_length=100)
    users = models.ManyToManyField(CustomUser, blank=True)
*/

export function CreateGroup() {
  const {data: userData, loading: userLoading} = useFetch<User[]>('/api/users/')
  const {data: projectData, loading: projectLoading} = useFetch<Project[]>('/api/projects/')

  const { user } = useContext(AuthContext)

  const [success, setSuccess] = useState<boolean | undefined>(undefined)
  const [popoutText, setPopoutText] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        groupName: "",
    },
  });

  const { postRequest } = usePostData();

  async function handleCreateGroup(values: z.infer<typeof formSchema>) {
    console.log(values)
    await postRequest('/api/groups/', {
        groupName: values.groupName,
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
          <CardTitle>Create Group</CardTitle>
          <CardDescription>
            Fill out the form to create an Group.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateGroup)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="groupName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Group Name" {...field} />
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
