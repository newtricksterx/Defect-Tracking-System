'use client'

import React, { useContext, useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useFetchData } from '@/hooks/useFetchData';
import { Issue } from '@/lib/types';
import AuthContext from '@/context/AuthContext';
import { DeleteIssue } from './IssueCRUD/DeleteIssue';
import { Button } from './ui/button';
import { NotebookPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
  

const endpoints = [
    '/api/epic/',
    '/api/story/',
    '/api/task/',
    '/api/bug/',
]
  
function IssueTable() {
    const [loading, setLoading] = useState(true);
    const { authTokens } = useContext(AuthContext)
    const router = useRouter();

    const fetchedData = (
        endpoints.map((endpoint) => {
          const data = useFetchData<Issue[]>(endpoint, [])
          return data;
      })
    ).flat()

    function onClickHandler(issue_type: string, id: number){
        router.push(`/issues/${issue_type}/${id}/`)
    }

    useEffect(() => {
        if(fetchedData){
            setLoading(false);
            console.log("done loading!")
        }

    }, [fetchedData])
  
    if(loading){
        <div>
            Loading...
        </div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Issue Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    fetchedData.map((issue, index) => { 
                        return (
                            <TableRow key={index}>
                                <TableCell>{issue.issueType}</TableCell>
                                <TableCell>{issue.title}</TableCell>
                                <TableCell>{issue.priority}</TableCell>
                                <TableCell>{issue.status}</TableCell>
                                <TableCell className='flex gap-2'>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger onClick={() => onClickHandler(issue.issueType.toLowerCase(), Number(issue.id))}>
                                                <NotebookPen size={20}/>
                                            </TooltipTrigger>
                                            <TooltipContent side='bottom'>
                                            <p>Edit</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <DeleteIssue issue_type={issue.issueType.toLowerCase()} id={issue.id}/>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

export default IssueTable
