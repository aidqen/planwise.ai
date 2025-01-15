import Layout from "@/components/Layout";
import CTA from "@/components/ui/CTA";
import FAQs from "@/components/ui/FAQs";
import Features from "@/components/ui/Features";
import Hero from "@/components/ui/Hero";
import Pricing from "@/components/ui/Pricing";
import Testimonial from "@/components/ui/Testimonial";
import VisualFeatures from "@/components/ui/VisualFeatures";

export default function Home() {
  return (
    <div className="absolute top-0 left-0 z-[100] w-screen overflow-y-auto h-screen bg-gray-900">
      <Layout>
        <main className="flex flex-col w-[80%] mx-auto">

        <Hero />
        <VisualFeatures />
        <Features />
        <CTA />
        <Testimonial />
        <Pricing />
        <FAQs />
        </main>
      </Layout>
    </div>
  );
}
