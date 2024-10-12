'use client'; 

import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { error } from 'console';

axios.defaults.xsrfCookieName = 'csrfToken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});


function LoginPage(){
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [currentUser, setCurrentUser] = useState(false);

  function reset(){
    setEmail('');
    setPassword('');
  }

  async function handleLogin (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await client.post(
        "api/login/",
        {
          email: email,
          password: password
        },
        { withCredentials: true }
      );

      if(response.status === 200){
        console.log("Login Successful");
        router.push("/dashboard");
        setCurrentUser(true);
      }

    } catch(error) {
      console.log("Login Failed.");
      setCurrentUser(false);
    }
    
  }

  if(!currentUser){
    return (
      <div className='flex flex-col'>
        <form className="flex flex-col justify-center items-center h-max gap-2" onSubmit={handleLogin}>
          <h2>Login Page</h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-black"
          />
          <button className='border border-black p-1 hover:bg-slate-200' type="submit">Login</button>
          <button className='border border-black p-1 hover:bg-slate-200' type="reset">Reset</button>
        </form>
      </div>
    );
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