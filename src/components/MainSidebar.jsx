"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_SIDEBAR, TOGGLE_SIDEBAR } from "@/store/reducers/system.reducer";
import { CalendarDays, CirclePlus, Ellipsis, Mail, Repeat2 } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ToggleSidebarBtn } from "./ToggleSidebarBtn";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
        // {
        //     label: "Preferences",
        //     href: "/preferences",
        //     icon: (
        //         <Repeat2 className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
        //     ),
        // },
        {
            label: "Create New Schedule",
            href: "/schedule/new",
            icon: (
                <CirclePlus className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Schedules",
            href: "/schedule/all",
            icon: (
                <CalendarDays className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Coming Soon",
            href: "#",
            icon: (
                <Ellipsis className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Contact Us",
            href: "#",
            icon: (
                <Mail className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ];

    function navigateHome() {
        router.replace('/')
    }

    function toggleSidebar() {
        dispatch({ type: TOGGLE_SIDEBAR })
    }

    // function closeSidebar() {
    //     return { type: CLOSE_SIDEBAR }
    // }
    return (
        (<div
            className={cn(
                "overflow-hidden flex-1 pt-16 max-w-max h-screen bg-[#f3f4f6] text-black rounded-md border max-sm:fixed z-[10] dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700",
                open ? 'max-sm:max-w-full' : 'max-sm:max-w-0',
                isVisible ? 'flex' : 'hidden'
            )}>
            <Sidebar open={open} setOpen={toggleSidebar}>
                <SidebarBody className="flex flex-col gap-10 justify-between px-3 pt-0">
                    <div className="flex overflow-y-auto overflow-x-hidden flex-col items-start">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className={cn("flex flex-row gap-3 items-center mt-0 cursor-pointer")} onClick={navigateHome}>
                                    <Image src="https://res.cloudinary.com/di6tqrg5y/image/upload/v1733918185/icon_1_ylom72.png" width={50} height={50} alt="Logo" />
                                    {open && <span className={cn("min-w-max text-2xl font-medium capitalize whitespace-nowrap", open ? 'flex' : 'hidden')}>Planwise AI</span>}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Home</p>
                            </TooltipContent>
                        </Tooltip>
                        <div className={cn("flex flex-col gap-2 items-start mt-8 transition-all", open ? 'w-full' : 'w-11')}>
                            {links.map((link, idx) => (
                                <Tooltip key={idx}>
                                    <TooltipTrigger asChild>
                                        <div className="w-full">
                                            <SidebarLink link={link} className="flex justify-start w-full max-h-10 rounded-[10px] min-h-10" />
                                        </div>
                                    </TooltipTrigger>
                                    {!open && (
                                        <TooltipContent side="right">
                                            <p>{link.label}</p>
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                            ))}
                        </div>
                    </div>
                    <div>
                        <ToggleSidebarBtn />
                        {user && (
                            <SidebarLink
                                className="capitalize"
                                link={{
                                    label: user?.name,
                                    href: "#",
                                    icon: (
                                        <Image
                                            src={user?.image || ""}
                                            className="flex-shrink-0 w-7 h-7 rounded-full"
                                            width={50}
                                            height={50}
                                            alt="Avatar"
                                        />
                                    ),
                                }}
                            />
                        )}
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>)
    );
}
// export const Logo = () => {
//     return (
//         (<Link
//             href="#"
//             className="flex relative z-20 items-center py-1 space-x-2 text-sm font-normal text-black">
//             <div
//                 className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm dark:bg-white" />
//             <motion.span
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="font-medium text-black whitespace-pre dark:text-white">
//                 Acet Labs
//             </motion.span>
//         </Link>)
//     );
// };
// export const LogoIcon = () => {
//     return (
//         (<Link
//             href="#"
//             className="flex relative z-20 items-center py-1 space-x-2 text-sm font-normal text-black">
//             <div
//                 className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm dark:bg-white" />
//         </Link>)
//     );
// };
