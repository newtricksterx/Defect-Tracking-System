'use client'

import { Home, Mail, List, LayoutDashboard, Settings } from "lucide-react"
import { SideBarDesktop } from "./sidebar-desktop"
import { SidebarItems } from "@/lib/types";


const sidebarItems: SidebarItems = {
    links : [
        { label: 'Home', href: '/', icon: Home}, 
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard}, 
        { label: 'Issue List', href: '/issue-list', icon: List},
        { label: 'Settings', href: '/settings', icon: Settings}, 
         
    ]
}

export function SideBar(){
    return (
        <SideBarDesktop sidebarItems={sidebarItems}/>
    );
}