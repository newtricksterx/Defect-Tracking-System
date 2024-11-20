'use client'

import React, { useContext, useEffect, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReadProject } from '@/components/crud-project/ReadProject'
import { UpdateProject } from '@/components/crud-project/UpdateProject'



export default function ProjectPage({ 
    params 
}: { 
    params: 
    { 
        slug: string[]
    } 
}) {

    return (
        <Tabs defaultValue="read" className="w-[400px] h-full">
            <TabsList>
                <TabsTrigger value="read">Read Project</TabsTrigger>
                <TabsTrigger value="update">Update Project</TabsTrigger>
            </TabsList>
            <TabsContent value="read">
                <ReadProject id={Number(params.slug[0])}></ReadProject>
            </TabsContent>
            <TabsContent className="flex h-full" value="update">
                <UpdateProject id={Number(params.slug[0])}></UpdateProject>
            </TabsContent>
        </Tabs>
    )
}
