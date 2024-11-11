'use client'; 

import { useContext, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
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
import { jwtDecode } from "jwt-decode";
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().min(4).max(50),
  password: z.string().min(6).max(50),
})

function LoginPage(){
  const router = useRouter();

  const { handleLogin } = useContext(AuthContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function login(values: z.infer<typeof formSchema>){
    await handleLogin(values.email, values.password);
  }

  return (
    <div className='flex h-full justify-center items-center'>
      <Card>
        <CardHeader>
          <CardTitle>
            Sign In
          </CardTitle>
          <CardDescription>
            Enter your information to sign in to our account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(login)} className="space-y-4">
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
              <Button type="submit">Login</Button>
              <Link href="/register" className='ml-2'>              
                <Button type="button" variant='outline'>
                  Create an account
                </Button>
              </Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
};


export default LoginPage;