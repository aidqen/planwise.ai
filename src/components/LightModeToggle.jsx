"use client"

import * as React from "react"
import { Moon, MoonIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LightModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="!w-9 !h-9 !p-1 bg-transparent border-none dark:text-white/80 ms-1.5 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <Sun className="!w-6 !h-6 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
          <Moon className="!w-6 !h-6 absolute transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900 dark:bg-white">
        {['light', 'dark', 'system'].map((theme) => (
          <DropdownMenuItem
            key={theme}
            onClick={() => setTheme(theme)}
            className="text-white cursor-pointer dark:text-gray-900 dark:hover:bg-gray-100 hover:bg-gray-800"
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
