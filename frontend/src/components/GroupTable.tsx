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
import { IGroup, IIssue } from '@/lib/types';
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
import useFetch from '@/hooks/useFetch';
import { DeleteGroup } from './crud-group/DeleteGroup';
import AuthContext from '@/context/AuthContext';
  
function GroupTable() {
    const router = useRouter();
    const { data, loading } = useFetch<IGroup[]>('/api/groups/');

    const { user } = useContext(AuthContext)

    function onClickHandlerUpdatePage(id: number){
        router.push(`/groups/${id}/`)
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
                    <Button variant="ghost">
                        Group Name
                    </Button>
                </TableHead>
                <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
                <TableBody>
                    {
                        data && data.length > 0 ? data.map((group, index) => { 
                            return (
                                <TableRow key={index}>
                                    <TableCell>{group.groupName}</TableCell>
                                    <TableCell className='flex gap-2'>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Button asChild variant="ghost" onClick={() => onClickHandlerUpdatePage(Number(group.id))}>
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
                                        {user && user.is_admin ? <DeleteGroup id={group.id}/> : null}
                                    </TableCell>
                                </TableRow>
                            )
                        }) : 
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">No groups found</TableCell>
                        </TableRow>
                    }
                </TableBody>
        </Table>            
        </div>
    )
}

export default GroupTable
