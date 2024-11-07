'use client'

import { useFetchQuerySet } from "@/CustomHooks/useFetchQuerySet";
import { Project, columns } from "./columns"
import { DataTable } from "./data-table"
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { useFetchData } from "@/CustomHooks/useFetchData";

const endpoints = [
    '/api/project/',
]


export function ProjectsTablePage() {
    //const data = await getData()
    //const data = useFetchQuerySet<Issue>('api/epic/');
    const {authTokens} = useContext(AuthContext);

    
    const fetchedData = (
         endpoints.map((endpoint) => {
            return useFetchData<Project[]>(endpoint, authTokens ? authTokens.access : "", []);
        })
    )

    return (
      <div className="container mx-auto p-4 h-full">
        <DataTable columns={columns} data={fetchedData.flat()} />
      </div>
    )
  }