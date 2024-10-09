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
  const [currentUser, setCurrentUser] = useState(false);
  const [registerToggle, setRegisterToggle] = useState<boolean>(true); // true = on registration page, false = not on registration page

  function reset(){
    setEmail('');
    setUsername('');
    setPassword('');
    setPasswordConfirm('');
  }

  function handleRegisterToggle(){
    setRegisterToggle(!registerToggle);
    reset();
  }

  function handleRegister(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    client.post(
      "api/register",
      {
        email: email,
        username: username,
        password: password,
        password2: passwordConfirm
      },
      { withCredentials: true }
    ).then((response) => {
      console.log("Registration Successful.")

      client.post(
        "api/login/",
        {
          email: email,
          password: password
        },
        { withCredentials: true }
      ).then((response) => {
        setCurrentUser(true);
        console.log("Login Successful");
      }).catch((error) => {
        console.log("Login Failed");
      });
    }).catch((error) =>
      console.log(error)
    );

    reset();
  }

  function handleLogin (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(!currentUser){
      client.post(
        "api/login/",
        {
          email: email,
          password: password
        },
        { withCredentials: true }
      ).then((response) => {
        setCurrentUser(true);
        console.log("Login Successful");
      }).catch((error) => {
        console.log("Login Failed");
      });
    }

    reset();
  }

  function handleLogout (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    client.post(
      "api/logout/",
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

  if(registerToggle && !currentUser){
    return (
      <div>
        <h2>Registration Page</h2>
        <form className="flex flex-col justify-center items-center h-max gap-2" onSubmit={handleRegister}>
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
          <button className='border border-black p-1 hover:bg-slate-200' type="button" onClick={handleRegisterToggle}>To Login Page</button>
        </form>
      </div>
    );
  }

  if(!currentUser){
    return (
      <div>
        <h2>Login Page</h2>
        <form className="flex flex-col justify-center items-center h-max gap-2" onSubmit={handleLogin}>
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
          <button className='border border-black p-1 hover:bg-slate-200' type="button" onClick={handleRegisterToggle}>To Register Page</button>

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


export default RegisterPage;