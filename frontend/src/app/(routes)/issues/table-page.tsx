'use client'

import { useFetchQuerySet } from "@/app/CustomHooks/useFetchQuerySet";
import { Issue, columns } from "./columns"
import { DataTable } from "./data-table"


export default function TablePage() {
    //const data = await getData()
    const data = useFetchQuerySet<Issue>('api/epic/');

    return (
      <div className="container mx-auto p-10 h-full">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }