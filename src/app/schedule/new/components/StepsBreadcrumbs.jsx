import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

export function StepsBreadcrumbs({ steps, currentStep }) {
    return (
      <nav aria-label="Progress" className="hidden mx-auto w-full max-w-3xl md:block">
        <ol role="list" className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {steps.map((step, index) => (
            <li
              key={step.name}
              className={cn(
                "flex items-center",
                index !== steps.length - 1 && "flex-1 sm:justify-center"
              )}
            >
              <div className="flex items-center">
                <span
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
                    step.id < currentStep && "bg-primary text-primary-foreground",
                    step.id === currentStep && "bg-primary text-primary-foreground ring-primary dark:ring-offset-gray-900",
                    step.id > currentStep && "bg-muted dark:bg-gray-800 text-muted-foreground dark:text-gray-400"
                  )}
                >
                  {step.id < currentStep ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <step.logo className="w-6 h-6 text-white dark:text-gray-200"/>
                  )}
                </span>
                <span
                  className={cn(
                    "ml-1.5 text-sm font-medium",
                    step.id < currentStep && "text-primary dark:text-primary/90",
                    step.id === currentStep && "text-primary dark:text-primary/90 font-semibold",
                    step.id > currentStep && "text-muted-foreground dark:text-gray-400"
                  )}
                >
                  {step.name}
                </span>
              </div>
              {/* {index !== steps.length - 1 && (
                <ChevronRight
                  className={cn(
                    "w-5 h-5 ml-2 hidden sm:block",
                    index < currentStep - 1 ? "text-primary dark:text-primary/90" : "text-muted-foreground dark:text-gray-600"
                  )}
                />
              )} */}
            </li>
          ))}
        </ol>
        <div className="mt-4 rounded-full sm:mt-8 bg-muted dark:bg-gray-800">
          <div
            className="h-2 rounded-full transition-all duration-500 ease-in-out bg-primary"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            role="progressbar"
            aria-valuenow={((currentStep - 1) / (steps.length - 1)) * 100}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </nav>
    )
  }