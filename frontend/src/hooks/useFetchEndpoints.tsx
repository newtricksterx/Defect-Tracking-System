'use client'

import { GetRequest } from '@/requests/GetRequest';
import React, { useEffect, useState } from 'react'
import { IIssue } from '@/lib/types';

function useFetchEndpoints(endpoints: string[]) {
    const [loading, setLoading] = useState(true)
    const [issuesData, setIssuesData] = useState<IIssue[]>([])
    const { getRequest } = GetRequest()

    async function fetchDataFromEndpoints(){
        const result = []
        for(const url of endpoints){
            const response = await getRequest(url);
            result.push(response.data)
        }

        return result
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getData = await fetchDataFromEndpoints()
                setIssuesData(getData.flat())
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, [])

    return {issuesData, loading}
}

export default useFetchEndpoints
