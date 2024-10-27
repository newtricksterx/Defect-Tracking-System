'use client'

import { useFetchQuerySet } from "@/CustomHooks/useFetchQuerySet";
import { Issue, columns } from "./columns"
import { DataTable } from "./data-table"

const endpoints = [
    'api/epic/',
    'api/story',
    'api/task',
    'api/bug',
]


export function IssuesTablePage() {
    //const data = await getData()
    //const data = useFetchQuerySet<Issue>('api/epic/');

    
    const fetchedData = (
         endpoints.map((endpoint) => {
            return useFetchQuerySet<Issue>(endpoint);
        })
    )

    return (
      <div className="container mx-auto p-4 h-full">
        <DataTable columns={columns} data={fetchedData.flat()} />
      </div>
    )
  }