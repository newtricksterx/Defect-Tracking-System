'use client'

import React, { useContext, useEffect, useState } from 'react'
import { issueType } from '@/lib/types'
import AuthContext from '@/context/AuthContext'
import { Issue } from '@/lib/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReadIssue } from '@/components/IssueCRUD/ReadIssue'
import { UpdateIssue } from '@/components/IssueCRUD/UpdateIssue'
import HistoryIssueLog from '@/components/HistoryIssueLog'



function IssuePage({ 
    params 
}: { 
    params: 
    { 
        slug: string[]
    } 
}) {
    const issue_type = params.slug[0] as "epic" | "story" | "bug" | "task";

    if(params.slug[2] && params.slug[2] == "history"){
        return (
            <div>
                <HistoryIssueLog id={Number(params.slug[1])} issueType={params.slug[0]}/>
            </div>
        )
    }

    return (
        <Tabs defaultValue="read" className="w-[400px] h-full">
            <TabsList>
                <TabsTrigger value="read">Read Issue</TabsTrigger>
                <TabsTrigger value="update">Update Issue</TabsTrigger>
            </TabsList>
            <TabsContent value="read">
                <ReadIssue issue_type={issue_type} id={Number(params.slug[1])}></ReadIssue>
            </TabsContent>
            <TabsContent className="flex h-full" value="update">
                <UpdateIssue issue_type={issue_type} id={Number(params.slug[1])}></UpdateIssue>
            </TabsContent>
        </Tabs>
    )
}

export default IssuePage;
