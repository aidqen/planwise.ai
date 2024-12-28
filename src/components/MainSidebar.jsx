"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_SIDEBAR } from "@/store/reducers/system.reducer";
import { CalendarDays, Ellipsis, Repeat2 } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function SidebarDemo() {
    const dispatch = useDispatch()
    const open = useSelector(state => state.systemModule.isSidebarOpen)
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
            href: "#",
            icon: (
                <Repeat2 className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Schedules",
            href: "#",
            icon: (
                <CalendarDays className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Coming Soon",
            href: "#",
            icon: (
                <Ellipsis  className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ];

    function toggleSidebar() {
        return { type: TOGGLE_SIDEBAR }
    }
    return (
        (<div
            className={cn(
                "overflow-hidden flex-1 max-w-max h-screen bg-white rounded-md border max-sm:fixed z-[10] dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700",
                open ? 'max-sm:block' : 'max-sm:hidden',
                isVisible ? 'opacity-100' : 'opacity-0'
            )}>
            <Sidebar open={open} setOpen={() => dispatch(toggleSidebar())}>
                <SidebarBody className="flex flex-col gap-10 justify-between p-2 pt-8">
                    <div className="flex overflow-y-auto overflow-x-hidden flex-col">
                        <div className="flex flex-row gap-3 items-center min-h-10">

                            <Image src="https://res.cloudinary.com/di6tqrg5y/image/upload/v1733918185/icon_1_ylom72.png" width={43} height={43} alt="Logo" />
                            <span className="min-w-max text-2xl font-medium capitalize">{open ? 'Planwise AI' : ''}</span>
                        </div>
                        <div className="flex flex-col gap-2 items-start p-3 mt-8 w-max">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} className={'max-h-8 min-h-8'} />
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

