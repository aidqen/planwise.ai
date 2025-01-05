'use client'
import { TOGGLE_SIDEBAR } from "@/store/reducers/system.reducer";
import { PanelRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export function ToggleSidebarBtn() {
    const dispatch = useDispatch()
    const open = useSelector(state => state.systemModule.isSidebarOpen)
    const toggleSidebar = () => dispatch({ type: TOGGLE_SIDEBAR })

    return <PanelRight className="z-10 col-start-2 max-sm:hidden row-start-1 p-2 mb-5 w-10 h-10 rounded-[15px] hover:bg-gray-200 transition-all duration-200 cursor-pointer text-black/50" onClick={toggleSidebar}/>
}