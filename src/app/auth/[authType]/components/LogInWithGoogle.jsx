'use client'
import { GoogleSvg } from "@/svgs/GoogleSvg";
import { signIn } from "next-auth/react";

export function LogInWithGoogle() {
    return (
        <div onClick={() => signIn("google", {callbackUrl: "/"})} className="flex flex-row items-center justify-center gap-3 rounded-full shadow-md w-full border-black/20 border max-sm:py-3 py-4 cursor-pointer hover:bg-white/50">
        <GoogleSvg className="w-6 h-6" />
        <span className="text-black">Log in with Google</span>
      </div>
    )
}