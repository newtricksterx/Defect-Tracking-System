"use client";

import axiosInstance from "@/lib/axios";

export function DeleteRequest() {

  const deleteRequest = async (url: string) => {
    const deleteData = async () => {
      try {
        const response = await axiosInstance.delete(url, {
          withCredentials: true,
        });
        return response; // Return the data here
      } catch (error) {
        console.error("Error making DELETE request:", error);
        throw error; 
      }
    };

    return await deleteData(); 
  };

  return { deleteRequest };
}
