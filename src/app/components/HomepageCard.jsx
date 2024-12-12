export function HomepageCard() {
     
    return (
        <div className='flex flex-row items-center justify-between w-full xl:w-[30em] mb-14'>
        <div className='flex flex-col items-start justify-center'>
          <h4 className="font-semibold text-lg text-black/80">34 Goals</h4>
          <p className="text-[#B6BBC3] text-xs">Ambitious person, aren't you?</p>
        </div>
        <button className="py-2 px-3 bg-green-400 text-white text-sm rounded-[20px]">Add Goals</button>
      </div>
    )
}