"use client";
import React, { useState } from "react";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_SIDEBAR } from "@/store/reducers/system.reducer";

export function SidebarDemo() {
    const dispatch = useDispatch()
    // const [open, setOpen] = useState(false);
    const open = useSelector(state => state.systemModule.isSidebarOpen)
    const links = [
        {
            label: "Dashboard",
            href: "#",
            icon: (
                <IconBrandTabler className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Profile",
            href: "#",
            icon: (
                <IconUserBolt className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Settings",
            href: "#",
            icon: (
                <IconSettings className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Logout",
            href: "#",
            icon: (
                <IconArrowLeft className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ];

    function toggleSidebar() {
        return {type: TOGGLE_SIDEBAR}
    }
    return (
        (<div
            className={cn(
                "overflow-hidden flex-1 max-w-max h-screen bg-white rounded-md border max-sm:fixed z-[10] dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700",
                open ? 'max-sm:block' : 'max-sm:hidden' 
            )}>
            <Sidebar open={open} setOpen={() => dispatch(toggleSidebar())}>
                <SidebarBody className="gap-10 justify-between">
                    <div className="flex overflow-y-auto overflow-x-hidden flex-col flex-1">
                        {/* {open ? <Logo /> : <LogoIcon />} */}
                        <div className="flex flex-col gap-2 mt-8">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#",
                                // icon: (
                                //   <Image
                                //     src="https://assets.aceternity.com/manu.png"
                                //     className="flex-shrink-0 w-7 h-7 rounded-full"
                                //     width={50}
                                //     height={50}
                                //     alt="Avatar" />
                                // ),
                            }} />
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>)
    );
}
export const Logo = () => {
    return (
        (<Link
            href="#"
            className="flex relative z-20 items-center py-1 space-x-2 text-sm font-normal text-black">
            <div
                className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm dark:bg-white" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black whitespace-pre dark:text-white">
                Acet Labs
            </motion.span>
        </Link>)
    );
};
export const LogoIcon = () => {
    return (
        (<Link
            href="#"
            className="flex relative z-20 items-center py-1 space-x-2 text-sm font-normal text-black">
            <div
                className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm dark:bg-white" />
        </Link>)
    );
};

