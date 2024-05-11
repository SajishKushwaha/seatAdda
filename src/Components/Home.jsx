import React from "react";
import Navbar from "./Navigation";
import OffersSection from "./OffersSection";
import BusServicesSection from "./BusServicesSection";
import ExtraService from "./ExtraService";
import Details from "./Details";
import FAQ from "./FAQ";
import ChatUs from "./ChatUS";
import AppBanner from "./AppBanner";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
const Home = () => {
  return (
    <div className="">
      <Navbar />
      <ChatUs />

      {/* header */}
      <HeroSection />

      {/* Offers */}
      <OffersSection />

      {/* All Bus Services */}
      {/* <BusServicesSection /> */}

      {/* Extra */}
      <ExtraService />

      {/* Details */}
      <Details />

      {/* FAQ */}
      <FAQ />

      {/* APP Banner */}
      <AppBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
