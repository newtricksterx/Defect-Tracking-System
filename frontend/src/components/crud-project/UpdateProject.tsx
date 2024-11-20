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
import PopoutContent from '@/components/ui/PopoutContent';
import useFetch from "@/hooks/useFetch";
import { IUser, IProject, IGroup } from "@/lib/types";
import { getUsername, getProjectTitle } from "@/lib/utils";
import AuthContext from "@/context/AuthContext";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/field"

interface ISlugData {
    id: number
}

const formSchema = z.object({
  title: z.string().min(4).max(50),
  description: z.string().min(4).max(50),
  version: z.string().min(5).max(50),
  groups: z.number().array()
});

export function UpdateProject(
    { id } :  ISlugData
) {
  const { user } = useContext(AuthContext)
  const router = useRouter();

  if(!user.is_admin){
    return (
      <div>
        Authorization Denied.
      </div>
    )
  }

  const {data: groupsData, loading: groupsLoading} = useFetch<IGroup[]>('/api/groups/')
  
  const [success, setSuccess] = useState<boolean | undefined>(undefined)
  const [popoutText, setPopoutText] = useState<string>('');
  const [loadingDV, setLoadingDV] = useState(true)
  
  const url = `/api/projects/${id}/`;

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

  async function handleUpdateProject(values: z.infer<typeof formSchema>) {
    //console.log(values)
    
    await patchRequest(url, {
      title: values.title,
      description: values.description,
      version: values.version,
      groups: values.groups,
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

  if(groupsLoading || loadingDV){
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
          <CardTitle>Update Project</CardTitle>
          <CardDescription>
            Fill out the form to update a project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form   
              onSubmit={form.handleSubmit(handleUpdateProject)}
              className="space-y-4"
            >
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Project Titile</FormLabel>
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
                name="version"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Version</FormLabel>
                    <FormControl>
                        <Input placeholder={form.getValues().version} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="groups"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>                
                      <CheckboxGroup
                        defaultValue={[]}   
                        value={field.value.map(String)}
                        onChange={(value) => {
                          const numericValues = value.map(Number); // Convert values back to numbers
                          field.onChange(numericValues); // Update form field
                          console.log("Selected Groups:", numericValues); // Print selected values
                      }}>
                        <Label>Add/Remove Contributing Groups:</Label>
                        {
                          groupsData?.map((group, index) => {
                            return (
                              <Checkbox key={index} value={group.id.toString()}>{group.groupName}</Checkbox>
                            );
                          })
                        }
                      </CheckboxGroup>
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
