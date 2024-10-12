'use client'
import { useFetchQuerySet } from "../CustomHooks/useFetchQuerySet";

interface Issue {
    id: number;
    title: string;
    description: string;
    priority: string;
}

export default function IssueListComponent(){
    const data = useFetchQuerySet<Issue>('api/epic/');

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