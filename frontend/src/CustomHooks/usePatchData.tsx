"use client";

import AuthContext from "@/context/AuthContext";
import { api_endpoint } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";

axios.defaults.xsrfCookieName = "csrfToken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export function usePatchData(access_token: string) {

  const client = axios.create({
    baseURL: api_endpoint,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    withCredentials: true,
  });

  const makeRequest = async (url: string, attributes: object) => {
    console.log(url);
    const putData = async () => {
      try {
        const response = await client.patch(url, attributes, {
          withCredentials: true,
        });
        //console.log("Successful POST request: ", response.data);
        return response; // Return the data here
      } catch (error) {
        console.error("Error making POST request:", error);
        throw error; // Re-throw the error so it can be caught by makeRequest if needed
      }
    };

    return await putData(); // Await and return the data from postData
  };

  return { makeRequest };
}
