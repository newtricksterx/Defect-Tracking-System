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
import { HistoryIssue, Issue } from '@/lib/types';
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
import useFetch from '@/hooks/useFetch';

interface SlugParams {
    id: number;
    issueType: string;
}

function HistoryIssueLog({id, issueType}: SlugParams) {
    const {data, loading} = useFetch<HistoryIssue[]>(`/api/${issueType}/${id}/history/`)

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
                <TableHead>History ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
                <TableBody>
                    {
                        data && data.length > 0 ? data.map((issue, index) => { 
                            return (
                                <TableRow key={index}>
                                    <TableCell>{issue.history_id}</TableCell>
                                    <TableCell>{issue.title}</TableCell>
                                    <TableCell>{issue.priority}</TableCell>
                                    <TableCell>{issue.status}</TableCell>
                                </TableRow>
                            )
                        }) : 
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">No history found</TableCell>
                        </TableRow>
                    }
                </TableBody>
        </Table>            
        </div>
    )
}

export default HistoryIssueLog
