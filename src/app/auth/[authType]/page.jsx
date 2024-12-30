import { GoogleSvg } from '@/svgs/GoogleSvg'
import { AuthInputs } from './components/AuthInputs'
import { getUserSession } from '@/lib/session'
import { LogInWithGoogle } from './components/LogInWithGoogle'
import Image from 'next/image'

export default async function AuthPage() {

  return (
    <div className="fixed left-0 top-0 grid grid-cols-[57%_43%] max-sm:grid-cols-1 p-[0.75em] max-sm:p-[0.2em] h-screen w-screen bg-white">
      <div className="flex flex-col col-start-1 justify-center items-center">
        <h1 className="mb-12 text-5xl font-bold text-center text-black/80 max-sm:text-3xl max-sm:mb-10">
          Welcome back to <br /> Planwise AI 🍀
        </h1>
        <div className="flex flex-col w-[23rem] max-sm:w-[80%] justify-center items-center">
          <p className="text-black text-[0.9em] mb-8">
            Please enter your details.
          </p>
          <LogInWithGoogle />
          <div className="flex flex-row gap-4 justify-between items-center my-7 w-full">
            <div className="bg-black/30 w-full h-[1px]"></div>
            <span className="text-black/30">or</span>
            <div className="bg-black/30 w-full h-[1px]"></div>
          </div>
          <AuthInputs />
        </div>
      </div>

      <div className="flex relative justify-center items-center w-full h-full max-sm:hidden">
        <Image
          className="h-full w-full xl:h-[calc(100%-1rem)] xl:w-[calc(100%-1rem)] col-start-2 object-cover rounded-[30px]"
          src="https://res.cloudinary.com/di6tqrg5y/image/upload/v1733784472/ai-generated-8814121_1280_nbzs68.webp"
          fill
          alt="rice-fields-background"
        />
      </div>
    </div>
  )
}
