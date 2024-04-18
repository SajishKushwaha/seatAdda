import React from "react";
import Navbar from "../Navigation";
import FooterDesktop from "../FooterDesktop";
import FreeSection from "./FreeSection";
import Footer from "../Footer";

const FreeRides = () => {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto">
        <FreeSection />
      </div>

      <Footer />
    </div>
  );
};

export default FreeRides;
