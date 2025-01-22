'use client'
import { LoginForm } from "@/components/ui/login-form"
import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image"


export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
      <LoginForm />
    </div>
  </div>
    // <div className="grid absolute top-0 left-0 w-screen h-screen md:grid-cols-2 min-h-svh">
    //   <div className="flex flex-col col-start-1 gap-4 p-6 md:p-10">
    //     <div className="flex gap-2 justify-start md:justify-start">
    //       <a href="#" className="flex gap-2 items-center font-medium">
    //         <div className="flex justify-center items-center w-6 h-6 rounded-md bg-primary text-primary-foreground">
    //          <Image  src="https://res.cloudinary.com/di6tqrg5y/image/upload/v1733917011/icon_hs6b1t.png" alt="view" width={30} height={30} />
    //         </div>
    //          Planwise AI
    //       </a>
    //     </div>
        
    //     <div className="flex flex-1 justify-center items-center">
    //       <div className="w-full max-w-xs">
    //         <LoginForm />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="hidden relative col-start-2 bg-muted lg:block">
    //     <Image
    //       src="https://res.cloudinary.com/di6tqrg5y/image/upload/v1733784472/ai-generated-8814121_1280_nbzs68.webp"
    //       alt="Background Image"
    //       fill
    //       priority
    //       className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
    //     />
    //   </div>
    // </div>
  )
}

