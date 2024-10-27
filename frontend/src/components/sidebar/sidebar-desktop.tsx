'use client'

import { Home, LogOut, MoreHorizontal, Settings } from "lucide-react";
import { SideBarButton } from "./sidebar-button";
import { SidebarItems } from "@/lib/types";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { Span } from "next/dist/trace";


interface SideBarDesktopProps {
    sidebarItems: SidebarItems;
}

export function SideBarDesktop(props : SideBarDesktopProps){
    const { user, handleLogout} = useContext(AuthContext);

    return (
        <aside className='w-[215px] max-w-xs fixed left-0 z-40 border-r h-[90%]'>
            <div className="px-3 py-4 h-full">
                <div className="mt-5">
                    <div className="flex flex-col gap-1 w-full">
                        {props.sidebarItems.links.map((link, index) => (
                            <Link key={index} href={link.href}>
                                <SideBarButton  icon={link.icon} className="w-full">
                                    {link.label}
                                </SideBarButton>
                            </Link>
                        ))}
                    </div>
                    <div className="absolute left-0 bottom-3 w-full px-3">
                        <Separator className="absolute -top-3 left-0 w-full"/>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant='ghost' className="w-full justify-start">
                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex gap-2">
                                            <Avatar className="h-5 w-5">
                                                <AvatarImage src=""/>
                                                <AvatarFallback>
                                                    Logo
                                                </AvatarFallback>
                                            </Avatar>
                                            <span>{user ? <span>{user.username}</span> : "Name"}</span>
                                        </div>
                                        <MoreHorizontal size={20}/>                               
                                    </div>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="mb-2 w-[215px] p-3 rounded-[1rem]">
                                <div className='space-y-1'>
                                    <Link href='/'>
                                        <SideBarButton size='sm' icon={Settings} className="w-full">
                                            Account Settings
                                        </SideBarButton>
                                    </Link>
                                    <SideBarButton onClick={handleLogout} size='sm' icon={LogOut} className="w-full">
                                            Logout
                                    </SideBarButton>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </aside>
    );
}