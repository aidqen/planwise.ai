export function PreferenceSection({ title, icon, description, children }) {
    return (
        <div className="p-4 bg-white rounded-lg border max-h-max">
            <div className="mb-3">
                <div className="flex items-center gap-2 mb-0.5">
                    {icon}
                    <h2 className="text-base font-semibold text-black/80">{title}</h2>
                </div>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
            <div className=" overflow-y-auto pr-1">
                {children}
            </div>
        </div>
    )
}