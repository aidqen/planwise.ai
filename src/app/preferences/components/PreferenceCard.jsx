export function PreferenceCard({ children, className = "" }) {
    return (
        <div className={`group bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 backdrop-blur-xl transition-all duration-200 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600/50 ${className}`}>
            <div className="p-4 sm:p-5 lg:p-6">
                {children}
            </div>
        </div>
    )
}

export function CardHeader({ icon, title, action }) {
    return (
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
            <div className="flex items-center gap-2 sm:gap-3">
                {icon}
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
            </div>
            {action}
        </div>
    )
}

export function IconWrapper({ children, color }) {
    const colorMap = {
        blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40",
        green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-900/40",
        purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40"
    }

    return (
        <div className={`p-1.5 sm:p-2 rounded-lg transition-colors duration-200 ${colorMap[color] || colorMap.blue}`}>
            {children}
        </div>
    )
}
