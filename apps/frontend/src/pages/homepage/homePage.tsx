import Navbar from "./homePageComponents/navbar";
import HeroSection from "./homePageComponents/hero-section";
import FeatureGrid from "./homePageComponents/feature-grid";
import EfficiencySection from "./homePageComponents/effeciency-section";
import CallToAction from "./homePageComponents/call-to-action";
import Footer from "./homePageComponents/footer";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-black relative  text-white  flex flex-col items-center justify-center  euclid overflow-hidden">
       <div className='absolute -top-48 left-0 blur-[100px] z-0 '>
        <div
          className=" bg-blue-500  h-[300px] w-[600px]  z-0" 
          style={{ clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)' }}
        />

      </div>
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 to-blue-900/15 absolute inset-0 z-0">

      </div>
      <Navbar />

      <HeroSection />

      <FeatureGrid />

      <EfficiencySection />


      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;
