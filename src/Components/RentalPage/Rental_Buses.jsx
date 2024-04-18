import React from "react";
import Navbar from "../Navigation";
import HeroSection from "./HeroSection";

const Rental_Buses = () => {
  return (
    <>
      <Navbar />
      {/* <HeroSection /> */}
      <div>
        <h2 className=" text-xl mt-3">No Buses Found</h2>
        <h2 className=" text-base mb-2">Try again after some time</h2>

      </div>
    </>
  );
};

export default Rental_Buses;
