'use client'

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { IIssue } from "@/lib/types";
import useFetchEndpoints from "@/hooks/useFetchEndpoints";

const endpoints = [
  '/api/epic/',
  '/api/story/',
  '/api/task/',
  '/api/bug/',
]


export function IssuesTablePage() {
  const {issuesData, loading} = useFetchEndpoints(endpoints)

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