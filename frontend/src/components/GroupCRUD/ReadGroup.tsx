"use client";

import { useContext, useEffect, useState } from "react";
import React from "react";
import AuthContext from "@/context/AuthContext";
import { Group, Issue } from "@/lib/types";
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

export function ReadGroup(
    { id } :  ISlugData
) {
    const slug_url = `/api/groups/${id}/`;

    const {data: fetchedData, loading} = useFetch<Group>(slug_url);
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
                        Group
                    </CardTitle>
                </CardHeader>
                <Separator />
                {
                    fetchedData && users && projects ? (
                        <CardContent className="flex flex-col gap-2 mt-4" key={fetchedData.id}>
                            <Label>Group Name: {fetchedData.groupName}</Label>
                        </CardContent>
                    ) : (
                        <div>Group Not Found.</div>
                    )
                }
            </Card>
        </div>

    )
}
