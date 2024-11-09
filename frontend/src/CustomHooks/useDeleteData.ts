"use client";

import AuthContext from "@/context/AuthContext";
import { api_endpoint } from "@/lib/utils";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrfToken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export function useDeleteData(access_token: string) {

  const client = axios.create({
    baseURL: api_endpoint,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    withCredentials: true,
  });

  const makeRequest = async (url: string) => {
    console.log(url);
    const deleteData = async () => {
      try {
        const response = await client.delete(url, {
          withCredentials: true,
        });
        return response; // Return the data here
      } catch (error) {
        console.error("Error making DELETE request:", error);
        throw error; // Re-throw the error so it can be caught by makeRequest if needed
      }
    };

    return await deleteData(); 
  };

  return { makeRequest };
}
