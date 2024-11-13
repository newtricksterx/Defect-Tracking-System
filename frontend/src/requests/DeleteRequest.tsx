"use client";

import axiosInstance from "@/lib/axios";

export function useDeleteData() {

  const makeRequest = async (url: string) => {
    const deleteData = async () => {
      try {
        const response = await axiosInstance.delete(url, {
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
