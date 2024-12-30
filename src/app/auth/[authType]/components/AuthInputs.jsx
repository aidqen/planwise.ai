'use client'
import { useParams } from "next/navigation"

export function AuthInputs() {
    const params = useParams()
  return (
    <>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="relative px-8 py-4 mb-4 w-full rounded-full border shadow-md border-black/20 max-sm:py-3"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="relative px-8 py-4 w-full rounded-full border shadow-md border-black/20 max-sm:py-3"
      />
      <div className="flex flex-row justify-between items-center mt-7 mb-12 w-full">
        <div className="flex flex-row gap-2 items-center">
          <input type="checkbox" name="remember" id="remember" className="" />
          <label
            htmlFor="remember"
            className="text-black/80 font-semibold text-xxs max-sm:text-[0.7em] whitespace-nowrap"
          >
            Remember for 30 days
          </label>
        </div>
        <p className="text-black/50 font-semibold text-xs max-sm:text-[0.7em] whitespace-nowrap">
          Forgot password?
        </p>
      </div>
      <button className="py-4 mb-5 w-full text-sm font-bold text-white bg-green-500 rounded-full shadow-md transition-colors hover:bg-green-600">
        Log in
      </button>
      <p className="text-xs text-black/50">
        Don&apos;t have an account?{' '}
        <span className="font-semibold text-black">Sign Up</span>
      </p>
    </>
  )
}
