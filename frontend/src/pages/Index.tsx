import Layout from "@/components/Layout";
import HeroSlider from "@/components/HeroSlider";
import QuickActions from "@/components/QuickActions";
import AboutUs from "@/components/AboutUs";
import TourPackages from "@/components/TourPackages";
import Experience from "@/components/Experience";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";
import Testimonials from "@/components/Testimonials";

const Index = () => (
  <Layout>
    <HeroSlider />
    <QuickActions />
    <AboutUs />
    <TourPackages />
    <WhyChooseUs />
    <Experience />
    <Testimonials />
    <CTASection />
  </Layout>
);

export default Index;
