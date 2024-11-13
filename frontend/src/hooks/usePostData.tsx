"use client";

import AuthContext from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import { api_endpoint } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";

export function usePostData() {

  const makeRequest = async (url: string, attributes: object) => {
    const postData = async () => {
      try {
        const response = await axiosInstance.post(url, attributes, {
          withCredentials: true,
        });
        //console.log("Successful POST request: ", response.data);
        return response; // Return the data here
      } catch (error) {
        console.error("Error making POST request:", error);
        //throw error; // Re-throw the error so it can be caught by makeRequest if needed
        throw error
      }
    };

    return await postData(); // Await and return the data from postData
  };

  return { makeRequest };
}