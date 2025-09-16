export function ProgressBar({ progress }: { progress: number }) {
console.log("🚀 ~ ProgressBar ~ progress:", progress)

    return (
        <div className="relative z-[200]">
            <div className="h-2 w-full rounded-full bg-blue-100 dark:bg-blue-900/40 overflow-hidden">
                <div
                    className={
                        `h-full rounded-full transition-[width,background-color] duration-300 ease-out ` +
                        (progress >= 100 ? 'bg-green-500 dark:bg-green-600' : 'bg-blue-400 dark:bg-blue-600')
                    }
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}