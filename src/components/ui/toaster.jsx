"use client"

import { useToast } from "@/components/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react"

// Mapping toast variants to icons and styles
const toastVariants = {
  default: {
    icon: Info,
    bgClass: "bg-blue-100 dark:bg-blue-900/80",
    textClass: "text-blue-800 dark:text-blue-200",
    borderClass: "border-blue-300 dark:border-blue-700"
  },
  success: {
    icon: CheckCircle2,
    bgClass: "bg-green-100 dark:bg-green-900/80",
    textClass: "text-green-800 dark:text-green-200",
    borderClass: "border-green-300 dark:border-green-700"
  },
  destructive: {
    icon: XCircle,
    bgClass: "bg-red-100 dark:bg-red-900/80",
    textClass: "text-red-800 dark:text-red-200",
    borderClass: "border-red-300 dark:border-red-700"
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-yellow-100 dark:bg-yellow-900/80",
    textClass: "text-yellow-800 dark:text-yellow-200",
    borderClass: "border-yellow-300 dark:border-yellow-700"
  }
}

export function Toaster() {
  const { toasts, dismiss } = useToast()

  useEffect(() => {
    const timers = toasts.map(toast => 
      setTimeout(() => {
        dismiss(toast.id)
      }, 2500)
    )

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [toasts, dismiss])

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, variant = 'default', ...props }) {
        const variantStyles = toastVariants[variant] || toastVariants.default
        const ToastIcon = variantStyles.icon

        return (
          <Toast 
            key={id} 
            {...props}
            className={cn(
              "group p-2 h-auto min-h-[50px] max-h-[60px] flex items-center space-x-2 rounded-md border shadow-sm",
              variantStyles.bgClass,
              variantStyles.borderClass,
              "transition-all duration-300 ease-in-out opacity-100"
            )}
          >
            <div className="flex items-center space-x-2">
              <ToastIcon 
                className={cn(
                  "w-5 h-5 flex-shrink-0", 
                  variantStyles.textClass
                )} 
              />
              <div className="grid gap-1">
                {title && <ToastTitle className="text-sm font-medium opacity-100">{title}</ToastTitle>}
                {description && (
                  <ToastDescription className="text-sm opacity-100">{description}</ToastDescription>
                )}
              </div>
            </div>
            <ToastClose 
              className="ml-auto hover:opacity-100 transition-opacity opacity-100" 
            />
          </Toast>
        );
      })}
      <ToastViewport className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 p-4" />
    </ToastProvider>
  );
}
