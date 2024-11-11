"use client";

import { useContext, useEffect, useState } from "react";
import React from "react";
import AuthContext from "@/context/AuthContext";
import { useFetchData } from "@/hooks/useFetchData";
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

interface ISlugData {
    issue_type: "epic" | "story" | "bug" | "task";
    id: number
}

export function ReadIssue(
    { issue_type, id } :  ISlugData
) {
    const { authTokens } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [fetchedData, setfetchedData] = useState<Issue | null>(null);  // Initialize as an empty array

    const { fetchRequest } = useFetchData();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getData = await fetchRequest(`/api/${issue_type}/${id}/`)
                setfetchedData(getData.data)
                setLoading(false);
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, []);

    if (loading) {
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
                    fetchedData && fetchedData.id !== 0 ? (
                        <CardContent className="flex flex-col gap-2 mt-4" key={fetchedData.id}>
                            <Label>Title: {fetchedData.title}</Label>
                            <Label>Description: {fetchedData.description}</Label>
                            <Label>Assigned To: {fetchedData.assignedToID}</Label>
                            <Label>Project: {fetchedData.projectID}</Label>
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
