import SectionWrapper from "@/components/SectionWrapper"
import GradientWrapper from "@/components/GradientWrapper"
// import user1 from "public/testimonial/user1.webp"
// import user2 from "public/testimonial/user2.webp"
// import user3 from "public/testimonial/user3.webp"
// import user4 from "public/testimonial/user4.webp"
// import user5 from "public/testimonial/user5.webp"
// import user6 from "public/testimonial/user6.webp"
import Image from "next/image"
import LayoutEffect from "@/components/LayoutEffect"

const Testimonial = () => {

    const testimonials = [
        {
            // avatar: user1,
            name: "Mark Zuckerberg",
            title: "Founder of meta",
            quote: "we've been using Planwise for almost a year now and have nothing but great things to say. It's super easy to set up campaigns and its reporting features are incredibly detailed."
        },
        {
            // avatar: user2,
            name: "Guillermo Rauch",
            title: "Founder of Vercel",
            quote: "Planwise has been a great addition to our email marketing strategy. It's so user-friendly, yet powerful and effective. I'm able to quickly create beautiful emails."
        },
        {
            // avatar: user3,
            name: "Sidi jeddou",
            title: "Founder of Float UI",
            quote: "I highly recommend Planwise for anyone looking for an easy-to-use and reliable email marketing tool! It's simple to use and has been a great help."
        },
        {
            // avatar: user4,
            name: "Ghazbel",
            title: "Founder of forceY",
            quote: "I've been using Planwise for the past few months and I'm extremely impressed. The user interface is very intuitive, and I love the automated features ."
        },
        {
            // avatar: user5,
            name: "Ana khan",
            title: "Founder of larax",
            quote: "Planwise is the best email marketing tool I've ever used. It's incredibly simple and intuitive to use, yet it offers a wide range of features and options."
        },
        {
            // avatar: user6,
            name: "Ahmed khasem",
            title: "Founder of Let’s code",
            quote: "Planwise is definitely the way to go when it comes to email marketing + I highly recommend it as an email marketing tool with AI support."
        },
    ]

    return (
        <SectionWrapper>
            <div id="testimonials" className="text-gray-300 custom-screen">
                <div className="max-w-2xl text-center md:mx-auto">
                    <h2 className="text-3xl font-semibold text-gray-50 sm:text-4xl">
                        Planwise is loved by the best founders around the world
                    </h2>
                </div>
                <GradientWrapper wrapperclassname="max-w-sm h-40 top-12 inset-x-0" className="mt-12">
                    <LayoutEffect
                        className="duration-1000 delay-300"
                        isInviewState={{
                            trueState: "opacity-1",
                            falseState: "opacity-0 translate-y-12"
                        }}
                    >
                        <ul className="grid gap-6 duration-1000 ease-in-out delay-300 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                testimonials.map((item, idx) => (
                                    <li key={idx} className="p-4 rounded-xl border border-gray-800"
                                        style={{
                                            backgroundImage: "radial-gradient(100% 100% at 50% 50%, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0) 100%)"
                                        }}
                                    >
                                        <figure className="flex flex-col gap-y-6 justify-between h-full">
                                            <blockquote className="">
                                                <p className="">
                                                    {item.quote}
                                                </p>
                                            </blockquote>
                                            <div className="flex gap-x-4 items-center">
                                                {/* <Image
                                                    src={item?.avatar}
                                                    alt={item.name}
                                                    className="object-cover w-14 h-14 rounded-full"
                                                /> */}
                                                <div>
                                                    <span className="block font-semibold text-gray-50">{item.name}</span>
                                                    <span className="block text-sm mt-0.5">{item.title}</span>
                                                </div>
                                            </div>
                                        </figure>
                                    </li>
                                ))
                            }
                        </ul>
                    </LayoutEffect>
                </GradientWrapper>
            </div>
        </SectionWrapper>
    )
}

export default Testimonial