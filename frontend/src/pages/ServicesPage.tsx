import Layout from "@/components/Layout";
import Services from "@/components/Services";
import TourPackages from "@/components/TourPackages";
import CTASection from "@/components/CTASection";

const ServicesPage = () => (
  <Layout>
    <div className="pt-24" />
    <Services />
    <TourPackages />
    <CTASection />
  </Layout>
);

export default ServicesPage;
