'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

axios.defaults.xsrfCookieName = 'csrfToken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export function useFetchQuerySet<T>(url: string){
    const [data, setData] = useState<T[]>([]);
    
    const client = axios.create({
        baseURL: "http://127.0.0.1:8000/",
        withCredentials: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            let response = await client.get(url)
            .then(response => {
                setData(response.data);  // Store the data in the state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }

        fetchData();
    }, [url])


    return data;
}
