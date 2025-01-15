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
                    <div className="mx-auto space-y-5 max-w-3xl text-center">
                        <h1 className="mx-auto text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r sm:text-5xl"
                            style={{
                                backgroundImage: "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)"
                            }}
                        >
                            Simplify Your Life:<br/> AI-Powered Scheduling for the Busy and Ambitious
                        </h1>
                        <p className="mx-auto max-w-xl text-gray-300">
                            Gain control of your business's growth with Planwise's comprehensive marketing, automation, and email marketing platform.
                        </p>
                        <div className="flex justify-center text-sm font-medium">
                            <NavLink
                                href="/home"
                                className="flex items-center text-white bg-purple-600 hover:bg-purple-500 active:bg-purple-700"
                            >
                                Get Started
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                            </NavLink>
                        </div>
                    </div>
                    {/* <GradientWrapper className="mt-16 sm:mt-28" wrapperClassName="max-w-3xl h-[250px] top-12 inset-0 sm:h-[300px] lg:h-[650px]"> */}
                        {/* <div className="relative w-full h-full">
                            <Image
                                src={'https://res.cloudinary.com/di6tqrg5y/image/upload/v1736951684/odzgtoygcdrjentn1mok.jpg'}
                                fill
                                className="object-cover rounded-2xl shadow-lg"
                                alt="PlanWise.ai Dashboard"
                                priority
                            />
                        </div> */}
                    {/* </GradientWrapper> */}
                </div>
            </LayoutEffect>
        </div>
    </section>
)

export default Hero