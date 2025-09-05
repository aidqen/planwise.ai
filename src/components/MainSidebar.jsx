"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_SIDEBAR, TOGGLE_SIDEBAR } from "@/store/reducers/system.reducer";
import { CalendarDays, CirclePlus, Ellipsis, LogOut, LogOutIcon, Mail, Repeat2 } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ToggleSidebarBtn } from "./ToggleSidebarBtn";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LightModeToggle } from "./LightModeToggle";
import { TooltipTool } from "./TooltipTool";

export function SidebarDemo() {
    const dispatch = useDispatch()
    const router = useRouter()
    const open = useSelector(state => state.systemModule.isSidebarOpen)
    const user = useSelector(state => state.userModule.user)
    const pathname = usePathname()
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        if (pathname.includes('auth')) {
            setIsVisible(false)
        } else {
            setIsVisible(true)
        }
    }, [pathname, isVisible])
    // const [open, setOpen] = useState(false);
    const links = [
        {
            label: "Preferences",
            href: "/preferences",
            icon: (
                <Repeat2 className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Create New Schedule",
            href: "/schedule/new",
            icon: (
                <CirclePlus className="flex-shrink-0 w-6 h-6 text-gray-700 dark:text-gray-200" />
            ),
        },
        {
            label: "Schedules",
            href: "/schedule/all",
            icon: (
                <CalendarDays className="flex-shrink-0 w-6 h-6 text-gray-700 dark:text-gray-200" />
            ),
        },
        {
            label: "Coming Soon",
            href: "#",
            icon: (
                <Ellipsis className="flex-shrink-0 w-6 h-6 text-gray-700 dark:text-gray-200" />
            ),
        },
        {
            label: "Contact Us",
            href: "#",
            icon: (
                <Mail className="flex-shrink-0 w-6 h-6 text-gray-700 dark:text-gray-200" />
            ),
        },
    ];

    function navigateHome() {
        router.replace('/home')
    }

    function toggleSidebar() {
        dispatch({ type: TOGGLE_SIDEBAR })
    }

    function closeSidebar() {
        dispatch({ type: CLOSE_SIDEBAR })
    }

    function onLogout() {
        signOut({ callbackUrl: '/auth' })
    }

    return (
        (<div
            className={cn(
                "overflow-hidden flex-1 pt-16 max-w-max h-screen bg-[#f3f4f6] dark:bg-gray-900 text-gray-900 dark:text-gray-100 border max-sm:fixed z-[20] border-neutral-200 dark:border-gray-800 border-l-0 border-y-0 border-r",
                open ? 'max-sm:max-w-full' : 'max-sm:max-w-0',
                isVisible ? 'flex' : 'hidden'
            )}>
            <Sidebar open={open} setOpen={toggleSidebar}>
                <SidebarBody className="flex flex-col gap-10 justify-between px-3 pt-0 h-full">
                    <div className="flex overflow-y-auto overflow-x-hidden flex-col items-start">
                        <TooltipTool content="Home">
                            <div className={cn("flex flex-row gap-3 items-center mt-0 cursor-pointer")} onClick={navigateHome}>
                                <Image src="https://res.cloudinary.com/di6tqrg5y/image/upload/v1733918185/icon_1_ylom72.png" width={50} height={50} alt="Logo" />
                                {open && <span className={cn("min-w-max text-2xl font-medium text-gray-900 capitalize whitespace-nowrap dark:text-white", open ? 'flex' : 'hidden')}>Planwise AI</span>}
                            </div>
                        </TooltipTool>
                        <div className={cn("flex flex-col gap-2 items-start mt-8 transition-all", open ? 'w-full' : 'w-11')}>
                            {links.map((link, idx) => (
                                <TooltipTool key={idx} content={link.label}>
                                    <SidebarLink link={link} onClick={closeSidebar} className="flex justify-start w-full max-h-10 rounded-[10px] min-h-10 hover:bg-gray-200 dark:hover:bg-gray-800" />
                                </TooltipTool>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <TooltipTool content="Toggle Sidebar">
                            <ToggleSidebarBtn />
                        </TooltipTool>
                        <TooltipTool content="Toggle Light Mode">
                            <LightModeToggle />
                        </TooltipTool>
                        {user && (
                            <>
                                <TooltipTool content="Logout" side="top">
                                    <LogOutIcon onClick={onLogout} className="ms-3.5" />
                                </TooltipTool>
                            </>
                        )}
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>)
    );
}

