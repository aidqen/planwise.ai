"use client";;
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true
}) => {
  const [openState, setOpenState] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate
}) => {
  return (
    (<SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>)
  );
};

export const SidebarBody = (props) => {
  const { isMobile } = useSidebar();
  return (<>
    {isMobile ? <MobileSidebar {...props} /> : <DesktopSidebar {...(props)} />}
  </>);
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "hidden flex-col flex-shrink-0 px-4 py-4 h-full md:flex bg-neutral-100 dark:bg-neutral-800 w-[300px]",
        className
      )}
      animate={{
        width: animate ? (open ? "250px" : "75px") : "300px",
      }}
      {...props}>
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen } = useSidebar();
  
  return (
    <div className="block md:hidden dark:bg-black/40" {...props}>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 dark:bg-gray-900 z-[75]"
              onClick={() => setOpen(false)}
            />
            
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              className={cn(
                "overflow-y-auto fixed top-0 bottom-0 left-0 w-full bg-white shadow-xl dark:bg-gray-900 z-[80]",
                className
              )}
            >
              <div className="flex sticky top-0 right-0 justify-end p-4 border-b border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <IconX
                  className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="flex flex-col justify-between px-4 pt-4 h-full bg-white dark:bg-gray-900">
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}) => {
  const { open, animate } = useSidebar();
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (pathname === link.href) setIsActive(true)
      else setIsActive(false)
  }, [pathname])


  return (
    (<Link
      href={link.href}
      className={cn("flex gap-2 justify-start items-center hover:bg-green-100 group/sidebar p-2.5 transition-colors duration-150", isActive && 'bg-green-400 dark:bg-gray-800 hover:bg-green-400', className)}
      {...props}>
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
        {link.label}
      </motion.span>
    </Link>)
  );
};
