"use client";

import { useContext, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { usePostData } from "@/requests/PostRequest";
import { z } from "zod";
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
import AuthContext from "@/context/AuthContext";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/field"
import useFetch from "@/hooks/useFetch";
import { IGroup } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(4).max(50),
  description: z.string().min(0).max(250),
  groups: z.number().array()
});

export function CreateProject() {

  const { user } = useContext(AuthContext)
  const router = useRouter();

  if(!user.is_admin){
    return (
      <div>
        Authorization Denied.
      </div>
    )
  }

  const {data, loading} = useFetch<IGroup[]>('/api/groups/')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      groups: [],
    },
  });

  const { postRequest } = usePostData();

  async function handleCreateProject(values: z.infer<typeof formSchema>) {
    postRequest("/api/projects/", {
      title: values.title,
      description: values.description,
      groups: values.groups,
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
    <div className="flex h-full justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
          <CardDescription>
            Fill out the form to create a project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateProject)}
              className="space-y-4"
            >
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
                          <Label>Add Users to Group:</Label>
                          {
                            data?.map((group, index) => {
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
              <Button type="submit">Create</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
