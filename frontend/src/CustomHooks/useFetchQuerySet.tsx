"use client";

import AuthContext from "@/context/AuthContext";
import { api_endpoint } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";

axios.defaults.xsrfCookieName = "csrfToken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export function useFetchQuerySet<T>(url: string, access_token: string) {
  const [data, setData] = useState<T[]>([]);
  //const {authTokens} = useContext(AuthContext);

  const client = axios.create({
    baseURL: api_endpoint,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    withCredentials: true,
  });
  
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

  return data;
}
