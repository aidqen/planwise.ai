import { GoogleSvg } from '@/svgs/GoogleSvg'

export default function AuthPage() {
  return (
    <div className="grid grid-cols-[57%_43%] p-[0.35em] h-screen w-screen bg-white">
      <div className="flex flex-col items-center justify-center col-start-1">
        <h1 className="font-bold text-black/80 text-6xl mb-20 text-center">Welcome back to <br/> Planwise AI 🍀</h1>
        <div className="flex flex-col w-[23rem] justify-center items-center">
          <p className="text-black text-[0.9em] font-semibold mb-8">
            Please enter your details.
          </p>
          <div className="flex flex-row items-center justify-center gap-3 rounded-full shadow-md w-full border-black/20 border py-4 ">
            <GoogleSvg className="w-6 h-6" />
            <span className="text-black">Log in with Google</span>
          </div>
          <div className="flex flex-row justify-between items-center gap-4 w-full my-7">
            <div className="bg-black/30 w-full h-[1px]"></div>
            <span className="text-black/30">or</span>
            <div className="bg-black/30 w-full h-[1px]"></div>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="relative rounded-full w-full border-black/20 shadow-md border py-4 px-8 mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="relative rounded-full w-full border-black/20 shadow-md border py-4 px-8"
          />
          <div className="mt-7 mb-12 flex flex-row items-center w-full justify-between">
            <div className="flex flex-row items-center gap-2">
                <input type="checkbox" name="remember" id='remember' className='' />
                <label htmlFor="remember" className='text-black/80 font-semibold text-xs'>Remember for 30 days</label>
            </div>
            <p className="text-black/50 font-semibold text-xs">Forgot password?</p>
          </div>
          <button className="bg-green-500 hover:bg-green-600 transition-colors w-full text-sm text-white font-bold py-4 rounded-full mb-5">Log in</button>
          <p className='text-black/50 text-sm'>Don't have an account? <span className='text-black font-semibold'>Sign Up</span></p>
        </div>
      </div>

      <div className="flex justify-center items-center w-full h-full">
        <img
          className="h-full w-full xl:h-[calc(100%-1rem)] xl:w-[calc(100%-1rem)] col-start-2 object-cover rounded-[50px]"
          src="https://res.cloudinary.com/di6tqrg5y/image/upload/v1733784472/ai-generated-8814121_1280_nbzs68.webp"
          alt="rice-fields-background"
        />
      </div>
    </div>
  )
}
