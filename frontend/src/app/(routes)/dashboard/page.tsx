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

interface issue {
    id: number;
    title: string;
    description: string;
    priority: string;
}


function DashboardPage(){
    const [data, setData] = useState<issue[]>([]);
    
    client.get('http://127.0.0.1:8000/api/epic/')
    .then(response => {
        setData(response.data);  // Store the data in the state
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    

    return (
        <main className="h-full w-full grid gap-2 grid-cols-2 grid-rows-2 m-2 p-2 text-sm">
            <div className="border-black border-2 rounded shadow-md">
                Graphs
            </div>
            <div className="border-black border-2 rounded shadow-md">
                Sprint Progress
            </div >
            <div className="border-black border-2 rounded shadow-md">
                Activities
            </div>
            <div className="border-black border-2 rounded shadow-md">
                <h2 className="bg-black text-white p-1 pl-2">
                    Assigned To Me
                </h2>
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
                            data.map(item => (
                                <tr key={item.id}>
                                    <td className="border-r-2 border-gray-400 text-left pl-2">{item.title}</td>
                                    <td className="border-r-2 border-gray-400 text-left pl-2">{item.description}</td>
                                    <td className="text-left pl-2">{item.priority}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </main>
    );

}

export default DashboardPage