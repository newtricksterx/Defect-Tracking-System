"use client"

import React from 'react'
import axiosInstance from '@/lib/axios';

export function GetRequest() {
  const getRequest = async (url: string) => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get(url)
        return response; // Return the data here
      } catch (error) {
        console.error("Error making FETCH request:", error);
        throw error; // Re-throw the error so it can be caught by makeRequest if needed
      }
    };

    return await getData(); 
  };

  return { getRequest };
}