import Layout from "@/components/Layout";
import CTA from "@/components/ui/CTA";
import FAQs from "@/components/ui/FAQs";
import Features from "@/components/ui/Features";
import Hero from "@/components/ui/Hero";
import Pricing from "@/components/ui/Pricing";
import { Spotlight } from "@/components/ui/Spotlight";
import Testimonial from "@/components/ui/Testimonial";
import VisualFeatures from "@/components/ui/VisualFeatures";

export default function Home() {
  return (
    <div className="absolute top-0 left-0 z-[100] w-screen overflow-y-auto h-screen bg-gray-900">
      <div className="overflow-hidden absolute inset-0">
      <Spotlight
          className="-left-10 top-[-5rem] h-screen md:-left-32 md:-top-20"
          fill="white"
        />
        <Spotlight
          className="top-10 md:block hidden left-full h-[80vh] w-[50vw]"
          fill="#93C5FD"
        />
        <Spotlight className="top-28 left-10 md:left-80 h-[80vh] w-50vw]" fill="#3B82F6" />
      </div>
      <Layout>
        <main className="flex flex-col w-[90%] mx-auto relative z-10">
          <Hero />
          <VisualFeatures />
          {/* <Features /> */}
          {/* <CTA /> */}
          {/* <Testimonial /> */}
          <Pricing />
          <FAQs />
        </main>
      </Layout>
    </div>
  );
}
