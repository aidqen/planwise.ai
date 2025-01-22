import { TooltipContent, TooltipTrigger, Tooltip } from "./ui/tooltip";

export function TooltipTool({children, content}) {

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-white border dark:border-gray-600 dark:bg-gray-800">
                {content}
            </TooltipContent>
        </Tooltip>
    )
}