'use client'

import { useFetchQuerySet } from "@/CustomHooks/useFetchQuerySet";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { Issue } from "@/lib/types";
import { useFetchData } from "@/CustomHooks/useFetchData";

const endpoints = [
    '/api/epic/',
    '/api/story/',
    '/api/task/',
    '/api/bug/',
]


export function IssuesTablePage() {
  //const data = await getData()
  //const data = useFetchQuerySet<Issue>('api/epic/');
  const {authTokens} = useContext(AuthContext);

  
  const fetchedData = (
      endpoints.map((endpoint) => {
        const data = useFetchData<Issue[]>(endpoint, authTokens ? authTokens.access : "", [])
        return data;
    })
  )

  return (
    <div className="container mx-auto p-4 h-full">
      <DataTable columns={columns} data={fetchedData.flat()} />
    </div>
  )
}