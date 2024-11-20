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
import { IUser, IProject, IGroup } from "@/lib/types";

interface ISlugData {
    id: number
}

export function ReadProject(
    { id } :  ISlugData
) {
    const slug_url = `/api/projects/${id}/`;

    const {data: fetchedData, loading} = useFetch<IProject>(slug_url);
    const {data: groups, loading: groupLoading} = useFetch<IGroup[]>('/api/groups/')

    function getGroupName(id: number){
        const group = groups?.find((group) => group.id === id);
        return group ? group.groupName : "";
    }

    if (loading || groupLoading) {
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
                    fetchedData && groups ? (
                        <CardContent className="flex flex-col gap-2 mt-4" key={fetchedData.id}>
                            <Label>Project Name: {fetchedData.title}</Label>
                            <Label>Description: {fetchedData.description}</Label>
                            <Label>Version: {fetchedData.version}</Label>
                            <Label>Contributing Groups:</Label>
                            {
                                <ul>
                                    {
                                        fetchedData.groups.map((group_id, index) => {
                                            return (
                                                <li className="pl-10" key={index}>{getGroupName(group_id)}</li>
                                            )
                                        })
                                    }      
                                </ul>
                            }
                        </CardContent>
                    ) : (
                        <div>Project Not Found.</div>
                    )
                }
            </Card>
        </div>

    )
}
