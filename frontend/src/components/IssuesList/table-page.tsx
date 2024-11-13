'use client'

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { Issue } from "@/lib/types";
import useFetchIssues from "@/hooks/useFetchIssues";

export function IssuesTablePage() {
  const {issuesData, loading} = useFetchIssues()

  if(loading){
      <div>
          Loading...
      </div>
  }

  return (
    <div className="container mx-auto p-4 h-full">
      <DataTable columns={columns} data={issuesData} />
    </div>
  )
}