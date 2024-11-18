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
import { Group, Issue, Project } from '@/lib/types';
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
import { DeleteProject } from './ProjectCRUD/DeleteProject';
  
function ProjectTable() {
    const router = useRouter();
    const { data, loading } = useFetch<Project[]>('/api/projects/');

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
                                        <DeleteProject id={project.id}/>
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

export default ProjectTable
