'use client'

import { useState, FormEvent } from "react";
import { usePostData } from "../CustomHooks/usePostData";
import { useFetchQuerySet } from "../CustomHooks/useFetchQuerySet";

interface Project {
    id: number;
    title: string;
}

interface User {
    id: number;
    username: string;
}

function CreateIssue(){
    const [issueType, setIssueType] = useState<string>('EPIC');
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [assignedToID, setAssignedToID] = useState<number | undefined>(undefined);
    const [projectID, setProjectID] = useState<number | undefined>(undefined);
    const [priority, setPriority] = useState("LOW");
    const [status, setStatus] = useState("TO_DO");
    const [attachment, setAttachment] = useState<File | undefined>(undefined);

    const issue_url = new Map([
        ["EPIC", "api/epic/"],
        ["STORY", "api/story/"],
        ["TASK", "api/task/"],
        ["BUG", "api/bug/"],
    ]);

    const issue = {
        title: title,
        description: description,
        assignedToID: assignedToID,
        projectID: projectID,
        priority: priority,
        status: status,
        attachment: attachment
    }

    const { makeRequest, success } = usePostData(issue_url.get(issueType) ?? '', issue);
    const userData = useFetchQuerySet<User>('api/users/');
    const projectData = useFetchQuerySet<Project>('api/project/');

    async function handleCreate(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        makeRequest();
        if(success){
            console.log("Issue Creation Successful");
        }
        console.log(issue_url.get(issueType));
        console.log(title);
        console.log(description);
        console.log(assignedToID);
        console.log(projectID);
        console.log(priority);
        console.log(status);
        console.log(attachment);
    }

    return (
        <div>
            <form className="flex flex-col justify-center items-center h-max gap-2" onSubmit={handleCreate}>
                <select onChange={(e) => setIssueType(e.target.value)} name="" id="">
                    <option value="EPIC">Epic</option>
                    <option value="STORY">Story</option>
                    <option value="TASK">Task</option>
                    <option value="BUG">Bug</option>
                </select>
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    id="title" 
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-black"
                />
                <label htmlFor="description">Description</label>
                <input 
                    type="text" 
                    id="description" 
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-black"
                />
                <label>Assigned To:</label>
                <select 
                    defaultValue={assignedToID}
                    onChange={(e) => setAssignedToID(Number(e.target.value))} 
                    className="border border-black"
                >
                    <option value={undefined} hidden>Select User</option>
                    {
                        userData.map(user => (
                            <option 
                                key={user.id} 
                                value={user.id} 
                                className="border-r-2 border-gray-400 text-left pl-2"
                            >
                                {user.username}
                            </option>
                        ))
                    }
                </select>
                <label>Project:</label>
                <select 
                    defaultValue={projectID} 
                    onChange={(e) => setProjectID(Number(e.target.value))} 
                    className="border border-black"
                >
                    <option value={undefined} hidden>Select Project</option>
                    {
                        projectData.map(project => (
                            <option 
                                key={project.id} 
                                value={project.id} 
                                className="border-r-2 border-gray-400 text-left pl-2"
                            >
                                {project.title}
                            </option>
                        ))
                    }
                </select>
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-black">
                    <option value="TO_DO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>
                <label>Priority:</label>
                <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                    className="border border-black"
                >
                    <option value="LOW">Low</option>
                    <option value="NORMAL">Story</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                </select>
                <label htmlFor="attachment">Select a file:</label>
                <input 
                    type="file" 
                    id="attachment" 
                    name="attachment"
                    onChange={(e) => {
                        const files = e.target.files;
                        if(files){
                            setAttachment(files[0])
                        }
                    }}
                    className="border border-black"
                />
                <button className='border border-black p-1 hover:bg-slate-200' type="submit">Create</button>
                <button className='border border-black p-1 hover:bg-slate-200' type="reset">Reset</button>
            </form>
        </div>
    );
}

export default CreateIssue;