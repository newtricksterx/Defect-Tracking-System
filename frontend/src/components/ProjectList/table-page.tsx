'use client'

import { useFetchQuerySet } from "@/CustomHooks/useFetchQuerySet";
import { Project, columns } from "./columns"
import { DataTable } from "./data-table"

const endpoints = [
    'api/project/',
]


export function ProjectsTablePage() {
    //const data = await getData()
    //const data = useFetchQuerySet<Issue>('api/epic/');

    
    const fetchedData = (
         endpoints.map((endpoint) => {
            return useFetchQuerySet<Project>(endpoint);
        })
    )

    return (
      <div className="container mx-auto p-10 h-full">
        <DataTable columns={columns} data={fetchedData.flat()} />
      </div>
    )
  }