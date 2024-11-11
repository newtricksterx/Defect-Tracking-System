"use client";

import axiosInstance from "@/lib/axios";

export function usePatchData() {
  const makeRequest = async (url: string, attributes: object) => {
    console.log(url);
    const patchData = async () => {
      try {
        const response = await axiosInstance.patch(url, attributes, {
          withCredentials: true,
        });
        return response; // Return the data here
      } catch (error) {
        console.error("Error making PATCH request:", error);
        throw error; // Re-throw the error so it can be caught by makeRequest if needed
      }
    };

    return await patchData(); // Await and return the data from postData
  };

  return { makeRequest };
}
