'use client'

import { Project, columns } from "./columns"
import { DataTable } from "./data-table"
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { useFetchData } from "@/hooks/useFetchData";

export function ProjectsTablePage() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const { fetchRequest } = useFetchData();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetchRequest('/api/project/')
          setData(response.data)
          setLoading(false)
        } catch (error){
          console.log(error)
        }
      }

      fetchData()
    }, [])

    if(loading){
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <div className="container mx-auto p-4 h-full">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }