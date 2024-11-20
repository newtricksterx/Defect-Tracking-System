"use client";

import { useContext, useEffect, useState } from "react";
import React from "react";
import AuthContext from "@/context/AuthContext";
import { IGroup, IIssue } from "@/lib/types";
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
import { IUser, IProject } from "@/lib/types";

interface ISlugData {
    id: number
}

export function ReadGroup(
    { id } :  ISlugData
) {
    const slug_url = `/api/groups/${id}/`;

    const {data: fetchedData, loading} = useFetch<IGroup>(slug_url);
    const {data: users, loading: userLoading} = useFetch<IUser[]>('/api/users/')


    function getUsername(id: number){
        const user = users?.find((user) => user.id === id);
        return user ? user.username : "";
    }

    if (loading || userLoading) {
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
                    fetchedData ? (
                        <CardContent className="flex flex-col gap-2 mt-4" key={fetchedData.id}>
                            <Label>Group Name: {fetchedData.groupName}</Label>
                            <Label>Users in Group:</Label>
                            {
                                <ul>
                                    {
                                        fetchedData.users.map((user_id, index) => {
                                            return (
                                                <li className="pl-10" key={index}>{getUsername(user_id)}</li>
                                            )
                                        })
                                    }      
                                </ul>
                            }
                        </CardContent>
                    ) : (
                        <div>Group Not Found.</div>
                    )
                }
            </Card>
        </div>

    )
}
