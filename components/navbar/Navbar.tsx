'use client';
import React from "react";
import { ListItemTypes } from "@/types";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";

const listItems: ListItemTypes[] = [
    {
        title: "Categories",
        href: "/admin/category",
    },
    {
        title: "Meals",
        href: "/admin/meal",
    },
];

export default function Navbar() {
    const { data: session, status } = useSession()

    if(!session){
        return;
    }

    return (
        <NavigationMenu className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b px-5 py-3">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <Icons.logo className="w-6 h-6 mr-2" />
                            <span className="text-lg font-bold">DR</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                {session.user.role === "admin" && React.Children.toArray(listItems.map((listItem) => (
                    <NavigationMenuItem>
                        <Link href={listItem.href} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {listItem.title}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                )))}
            </NavigationMenuList>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                        Welcome <span className="text-red-500 font-bold">{session.user.name}</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Button variant="link" className="pl-0 hover:no-underline" onClick={() => signOut()}>
                                    <Icons.signOut className="text-slate-500 hover:text-slate-700 mr-2 h-4 w-4" />
                                    <span>Sign out</span>
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
