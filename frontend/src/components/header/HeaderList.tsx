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
  
interface NavBarItemProps {
    navbarItems: NavBarItems
}

export function HeaderList(props: NavBarItemProps){
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
                        <Link href="/create-project">
                            <DropdownMenuItem>Create Project</DropdownMenuItem>
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

/*
                    {props.navbarItems.item.map((link, index) => (
                        <NavigationMenuItem key={index}>
                            <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
                            {link.links.map((links, index) => (
                                <NavigationMenuContent key={index}>
                                    <NavigationMenuLink>{links.label}</NavigationMenuLink>
                                </NavigationMenuContent>
                            ))}
                        </NavigationMenuItem>
                    ))}
*/