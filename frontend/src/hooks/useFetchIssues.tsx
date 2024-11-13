import { useFetchData } from '@/requests/GetRequest';
import React, { useEffect, useState } from 'react'
import { Issue } from '@/lib/types';

const endpoints = [
    '/api/epic/',
    '/api/story/',
    '/api/task/',
    '/api/bug/',
]

function useFetchIssues() {
    const [loading, setLoading] = useState(true)
    const [issuesData, setIssuesData] = useState<Issue[]>([])
    const { fetchRequest } = useFetchData()

    async function fetchDataFromEndpoints(){
        const result = []
        for(const url of endpoints){
            const response = await fetchRequest(url);
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

export default useFetchIssues
