"use client";

import { useContext, useEffect, useState } from "react";
import React from "react";
import AuthContext from "@/context/AuthContext";
import { Issue } from "@/lib/types";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import  { default_issue } from '@/lib/constants'
import useFetch from "@/hooks/useFetch";
import { getUsername, getProjectTitle } from "@/lib/utils";
import { User, Project } from "@/lib/types";

interface ISlugData {
    issue_type: "epic" | "story" | "bug" | "task";
    id: number
}

export function ReadIssue(
    { issue_type, id } :  ISlugData
) {
    const slug_url = `/api/${issue_type}/${id}/`;

    const {data: fetchedData, loading} = useFetch<Issue>(slug_url);
    const {data: users, loading: userLoading} = useFetch<User[]>('/api/users/')
    const {data: projects, loading: projectLoading} = useFetch<Project[]>('/api/projects/')

    if (loading || userLoading || projectLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className=''>
            <Card className=''>
                <CardHeader className="p-3">
                    <CardTitle>
                        {issue_type.toUpperCase()}
                    </CardTitle>
                </CardHeader>
                <Separator />
                {
                    fetchedData && users && projects ? (
                        <CardContent className="flex flex-col gap-2 mt-4" key={fetchedData.id}>
                            <Label>Title: {fetchedData.title}</Label>
                            <Label>Description: {fetchedData.description}</Label>
                            <Label>Assigned To: {getUsername(fetchedData.assigned_to, users)}</Label>
                            <Label>Project: {getProjectTitle(fetchedData.project, projects)}</Label>
                            <Label>Status: {fetchedData.status}</Label>
                            <Label>Priority: {fetchedData.priority}</Label>
                        </CardContent>
                    ) : (
                        <div>Issue Not Found.</div>
                    )
                }
            </Card>
        </div>

    )
}
