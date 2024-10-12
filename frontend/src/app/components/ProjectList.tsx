'use client'

import { useFetchQuerySet } from "../CustomHooks/useFetchQuerySet";


interface Project {
    id: number;
    title: string;
    description: string;
}

export default function ProjectListComponent(){

    const data = useFetchQuerySet<Project>('api/project/');
    
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