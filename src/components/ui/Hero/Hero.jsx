import GradientWrapper from "@/components/GradientWrapper"
import Image from "next/image"
import NavLink from "../NavLink"
// import HeroImg from "public/images/hero.svg"
import LayoutEffect from "@/components/LayoutEffect"

const Hero = () => (
    <section>
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
                                backgroundImage: "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)"
                            }}
                        >
                            Simplify Your Life:<br/> AI-Powered Scheduling for the Busy and Ambitious
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
                    <GradientWrapper className="mt-16 sm:mt-28" wrapperclassname="max-w-3xl h-[250px] top-12 inset-0 sm:h-[300px] lg:h-[650px]">
                        <div className="overflow-hidden relative mx-auto max-w-6xl rounded-3xl" style={{ height: '600px', width: '100%' }}>
                            <div className="overflow-hidden absolute inset-0 bg-white rounded-3xl dark:bg-gray-900">
                                <Image
                                    src={'https://res.cloudinary.com/di6tqrg5y/image/upload/v1737050901/n650si44d2xirtgliy1y.jpg'}
                                    fill
                                    className="object-contain"
                                    alt="PlanWise.ai Dashboard"
                                    priority
                                    quality={100}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 2560px"
                                />
                            </div>
                        </div>
                    </GradientWrapper>
                </div>
            </LayoutEffect>
        </div>
    </section>
)

export default Hero