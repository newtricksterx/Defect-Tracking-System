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
import { IUser, IProject } from "@/lib/types";
import AuthContext from "@/context/AuthContext";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/field"

interface ISlugData {
    id: number
}

const formSchema = z.object({
  //issueType: z.enum(["EPIC", "STORY", "BUG", "TASK"]),
  groupName: z.string().min(4).max(50),
  users: z.number().array()
});

export function UpdateGroup(
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

  const {data: userData, loading: userLoading} = useFetch<IUser[]>('/api/users/')
  
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
      users: values.users,
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

  if(userLoading  || loadingDV){
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
              <FormField
                control={form.control}
                name="users"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>                
                      <CheckboxGroup
                        defaultValue={form.getValues().users.map(String)}   
                        value={field.value.map(String)}
                        onChange={(value) => {
                          const numericValues = value.map(Number); // Convert values back to numbers
                          field.onChange(numericValues); // Update form field
                          console.log("Selected Users:", numericValues); // Print selected values
                        }}>
                        <Label>Add/Remove Users to Group:</Label>
                        {
                          userData?.map((user, index) => {
                            return (
                              <Checkbox key={index} value={user.id.toString()}>{user.username}</Checkbox>
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
