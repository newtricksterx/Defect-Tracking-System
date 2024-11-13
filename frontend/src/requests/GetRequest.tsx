"use client"

import React from 'react'
import { useState, useEffect, useContext } from "react";
import axiosInstance from '@/lib/axios';

export function useFetchData() {
  const fetchRequest = async (url: string) => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(url)
        return response; // Return the data here
      } catch (error) {
        console.error("Error making FETCH request:", error);
        throw error; // Re-throw the error so it can be caught by makeRequest if needed
      }
    };

    return await fetchData(); 
  };

  return { fetchRequest };
}


  /*
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
  }, [url]);*/