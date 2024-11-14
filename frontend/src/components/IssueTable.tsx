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
import useFetchEndpoints from '@/hooks/useFetchEndpoints';
import { FileClock, ArrowDownZA, ArrowUpZA } from 'lucide-react';

  

const endpoints = [
    '/api/epic/',
    '/api/story/',
    '/api/task/',
    '/api/bug/',
]

interface SortConfig {
    key: keyof Issue;
    direction: 'asc' | 'desc';
}
  
function IssueTable() {
    const router = useRouter();
    const { issuesData, loading } = useFetchEndpoints(endpoints);

    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'issueType', direction: 'asc' });

    function handleSortIcon(){
        return (
            sortConfig.direction === 'asc' ? <ArrowUpZA size={20}/> : <ArrowDownZA size={20}/>
        )
    }

    function handleSort(columnKey: keyof Issue){
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key: columnKey, direction });
    };

    const sortedIssues = [...issuesData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });


    function onClickHandlerUpdate(issue_type: string, id: number){
        router.push(`/issues/${issue_type}/${id}/`)
    }

    function onClickHandlerHistory(issue_type: string, id: number){
        router.push(`/issues/${issue_type}/${id}/history`)
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
                <TableHead>
                    <Button onClick={() => handleSort('issueType')} variant="ghost">
                        Issue Type
                        {handleSortIcon()}
                    </Button>
                </TableHead>
                <TableHead>
                    <Button onClick={() => handleSort('title')} variant="ghost">
                        Title
                        {handleSortIcon()}
                    </Button>
                </TableHead>
                <TableHead>
                    <Button onClick={() => handleSort('status')} variant="ghost">
                        Status
                        {handleSortIcon()}
                    </Button>
                </TableHead>
                <TableHead>
                    <Button onClick={() => handleSort('priority')} variant="ghost">
                        Priority
                        {handleSortIcon()}
                    </Button>
                </TableHead>
                <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
                <TableBody>
                    {
                        sortedIssues && sortedIssues.length > 0 ? sortedIssues.map((issue, index) => { 
                            return (
                                <TableRow key={index}>
                                    <TableCell>{issue.issueType}</TableCell>
                                    <TableCell>{issue.title}</TableCell>
                                    <TableCell>{issue.status}</TableCell>
                                    <TableCell>{issue.priority}</TableCell>
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
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                <Button asChild variant="ghost" onClick={() => onClickHandlerHistory(issue.issueType.toLowerCase(), Number(issue.id))}>
                                                    <div>
                                                        <FileClock size={20}/>
                                                    </div>
                                                </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side='bottom'>
                                                <p>History Log</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
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
