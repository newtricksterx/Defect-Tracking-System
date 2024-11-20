'use client'

import React, { useContext, useEffect, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReadGroup } from '@/components/crud-group/ReadGroup'
import { UpdateGroup } from '@/components/crud-group/UpdateGroup'



export default function GroupPage({ 
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
                <TabsTrigger value="read">Read Group</TabsTrigger>
                <TabsTrigger value="update">Update Group</TabsTrigger>
            </TabsList>
            <TabsContent value="read">
                <ReadGroup id={Number(params.slug[0])}></ReadGroup>
            </TabsContent>
            <TabsContent className="flex h-full" value="update">
                <UpdateGroup id={Number(params.slug[0])}></UpdateGroup>
            </TabsContent>
        </Tabs>
    )
}
