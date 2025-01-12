import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

export function StepsBreadcrumbs({ steps, currentStep }) {
    return (
      <nav aria-label="Progress" className="hidden mx-auto w-full max-w-3xl md:block">
        <ol role="list" className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {steps.map((step, index) => (
            <li
              key={step.name}
              className={cn(
                "flex items-center",
                index !== steps.length - 1 && "flex-1"
              )}
            >
              <div className="flex flex-1 items-center">
                <span
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
                    step.id < currentStep && "bg-primary text-primary-foreground ",
                    step.id === currentStep && "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary",
                    step.id > currentStep && "bg-muted text-muted-foreground"
                  )}
                >
                  {step.id < currentStep ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <step.logo className="w-6 h-6 text-white"/>
                  )}
                </span>
                <span
                  className={cn(
                    "ml-3 text-sm font-medium",
                    step.id < currentStep && "text-primary",
                    step.id === currentStep && "text-primary font-semibold",
                    step.id > currentStep && "text-muted-foreground"
                  )}
                >
                  {step.name}
                </span>
              </div>
              {/* {index !== steps.length - 1 && (
                <ChevronRight
                  className={cn(
                    "w-5 h-5 ml-2 hidden sm:block",
                    index < currentStep - 1 ? "text-primary" : "text-muted-foreground"
                  )}
                />
              )} */}
            </li>
          ))}
        </ol>
        <div className="mt-4 rounded-full sm:mt-8 bg-muted">
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
  