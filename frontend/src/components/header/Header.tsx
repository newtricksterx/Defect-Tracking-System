"use client"
import { HeaderList } from "./HeaderList";
import { NavBarItems } from "@/lib/types";


const navbarItems: NavBarItems = {
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
        { title: 'Teams', links: [
            {label: 'View all teams', href: '/'}
        ]},          
    ]
}

export function Header(){
    return (
        <HeaderList navbarItems={navbarItems}/>
    );
}