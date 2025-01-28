'use client'

export function IntensityBar({ label, value, total, color }) {
  return (
    <div className="flex flex-row gap-3 items-center xl:gap-10">
      <div className="flex flex-1 gap-2 items-center">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{value || 0}</span>
        <div className="w-24 h-2 bg-gray-100 rounded-full dark:bg-gray-700">
          <div 
            className={`h-full rounded-full ${color}`}
            style={{ 
              width: `${((value || 0) / (total || 1)) * 100}%`,
              transition: 'width 0.3s ease-in-out'
            }} 
          />
        </div>
      </div>
    </div>
  )
}
