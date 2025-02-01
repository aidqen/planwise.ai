import { TooltipContent, TooltipTrigger, Tooltip } from "./ui/tooltip";

export function TooltipTool({children, content, side="right"}) {

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} className="bg-white border dark:border-gray-600 dark:bg-gray-800">
                {content}
            </TooltipContent>
        </Tooltip>
    )
}