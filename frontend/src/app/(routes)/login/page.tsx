'use client'; 

import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { LoginStatus } from '@/app/components/LoginStatus';

axios.defaults.xsrfCookieName = 'csrfToken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


export default function LoginPage(){
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [currentUser, setCurrentUser] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();


  function handleLogin(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    client.post(
      "api/login/",
      {
        username: username,
        password: password
      }
    ).then(function(res){
      setCurrentUser(true);
    });
  }


  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className="flex flex-col justify-center items-center h-max" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <LoginStatus 
        loginStatus = {currentUser}
      />
    </div>
    
  );
};