"use client"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavBarItems } from "@/lib/types";
import { ModeToggle } from "@/components/ThemeModes/ButtonTheme"
import { SearchBar } from "../SearchBar";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
  
interface NavBarItemProps {
    navbarItems: NavBarItems
}

export function HeaderList(props: NavBarItemProps){
    const { user } = useContext(AuthContext)


    return (
        <div className='sticky border-b-2 p-4 top-0 flex gap-2 w-full'>
            <h3 className="mx-3 text-lg font-semibold text-foreground pt-[2px]">ATI</h3>

            {props.navbarItems.item.map((link, index) => (
                <DropdownMenu key={index}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">{link.title}</Button>
                    </DropdownMenuTrigger>
                    {link.links.map((links, index) => (
                        
                            <DropdownMenuContent className="w-56" key={index}>
                                <Link href={links.href}>
                                    <DropdownMenuItem>{links.label}</DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        
                    ))}
                </DropdownMenu>
            ))}

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button>Create</Button>
                </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <Link href="/create-issue">
                            <DropdownMenuItem>Create Issue</DropdownMenuItem>
                        </Link>
                        {
                            user.is_admin ?                         
                            <Link href="/create-project">
                                <DropdownMenuItem>Create Project</DropdownMenuItem>
                            </Link> 
                            : null
                        }
                        <Link href="/create-group">
                            <DropdownMenuItem>Create Group</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
            </DropdownMenu>

            <div className="absolute right-4 flex gap-2">
                <SearchBar />
                <ModeToggle />
            </div>
            
        </div>
    );
}