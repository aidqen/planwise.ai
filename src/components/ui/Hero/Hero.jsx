import GradientWrapper from "@/components/GradientWrapper"
import Image from "next/image"
import NavLink from "../NavLink"
// import HeroImg from "public/images/hero.svg"
import LayoutEffect from "@/components/LayoutEffect"
// import { ComputerMockup } from "@/components/ComputerMockup"

const Hero = () => (
    <section className="w-full">
        <div className="py-28 custom-screen">
            <LayoutEffect className="duration-1000 delay-300"
                isInviewState={{
                    trueState: "opacity-1",
                    falseState: "opacity-0"
                }}
            >
                <div>
                    <div className="z-50 mx-auto space-y-5 max-w-3xl text-center">
                        <h1 className="mx-auto text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r sm:text-5xl"
                            style={{
                                backgroundImage: "linear-gradient(179.1deg, #FFFFFF 0%, #93C5FD 100%)"
                            }}
                        >
                            Simplify Your Life:<br /> AI-Powered Scheduling for the Busy and Ambitious
                        </h1>
                        <p className="mx-auto max-w-xl text-gray-300">
                            Take control of your day with AI-designed schedules tailored to your goals, routines and preferences.
                        </p>
                        <div className="flex justify-center text-sm font-medium">
                            <NavLink
                                href="/home"
                                className="flex items-center text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                            >
                                Get Started
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                            </NavLink>
                        </div>
                    </div>
                    <GradientWrapper className="mt-16 sm:mt-28" wrapperclassname="max-w-full w-full h-[400px] top-12 inset-0 sm:h-[500px] lg:h-[750px]">
                        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[680px]">
                            <Image
                                src={'https://res.cloudinary.com/di6tqrg5y/image/upload/v1737290927/rnujsqcf7abjg9xmgra6.png'}
                                fill
                                className="rounded-xl object-fit"
                                alt="PlanWise.ai Dashboard"
                                priority
                                quality={100}
                                sizes="100vw"
                            />
                        </div>
                    </GradientWrapper>
                </div>
            </LayoutEffect>
        </div>
    </section>
)

export default Hero