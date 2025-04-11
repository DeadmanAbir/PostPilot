import Navbar from "./homePageComponents/navbar";
import HeroSection from "./homePageComponents/hero-section";
import FeatureGrid from "./homePageComponents/feature-grid";
import EfficiencySection from "./homePageComponents/effeciency-section";
import CallToAction from "./homePageComponents/call-to-action";
import Footer from "./homePageComponents/footer";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-black relative  text-white  flex flex-col items-center justify-center">
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 to-blue-900/15 absolute inset-0">

      </div>
      <Navbar />

      <HeroSection />
      <HeroSection />

      {/* <FeatureGrid /> */}

      {/* <EfficiencySection /> */}


      {/* <CallToAction /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
