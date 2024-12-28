export function HomepageCard() {
     
    return (
        <div className='flex flex-row justify-between items-center mb-14 w-full'>
        <div className='flex flex-col justify-center items-start'>
          <h4 className="text-lg font-semibold text-black/80">34 Goals</h4>
          <p className="text-[#B6BBC3] text-xs">Ambitious person, aren&apos;t you?</p>
        </div>
        <button className="py-2 px-3 bg-green-400 text-white text-sm rounded-[20px]">Add Goals</button>
      </div>
    )
}