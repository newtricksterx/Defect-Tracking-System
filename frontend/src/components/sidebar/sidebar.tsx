'use client'

import { Home, Mail, List, LayoutDashboard, Settings } from "lucide-react"
import { SideBarDesktop } from "./sidebar-desktop"
import { ISidebarItems } from "@/lib/types";


const sidebarItems: ISidebarItems = {
    links : [
        { label: 'Home', href: '/', icon: Home}, 
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard}, 
        { label: 'Issue List', href: '/issues', icon: List},
        { label: 'Settings', href: '/settings', icon: Settings}, 
         
    ]
}

export function SideBar(){
    return (
        <SideBarDesktop sidebarItems={sidebarItems}/>
    );
}