"use client";

import { useContext, useEffect, useState } from "react";
import React from "react";
import AuthContext from "@/context/AuthContext";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import useFetch from "@/hooks/useFetch";
import { getUsername, getProjectTitle } from "@/lib/utils";
import { User, Project } from "@/lib/types";

interface ISlugData {
    id: number
}

export function ReadProject(
    { id } :  ISlugData
) {
    const slug_url = `/api/projects/${id}/`;

    const {data: fetchedData, loading} = useFetch<Project>(slug_url);
    const {data: users, loading: userLoading} = useFetch<User[]>('/api/users/')

    if (loading || userLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className=''>
            <Card className=''>
                <CardHeader className="p-3">
                    <CardTitle>
                    Project
                    </CardTitle>
                </CardHeader>
                <Separator />
                {
                    fetchedData && users ? (
                        <CardContent className="flex flex-col gap-2 mt-4" key={fetchedData.id}>
                            <Label>Project Name: {fetchedData.title}</Label>
                            <Label>Description: {fetchedData.description}</Label>
                            <Label>Description: {fetchedData.version}</Label>
                        </CardContent>
                    ) : (
                        <div>Project Not Found.</div>
                    )
                }
            </Card>
        </div>

    )
}
