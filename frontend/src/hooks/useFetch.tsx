import { GetRequest } from '@/requests/GetRequest';
import React, { useEffect, useState } from 'react'

function useFetch<T>(url: string) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T>()

    const { getRequest } = GetRequest();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getRequest(url)
          setData(response.data)
        } catch (error){
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    }, [])

    return {data, loading}

}

export default useFetch
