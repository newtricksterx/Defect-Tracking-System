"use client";

import AuthContext from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";

axios.defaults.xsrfCookieName = "csrfToken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export function useFetchQuerySet<T>(url: string, access_token: string) {
  const [data, setData] = useState<T[]>([]);
  const issueType = getIssueType(url);
  //const {authTokens} = useContext(AuthContext);

  const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    withCredentials: true,
  });
  /*

  const makeRequest = async (url: string, attributes: object) => {
    const getData = async () => {
      try {
        const response = await client.get(url);
        return response; // Return the data here
      } catch (error) {
        console.error("Error making get request:", error);
      }
    };

    return await getData(); // Await and return the data from postData
  };*/
  
  useEffect(() => {
    const fetchData = async () => {
      let response = await client
        .get(url)
        .then((response) => {
          setData(response.data); // Store the data in the state
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, [url]);

  return { data, issueType };
}

function getIssueType(endpoint: string){
  if(endpoint === 'api/epic/'){
    return 'epic';
  }
  else if(endpoint === 'api/story/'){
    return 'story';
  }
  else if(endpoint === 'api/task/'){
    return 'task';
  }
  else if(endpoint === 'api/bug/'){
    return 'bug';
  }

  return ''
}