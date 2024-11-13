'use client'

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { useFetchData } from "@/requests/GetRequest";
import useFetch from "@/hooks/useFetch";
import { Project } from "@/lib/types";

export function ProjectsTablePage() {
    const {data, loading} = useFetch<Project[]>('/api/projects/')

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