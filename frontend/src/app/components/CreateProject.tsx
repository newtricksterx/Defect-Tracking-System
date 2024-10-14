'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { usePostData } from "../CustomHooks/usePostData";

axios.defaults.xsrfCookieName = 'csrfToken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});

function CreateProject(){
    const router = useRouter();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const project = {
        title: title,
        description: description
    }

    const { makeRequest, success } = usePostData('api/project/', project);


    async function handleCreate(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        makeRequest();
        if(success){
            console.log("Project Creation Successful.");
        }
    }


    return (
        <div>
            <form className="flex flex-col justify-center items-center h-max gap-2" onSubmit={handleCreate}>
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
                <button className='border border-black p-1 hover:bg-slate-200' type="submit">Create</button>
                <button className='border border-black p-1 hover:bg-slate-200' type="reset">Reset</button>
            </form>
        </div>
    );
};
  
export default CreateProject;