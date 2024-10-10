'use client'; 

import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

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

  function reset(){
    setEmail('');
    setUsername('');
    setPassword('');
    setPasswordConfirm('');
  }


  async function handleRegister(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    try {
      const registerResponse = await client.post(
        "api/register",
        {
          email: email,
          username: username,
          password: password,
          password2: passwordConfirm
        },
        { withCredentials: true }
      )

      if(registerResponse.status === 200){
        console.log("Register Successful.");

        client.post(
          "api/login/",
          {
            email: email,
            password: password
          },
          { withCredentials: true }
        ).then((response) => {
          console.log("Login Successful");
          router.push('/dashboard')
        });
      }
      else{
        console.log('Register Unsuccessful.');
      }
    } catch(error) {
      console.log(error);
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
          <button className='border border-black p-1 hover:bg-slate-200' type="button" onClick={reset}>Reset</button>
        </form>
      </div>
    );
}



export default RegisterPage;