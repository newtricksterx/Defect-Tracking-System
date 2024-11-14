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
import { Issue } from '@/lib/types';
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
import useFetchIssues from '@/hooks/useFetchIssues';
  

const endpoints = [
    '/api/epic/',
    '/api/story/',
    '/api/task/',
    '/api/bug/',
]
  
function IssueTable() {
    const router = useRouter();
    const { issuesData, loading } = useFetchIssues();


    function onClickHandlerUpdate(issue_type: string, id: number){
        router.push(`/issues/${issue_type}/${id}/`)
    }

    if(loading){
        <div>
            Loading...
        </div>
    }

    return (
        <div className="h-full overflow-y-scroll border border-black rounded-md">
        <Table className='w-full'>
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
                        issuesData ? issuesData.map((issue, index) => { 
                            return (
                                <TableRow key={index}>
                                    <TableCell>{issue.issueType}</TableCell>
                                    <TableCell>{issue.title}</TableCell>
                                    <TableCell>{issue.priority}</TableCell>
                                    <TableCell>{issue.status}</TableCell>
                                    <TableCell className='flex gap-2'>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Button asChild variant="ghost" onClick={() => onClickHandlerUpdate(issue.issueType.toLowerCase(), Number(issue.id))}>
                                                        <div>
                                                            <NotebookPen size={20}/>
                                                        </div>
                                                    </Button>
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
                        }) : 
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">No issues found</TableCell>
                        </TableRow>
                    }
                </TableBody>
        </Table>            
        </div>

    )
}

export default IssueTable
