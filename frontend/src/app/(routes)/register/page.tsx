'use client'; 

import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { usePostData } from '@/app/CustomHooks/usePostData';

axios.defaults.xsrfCookieName = 'csrfToken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});


function RegisterPage(){
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  
  const router = useRouter();

  const postLoginData = {
    email: email,
    password: password
  }

  const postRegisterData = {
    email: email,
    username: username,
    password: password,
    password2: passwordConfirm
  }

  const { makeRequest: makeRegisterRequest, success: registerSuccess } = usePostData('api/register/', postRegisterData);
  const { makeRequest: makeLoginRequest, success: loginSuccess } = usePostData('api/login/', postLoginData);

  async function handleRegister(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    makeRegisterRequest();

    if(registerSuccess){
      console.log("Register Successful");

      makeLoginRequest();

      if(loginSuccess){
        console.log("Login Successful")
      }
      else{
        console.log("Login Failed")
      }
    }
    else{
      console.log("Register Failed");
    }
  }
  
    return (
      <div>
        <form className="flex flex-col justify-center items-center h-max gap-2" onSubmit={handleRegister}>
          <h2>Registration Page</h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-black"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-black"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="border border-black"
          />
          <button className='border border-black p-1 hover:bg-slate-200' type="submit">Register</button>
          <button className='border border-black p-1 hover:bg-slate-200' type="reset">Reset</button>
        </form>
      </div>
    );
}



export default RegisterPage;