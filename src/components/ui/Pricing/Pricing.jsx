import LayoutEffect from "@/components/LayoutEffect";
import SectionWrapper from "@/components/SectionWrapper";
import Button from "../Button";

const Pricing = () => {

    const plans = [
        {
            name: "Free Tier",
            desc: "For new creators building their list",
            price: '0',
            isMostPop: false,
            features: [
                "5 Free Tokens upon signing up.",
                "Free manual schedule editing",
                "Sync with Google Calendar",
            ],
        },
        {
            name: "Unlimited Monthly Plan",
            desc: "Ideal for maximum productivity",
            price: '14',
            isMostPop: true,
            features: [
                "Unlimited tokens",
                "Sync with Google Calendar",
                "Free AI ed",
                "A/B testing",
                "Advanced statistics",
                "Multi-user access",
                "Send time optimization",
            ],
        },
    ];

    const mostPopPricingBg = "radial-gradient(130.39% 130.39% at 51.31% -0.71%, #1F2937 0%, rgba(31, 41, 55, 0) 100%)"

    return (
        <SectionWrapper id="pricing" className='custom-screen'>
            <div className='relative mx-auto max-w-xl text-center'>
                <h2 className='text-3xl font-semibold text-gray-50 sm:text-4xl'>
                    Choose a plan that works for you
                </h2>
            </div>
            <LayoutEffect
                className="duration-1000 delay-300"
                isInviewState={{
                    trueState: "opacity-1",
                    falseState: "opacity-0"
                }}
            >
                <div className='gap-6 justify-center mt-16 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-2'>
                    {
                        plans.map((item, idx) => (
                            <div key={idx} className={`relative flex-1 flex items-stretch flex-col rounded-xl border border-gray-800 mt-6 sm:mt-0 ${item.isMostPop ? "border border-purple-500" : ""}`}
                                style={{
                                    backgroundImage: item.isMostPop ? mostPopPricingBg : ""
                                }}
                            >
                                <div className="p-8 space-y-4 text-center border-b border-gray-800">
                                    <span className='font-medium text-purple-600'>
                                        {item.name}
                                    </span>
                                    <div className='text-3xl font-semibold text-gray-50'>
                                        ${item.price} <span className="text-xl font-normal text-gray-400">/mo</span>
                                    </div>
                                    <p className="text-gray-400">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="p-8">
                                    <ul className='space-y-3'>
                                        {
                                            item.features.map((featureItem, idx) => (
                                                <li key={idx} className='flex gap-5 items-center text-gray-300'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        className='w-5 h-5 text-indigo-600'
                                                        viewBox='0 0 20 20'
                                                        fill='currentColor'>
                                                        <path
                                                            fillRule='evenodd'
                                                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                            clipRule='evenodd'></path>
                                                    </svg>
                                                    {featureItem}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <div className="pt-8">
                                        <Button className={`w-full rounded-full text-white ring-offset-2 focus:ring ${item.isMostPop ? "bg-purple-600 hover:bg-purple-500 focus:bg-purple-700 ring-purple-600" : "bg-gray-800 hover:bg-gray-700 ring-gray-800"}`}>
                                            Get Started
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </LayoutEffect>
        </SectionWrapper>
    );
};

export default Pricing