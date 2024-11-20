'use client'

import { columns } from "./columns"
import { DataTable } from "./data-table"
import useFetch from "@/hooks/useFetch";
import { IProject } from "@/lib/types";

export function ProjectsTablePage() {
    const {data, loading} = useFetch<IProject[]>('/api/projects/')

    if(loading){
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <div className="container mx-auto p-4 h-full">
        <DataTable columns={columns} data={data!} />
      </div>
    )
  }