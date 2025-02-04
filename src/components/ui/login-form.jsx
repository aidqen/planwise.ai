import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { GoogleSvg } from "@/svgs/GoogleSvg"

export function LoginForm({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-2 items-center text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Login to your account</h1>
        <p className="text-sm text-gray-600 text-balance dark:text-gray-300">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            required 
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password" className="dark:text-gray-300">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input 
            id="password" 
            type="password" 
            required 
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Login
        </Button>
        <div className="relative text-sm text-center after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border dark:after:border-gray-700">
          <span className="relative z-10 px-2 bg-background text-muted-foreground dark:text-gray-400">
            Or continue with
          </span>
        </div>
        <Button 
          onClick={() => signIn("google", {callbackUrl: "/home"})} 
          variant="outline" 
          className="w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-white"
        >
          <GoogleSvg className="mr-2 w-6 h-6" />
          Login with Google
        </Button>
      </div>
      <div className="text-sm text-center text-gray-600 dark:text-gray-300">
        Don&apos;t have an account?{" "}
        <a href="#" className="text-blue-600 underline dark:text-blue-400 underline-offset-4">
          Sign up
        </a>
      </div>
    </div>
  )
}
