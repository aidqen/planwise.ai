'use client'
import { TOGGLE_SIDEBAR } from "@/store/reducers/system.reducer";
import { PanelRight } from "lucide-react";
import { useDispatch } from "react-redux";

export function ToggleSidebarBtn() {
    const dispatch = useDispatch()
    // const open = useSelector(state => state.systemModule.isSidebarOpen)
    const toggleSidebar = () => dispatch({ type: TOGGLE_SIDEBAR })

    return <PanelRight className="ms-1.5 z-10 col-start-2 max-sm:hidden row-start-1 p-1.5 mb-5 w-9 h-9 rounded-[15px] hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer text-black/90 dark:text-white" onClick={toggleSidebar}/>
}