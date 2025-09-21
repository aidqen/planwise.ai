import { formatRelativeTime } from "@/services/util.service"
import { RootState } from "@/types/user.types"
import { IconMessageCircle } from "@tabler/icons-react"
import { ChevronRight } from "lucide-react"
import { useSelector } from "react-redux"
import { useMemo, useState } from "react"
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation"

export function RecentChats({ showRecentChats }: { showRecentChats: boolean }) {
    const router = useRouter()

    const user = useSelector((state: RootState) => state.userModule.user)
    const sortedUserSchedules = useMemo(() => {
        if (!user?.schedules) return []
        return [...user.schedules].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    }, [user?.schedules])
    const isHidden = useMemo(() => !user?.schedules?.length || !showRecentChats, [showRecentChats, user?.schedules?.length])
    console.log("🚀 ~ RecentChats ~ user:", user)

    // if (!user?.schedules?.length) return

    return (
        <div className="w-full flex flex-col items-start mt-10 gap-4 h-[150px]">
            {!isHidden && (
                <>
                    <div className="flex flex-row items-center justify-start gap-1">
                        <motion.h3
                            initial={{ y: '50%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: 'spring', bounce: 0, damping: 15, mass: 1, stiffness: 100, delay: 0.5, duration: '100ms' }}
                            className="recent-chats-header flex flex-row items-center gap-0.5 text-sm font-semibold text-black dark:text-white">
                            <IconMessageCircle className="w-5 h-5 text-stone-500 dark:text-stone-300" />
                            Your Recent Chats
                            <ChevronRight className="chevron size-4 mt-[1px] text-stone-500 dark:text-stone-300" />
                        </motion.h3>
                    </div>
                    <div
                        className="grid grid-cols-3 w-full items-center justify-start gap-4">
                        {sortedUserSchedules.slice(0, 3).map((schedule, index) => (
                            <motion.div
                                onClick={() => router.push(`/schedule/ai?id=${schedule.id}`)}
                                initial={{ y: '30%', opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 100, damping: 15, mass: 1, delay: 0.4 + 0.1 * -index, duration: '150ms' }}
                                key={index}
                                className="flex flex-col gap-3 bg-stone-50 dark:bg-[#222124] dark:hover:bg-[#292929] hover:bg-stone-100 transition-colors p-3 border dark:border-stone-700/60 border-stone-300 rounded-2xl cursor-pointer">
                                <IconMessageCircle style={{ transform: 'rotateY(180deg)' }} className="w-5 h-5 text-stone-600 dark:text-stone-300" />
                                <h4 className="text-sm text-black dark:text-white font-semibold">{schedule.name}</h4>
                                <span className="text-[13px] text-stone-500 dark:text-stone-300">{formatRelativeTime(schedule.updatedAt)}</span>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}