'use client'
import { TOGGLE_SIDEBAR } from "@/store/reducers/system.reducer";
import { PanelRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { TooltipTool } from "./TooltipTool";

export function ToggleSidebarBtn() {
    const dispatch = useDispatch()
    // const open = useSelector(state => state.systemModule.isSidebarOpen)
    const toggleSidebar = () => dispatch({ type: TOGGLE_SIDEBAR })

    return <TooltipTool content="Toggle Sidebar">
        <PanelRight className="ms-3" onClick={toggleSidebar} />
    </TooltipTool>
}