'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

axios.defaults.xsrfCookieName = 'csrfToken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});

export function usePostData(){
    const [success, setSuccess] = useState(false);

    const makeRequest = async (url: string, attributes: object) => {
      const postData = async () => {
        try {
          const response = await client.post(
            url,
            attributes,
            { withCredentials: true }
          );
          //console.log("Successful POST request: ", response.data);
          setSuccess(true);
          return response;  // Return the data here
        } catch (error) {
          console.error('Error making POST request:', error);
          setSuccess(false);
          throw error; // Re-throw the error so it can be caught by makeRequest if needed
        }
      };
    
      return await postData(); // Await and return the data from postData
    };
    
    return { makeRequest, success };
}

/*
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
          //router.push('/dashboard')
        });
      }
      else{
        console.log('Register Unsuccessful.');
      }
    } catch(error) {
      console.log(error);
    }
  }
*/