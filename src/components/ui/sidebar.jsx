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

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    (<SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>)
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
  return (<>
    <DesktopSidebar {...props} />
    <MobileSidebar {...(props)} />
  </>);
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen, animate } = useSidebar();
  return (<>
    <motion.div
      className={cn(
        "hidden flex-shrink-0 px-4 py-4 h-full md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px]",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      // onMouseEnter={() => setOpen(true)}
      // onMouseLeave={() => setOpen(false)}
      {...props}>
      {children}
    </motion.div>
  </>);
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen } = useSidebar();
  return (<>
    <div
      className={cn(
        "flex flex-row justify-between items-center px-4 py-4 w-full h-10 md:hidden bg-neutral-100 dark:bg-neutral-800",
        // open ? 'opacity-100' : 'opacity-0' 
      )}
      {...props}>
      {/* <div className="flex z-20 justify-end w-full">
        <IconMenu2
          className="text-neutral-800 dark:text-neutral-200"
          onClick={() => setOpen(!open)} />
      </div> */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "flex fixed inset-0 flex-col justify-between p-10 w-full h-full bg-white dark:bg-neutral-900 z-[100]",
              className
            )}>
            <div
              className="absolute top-10 right-10 z-50 text-neutral-800 dark:text-neutral-200"
              onClick={() => setOpen(!open)}>
              <IconX />
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </>);
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
      className={cn("flex gap-2 justify-start items-center hover:bg-green-100 group/sidebar p-3 transition-colors duration-150", isActive && 'bg-green-300 hover:bg-green-400 text-black', className)}
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
