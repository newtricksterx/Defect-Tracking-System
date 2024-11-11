'use client'

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { Issue } from "@/lib/types";
import { useFetchData } from "@/hooks/useFetchData";

const endpoints = [
    '/api/epic/',
    '/api/story/',
    '/api/task/',
    '/api/bug/',
]


export function IssuesTablePage() {
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState<Issue[]>([]);

  const { fetchRequest } = useFetchData()

  async function fetchDataFromEndpoints(){
      const result = []
      for(const url of endpoints){
          const response = await fetchRequest(url);
          result.push(response.data)
      }

      return result
  }

  useEffect(() => {
      const fetchData = async () => {
          try {
              const getData = await fetchDataFromEndpoints()
              setFetchedData(getData.flat())
              setLoading(false);
          } catch (error) {
              console.log(error)
          } 
      }

      fetchData()
  }, [])

  if(loading){
      <div>
          Loading...
      </div>
  }

  return (
    <div className="container mx-auto p-4 h-full">
      <DataTable columns={columns} data={fetchedData} />
    </div>
  )
}