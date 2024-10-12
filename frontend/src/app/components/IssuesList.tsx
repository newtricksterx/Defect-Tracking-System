'use client'

import axios from "axios";
import { useState } from "react";

axios.defaults.xsrfCookieName = 'csrfToken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});

interface Issue {
    id: number;
    title: string;
    description: string;
    priority: string;
}

export default function IssueListComponent(){
    const [data, setData] = useState<Issue[]>([]);
    
    client.get('api/epic/')
    .then(response => {
        setData(response.data);  // Store the data in the state
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="border-r-2 border-gray-400 text-left pl-2">Title</th>
                    <th className="border-r-2 border-gray-400 text-left pl-2">Description</th>
                    <th className="text-left pl-2">Priority</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(issue => (
                        <tr key={issue.id}>
                            <td className="border-r-2 border-gray-400 text-left pl-2">{issue.title}</td>
                            <td className="border-r-2 border-gray-400 text-left pl-2">{issue.description}</td>
                            <td className="text-left pl-2">{issue.priority}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}