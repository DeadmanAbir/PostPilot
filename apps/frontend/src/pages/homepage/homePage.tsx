import Navbar from "./homePageComponents/navbar";
import HeroSection from "./homePageComponents/hero-section";
import FeatureGrid from "./homePageComponents/feature-grid";
import EfficiencySection from "./homePageComponents/effeciency-section";
import CallToAction from "./homePageComponents/call-to-action";
import Footer from "./homePageComponents/footer";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white px-5">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Grid */}
      <FeatureGrid />

      {/* Maximize Efficiency Section */}
      <EfficiencySection />

      {/* CTA Section */}

      <CallToAction />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
