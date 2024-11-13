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
    const [fetchedData, setFetchedData] = useState<Issue[]>();
    const router = useRouter();


    function onClickHandlerUpdate(issue_type: string, id: number){
        router.push(`/issues/${issue_type}/${id}/`)
    }

    const { fetchRequest } = useFetchData()

    async function fetchDataFromEndpoints(){
        const result = []
        for(const url of endpoints){
            const response = await fetchRequest(url);
            result.push(response.data)
        }

        return result
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getData = await fetchDataFromEndpoints()
                setFetchedData(getData.flat())
                setLoading(false);
            } catch (error) {
                console.log(error)
            } 
        }

        fetchData()
    }, [])
  
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
                    fetchedData ? fetchedData.map((issue, index) => { 
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
                        
                    </TableRow>
                }
            </TableBody>
        </Table>
    )
}

export default IssueTable
