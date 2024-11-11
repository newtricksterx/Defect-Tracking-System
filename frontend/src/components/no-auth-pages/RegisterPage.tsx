'use client'; 

import { useContext, useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { usePostData } from '@/hooks/usePostData';
import { z } from "zod"
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
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().min(4).max(50),
  username: z.string().min(4).max(50),
  password: z.string().min(6).max(50),
  password2: z.string().min(6).max(50),
})

function RegisterPage(){
  const router = useRouter();

  let { authTokens, handleLogin } = useContext(AuthContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      password2: "",
    },
  })

  const { makeRequest: makeRegisterRequest } = usePostData();

  async function handleRegister(values: z.infer<typeof formSchema>){

    await makeRegisterRequest('api/register/', {
      email: values.email,
      username: values.username,
      password: values.password,
      password2: values.password2
    }).then(async () => {
      console.log("Register Successful!");
      await handleLogin(values.email, values.password);
    }).catch(error => console.log(error));
  }
  
    return (
      <div className='flex h-full justify-center items-center'>
        <Card>
          <CardHeader>
            <CardTitle>
              Sign Up
            </CardTitle>
            <CardDescription>
              Enter your information to sign up.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Register</Button>
                <Link href="/login" className='ml-2'>              
                  <Button type="button" variant='outline'>
                    Sign in
                  </Button>
                </Link>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
}



export default RegisterPage;