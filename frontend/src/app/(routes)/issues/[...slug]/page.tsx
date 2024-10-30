'use client'

import React, { useContext, useEffect, useState } from 'react'
import { issueType } from '@/lib/types'
import { useFetchQuerySet } from '@/CustomHooks/useFetchQuerySet'
import AuthContext from '@/context/AuthContext'
import { Issue } from '@/lib/types'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'

function IssuePage({ 
    params 
}: { 
    params: 
    { 
        slug: string[]
    } 
}) {
    
    const { authTokens } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [fetchedData, setfetchedData] = useState<Issue[]>([]);  // Initialize as an empty array

    const { data } = useFetchQuerySet<Issue>(
        `api/${params.slug[0]}/${params.slug[1]}`, 
        authTokens ? authTokens.access : ""
    );

    useEffect(() => {
        const issuesArray = [data];
        if (Array.isArray(issuesArray)) {
            setfetchedData(issuesArray.flat());
        } else {
            console.error("Expected an array in fetched data but found none.");
        }
        setLoading(false);  // Stop loading in any case
    }, [data]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex h-full justify-center items-center pt-4 pb-4'>
            <Card className=''>
                <CardHeader className="p-3">
                    <CardTitle>
                        {params.slug[0].toUpperCase()}
                    </CardTitle>
                </CardHeader>
                <Separator />
                {
                    fetchedData.length > 0 ? (
                        fetchedData.map(link => (
                            <CardContent className="flex flex-col gap-2 mt-4" key={link.id}>
                                <Label>Title: {link.title}</Label>
                                <Label>Description: {link.description}</Label>
                                <Label>Assigned To: {link.assignedToID}</Label>
                                <Label>Project: {link.projectID}</Label>
                                <Label>Status: {link.status}</Label>
                                <Label>Priority: {link.priority}</Label>
                            </CardContent>
                        ))
                    ) : (
                        <div>Issue Not Found.</div>
                    )
                }
            </Card>
        </div>

    )
}

export default IssuePage;
