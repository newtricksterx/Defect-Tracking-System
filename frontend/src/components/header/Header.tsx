"use client"
import { HeaderList } from "./HeaderList";
import { INavBarItems } from "@/lib/types";


const navbarItems: INavBarItems = {
    item : [
        { title: 'Your work', links: [
            {label: 'Go to your work', href: '/'}
        ]},    
        { title: 'Projects', links: [
            {label: 'View all projects', href: '/projects'}
        ]},
        { title: 'Issues', links: [
            {label: 'View all issues', href: '/issues'}
        ]},     
        { title: 'Groups', links: [
            {label: 'View all groups', href: '/groups'}
        ]},          
    ]
}

export function Header(){
    return (
        <HeaderList navbarItems={navbarItems}/>
    );
}