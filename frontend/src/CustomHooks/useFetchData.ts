"use client"

import React from 'react'
import { useState, useEffect, useContext } from "react";
import axiosInstance from '@/lib/axios';

export function useFetchData<T>(url: string, default_value: T) {
  const [data, setData] = useState<T>(default_value);

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
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

