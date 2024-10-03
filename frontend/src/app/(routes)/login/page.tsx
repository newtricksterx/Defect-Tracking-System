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


function LoginPage(){
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [currentUser, setCurrentUser] = useState(false);
  const [error, setError] = useState<string>('');

  function handleLogin (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(!currentUser){
      client.post(
        "api/login/",
        {
          username: username,
          password: password
        },
        { withCredentials: true }
      ).then((response) => {
        setCurrentUser(true);
        setError('');
        console.log("Login Successful");
      }).catch((error) => {
        setError("Login failed");
        console.log("Login Failed");
      });
    }
  }

  function handleLogout (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    client.post(
      "api/logout/", {},
      { withCredentials: true } 
    ).then((response) => {
      setCurrentUser(false);
      console.log("Logout Successful.");
      console.log(response);
    }).catch((error) => {
      console.log("Logout Failed.")
      console.log(error);
    });
  }

  if(!currentUser){
    return (
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className="flex flex-col justify-center items-center h-max gap-2" onSubmit={handleLogin}>
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
          <button className='border border-black p-1 hover:bg-slate-200' type="submit">Login</button>
        </form>
      </div>
    );
  }
  else{
    return (
      <div>
        <form className="flex flex-col justify-center items-center h-max gap-2" onSubmit={handleLogout}>
        <button className='border border-black p-1 hover:bg-slate-200' type="submit">Logout</button>
        </form>
      </div>
    );
  }
};


export default LoginPage;