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

interface Project {
    id: number;
    title: string;
    description: string;
}

export default function ProjectListComponent(){
    const [data, setData] = useState<Project[]>([]);
    
    client.get('api/project/')
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
                </tr>
            </thead>
            <tbody>
                {
                    data.map(project => (
                        <tr key={project.id}>
                            <td className="border-r-2 border-gray-400 text-left pl-2">{project.title}</td>
                            <td className="border-r-2 border-gray-400 text-left pl-2">{project.description}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}