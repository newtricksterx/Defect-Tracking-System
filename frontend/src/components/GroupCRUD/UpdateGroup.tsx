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
    id: number
}

const formSchema = z.object({
  //issueType: z.enum(["EPIC", "STORY", "BUG", "TASK"]),
  groupName: z.string().min(4).max(50),

});

export function UpdateGroup(
    { id } :  ISlugData
) {
  const router = useRouter();

  const { user } = useContext(AuthContext)

  const {data: userData, loading: userLoading} = useFetch<User[]>('/api/users/')
  const {data: projectData, loading: projectLoading} = useFetch<Project[]>('/api/projects/')
  
  const [success, setSuccess] = useState<boolean | undefined>(undefined)
  const [popoutText, setPopoutText] = useState<string>('');
  const [loadingDV, setLoadingDV] = useState(true)
  
  const url = `/api/groups/${id}/`;

  const { getRequest } = GetRequest();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      const response = await getRequest(url);
      setLoadingDV(false);
      return response.data
    },
  });

  const { patchRequest } = usePatchData()

  async function handleUpdateGroup(values: z.infer<typeof formSchema>) {
    //console.log(values)
    
    await patchRequest(url, {
      groupName: values.groupName,
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
          <CardTitle>Update Group</CardTitle>
          <CardDescription>
            Fill out the form to update a group.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form   
              onSubmit={form.handleSubmit(handleUpdateGroup)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="groupName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input placeholder={form.getValues().groupName} {...field} />
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
