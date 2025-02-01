'use client'

export function PageHeader() {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white max-sm:text-2xl">
                    Your Schedules
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    View your previous schedules
                </p>
            </div>
        </div>
    );
}
