import { CasesSection } from '@/components/CasesSection';
import { FeatureSection } from '@/components/FeatureSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ListSection } from '@/components/ListSection';
import { Page } from '@/components/Page';
import { PricingTable } from '@/components/PricingTable';
import { SocialProof } from '@/components/SocialProof';
// import { VideoSection } from '@/components/VideoSection';
// import { NextSeo } from 'next-seo';

export default function LandingPage() {
  return (
    <Page>
      <Header />
      <main>
        {/* <VideoSection /> */}
        <ListSection />
        <FeatureSection />
        <CasesSection />
        <SocialProof />
        <PricingTable />
      </main>
      <Footer />
    </Page>
  );
}
