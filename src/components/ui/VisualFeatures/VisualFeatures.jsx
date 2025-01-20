import SectionWrapper from "@/components/SectionWrapper"
// import Feature1 from "public/images/Feature-1.svg"
// import Feature2 from "public/images/Feature-2.svg"
import Image from "next/image"

const VisualFeatures = () => {

    const features = [
        {
            title: "Create Personalized Schedules",
            desc: "Effortlessly plan your day with AI-powered schedules tailored to your goals, routines, and preferences.",
            // img: Feature1
        },
        {
            title: "Seamless Google Calendar Integration",
            desc: "Sync your schedules directly with Google Calendar and manage all your tasks in one place.",
            // img: Feature2
        },
    ]
    return (
        <SectionWrapper>
            <div className="text-gray-300 custom-screen">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-3xl font-semibold text-gray-50 sm:text-4xl">
                        Take your productivity to the next level with Planwise
                    </h2>
                    <p className="mt-3">
                        With Planwise&apos;s powerful features, you can easily create and send beautiful emails that will engage your customers and drive more sales.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="gap-x-6 space-y-8 sm:flex sm:space-y-0">
                        {
                            features.map((item, idx) => (
                                <li className="flex flex-col flex-1 justify-between rounded-2xl border border-gray-800" key={idx}
                                    style={{
                                        background: "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)"
                                    }}
                                >
                                    <div className="p-8">
                                        <h3 className="text-xl font-semibold text-gray-50">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 sm:text-sm md:text-base">
                                            {item.desc}
                                        </p>
                                    </div>
                                    {/* <div className="pl-8">
                                        <Image
                                            src={item?.img}
                                            className="ml-auto w-full"
                                            alt={item.title}
                                        />
                                    </div> */}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default VisualFeatures