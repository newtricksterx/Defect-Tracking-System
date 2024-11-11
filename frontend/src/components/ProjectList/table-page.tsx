'use client'

import { Project, columns } from "./columns"
import { DataTable } from "./data-table"
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { useFetchData } from "@/hooks/useFetchData";

const endpoints = [
    '/api/project/',
]


export function ProjectsTablePage() {
    const fetchedData = (
         endpoints.map((endpoint) => {
            return useFetchData<Project[]>(endpoint, []);
        })
    )

    return (
      <div className="container mx-auto p-4 h-full">
        <DataTable columns={columns} data={fetchedData.flat()} />
      </div>
    )
  }