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
import { IGroup, IIssue, IProject } from '@/lib/types';
import { Button } from '../ui/button';
import { NotebookPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import useFetch from '@/hooks/useFetch';
import { DeleteProject } from '../crud-project/DeleteProject';
import AuthContext from '@/context/AuthContext';
  
function ProjectTable() {
    const router = useRouter();
    const { data, loading } = useFetch<IProject[]>('/api/projects/');
    const { user } = useContext(AuthContext);


    function onClickHandlerUpdatePage(id: number){
        router.push(`/projects/${id}/`)
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
                        Project Title
                    </Button>
                </TableHead>
                <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
                <TableBody>
                    {
                        data && data.length > 0 ? data.map((project, index) => { 
                            return (
                                <TableRow key={index}>
                                    <TableCell>{project.title}</TableCell>
                                    <TableCell className='flex gap-2'>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Button asChild variant="ghost" onClick={() => onClickHandlerUpdatePage(Number(project.id))}>
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
                                        
                                        {user && user.is_admin ? <DeleteProject id={project.id}/> : null}
                                    </TableCell>
                                </TableRow>
                            )
                        }) : 
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">No projects found</TableCell>
                        </TableRow>
                    }
                </TableBody>
        </Table>            
        </div>
    )
}

export default ProjectTable
