'use client'
import { useParams } from "next/navigation"

export function AuthInputs() {
    const params = useParams()
    console.log('params:', params)
  return (
    <>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="relative rounded-full w-full border-black/20 shadow-md border max-sm:py-3 py-4 px-8 mb-4"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="relative rounded-full w-full border-black/20 shadow-md border max-sm:py-3 py-4 px-8"
      />
      <div className="mt-7 mb-12 flex flex-row items-center w-full justify-between">
        <div className="flex flex-row items-center gap-2">
          <input type="checkbox" name="remember" id="remember" className="" />
          <label
            htmlFor="remember"
            className="text-black/80 font-semibold text-xs max-sm:text-[0.7em]"
          >
            Remember for 30 days
          </label>
        </div>
        <p className="text-black/50 font-semibold text-xs max-sm:text-[0.7em]">
          Forgot password?
        </p>
      </div>
      <button className="bg-green-500 hover:bg-green-600 shadow-md transition-colors w-full text-sm text-white font-bold py-4 rounded-full mb-5">
        Log in
      </button>
      <p className="text-black/50 text-xs">
        Don't have an account?{' '}
        <span className="text-black font-semibold">Sign Up</span>
      </p>
    </>
  )
}
