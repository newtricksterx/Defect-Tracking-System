"use client"

import React from 'react'
import AuthContext from "@/context/AuthContext";
import axios from "axios";
import { api_endpoint } from "@/lib/utils";
import { useState, useEffect, useContext } from "react";

axios.defaults.xsrfCookieName = "csrfToken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export function useFetchData<T>(url: string, access_token: string, default_value: T) {
  const [data, setData] = useState<T>(default_value);

  const client = axios.create({
      baseURL: api_endpoint,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      withCredentials: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      await client
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

