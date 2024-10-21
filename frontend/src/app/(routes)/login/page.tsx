'use client'; 

import { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { usePostData } from '@/app/CustomHooks/usePostData';
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

import { link } from "fs"

const formSchema = z.object({
  email: z.string().min(4).max(50),
  password: z.string().min(6).max(50),
})

function LoginPage(){
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [currentUser, setCurrentUser] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const postLoginData = {
    email: email,
    password: password,
  }

  const { makeRequest, success } = usePostData('api/login/', postLoginData);

  async function handleLogin (values: z.infer<typeof formSchema>) {
    setEmail(values.email);
    setPassword(values.password);
    makeRequest();
    //console.log(values);
    setCurrentUser(success);
  }

  if(!currentUser){
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
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
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
                        <Input placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Login</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    )
  }
  else{
    return (
      <div>
        User is already logged in!
      </div>
    );
  }
};


export default LoginPage;