import React, { useState } from "react";
import Navbar from "../Navigation";
import Footer from "../Footer";
import OffersSection from "./OffersSection";
import { MdSavings, MdSecurity } from "react-icons/md";
import { FaSurprise } from "react-icons/fa";
import AppBanner from "../AppBanner";
import { NavLink } from "react-router-dom";

import {
  FaBars,
  FaBook,
  FaCoins,
  FaHome,
  FaQuestionCircle,
} from "react-icons/fa";
import HeroSection from "../HeroSection";
import FooterDesktop from "../FooterDesktop";
const Offers = () => {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
  const [selectedButton, setSelectedButton] = useState("Top Bus Routes");

  // Function to handle button click
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  // List of button labels
  const buttonLabels = [
    "Top Bus Routes",
    "Buses from Top Cities",
    "Top RTC Buses",
    "Top Bus Services",
    "Quick Links",
  ];

  // Content for different links
  const linkContents = {
    "Top Bus Routes": (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 mx-auto lg:mx-auto lg:grid-cols-4 xl:grid-cols-5 gap-0 text-left ">
        <ul className="links mx-5">
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Ahmedabad to Udaipur Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Ahmedabad to Udaipur Bus</li>
          <li>Ahmedabad to Udaipur Bus</li>
          <li>Ahmedabad to Udaipur Bus</li>
          <li>Ahmedabad to Udaipur Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
        </ul>
      </div>
    ),
    "Buses from Top Cities": (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 mx-auto lg:mx-auto lg:grid-cols-4 xl:grid-cols-5 gap-0 text-left ">
        <ul className="links mx-5">
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Ahmedabad to Udaipur Bus</li>
          <li>Ahmedabad to Udaipur Bus</li>
          <li>Ahmedabad to Udaipur Bus</li>
          <li>Hyderabad to Bangalore Bus</li>
        </ul>
        <ul className="links mx-5 ">
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>

          <li>Hyderabad to Bangalore Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Hyderabad to Bangalore Bus</li>
          <li>Hyderabad to Bangalore Bus</li>

          <li>Hyderabad to Bangalore Bus</li>
        </ul>
      </div>
    ),
    "Top RTC Buses": (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-6 xl:grid-cols-6 gap-0 text-left ">
        <ul className="links mx-5">
          <li>RSRTC</li>
          <li>GSRTC</li>

          <li>BSRTC</li>
          <li>MSSRTC</li>
        </ul>
        <ul className="links mx-5">
          <li>RSRTC</li>
          <li>GSRTC</li>

          <li>BSRTC</li>
          <li>MSSRTC</li>
        </ul>
        <ul className="links mx-5">
          <li>RSRTC</li>
          <li>GSRTC</li>

          <li>MSSRTC</li>
        </ul>
        <ul className="links mx-5">
          <li>KSRTC</li>
          <li>BSRTC</li>
          <li>MSSRTC</li>
        </ul>
        <ul className="links mx-5">
          <li>RSRTC</li>
          <li>GSRTC</li>
          <li>KSRTC</li>
        </ul>
      </div>
    ),
  };
  return (
    <>
     
          <Navbar />
          <div className="h-1/2">
            <HeroSection />
          </div>
          <div className="container mx-auto">
            <div>
              <OffersSection />
            </div>{" "}
            <div className="mt-5 bg-primarycolors-gray/10 shadow-md  p-5 w-full grid grid-cols-1 sm:grid-cols-2  gap-5 md:grid-cols-3">
            <div className="p-3">
    <div className="text-5xl text-primarycolors-red mb-3 ">
        <MdSavings />
    </div>
    <div>
        <h1 className="text-xl font-semibold my-2">More Savings</h1>
        <p className="text-sm">
            Experience unparalleled savings with our Bus Rental App. Enjoy competitive pricing and exclusive discounts that make your journey not only convenient but also cost-effective. We prioritize your budget, ensuring that every trip with us maximizes your savings without compromising on quality or comfort.
        </p>
    </div>
</div>

<div className="p-3">
    <div className="text-5xl text-primarycolors-red mb-3">
        <MdSecurity />
    </div>
    <div>
        <h1 className="text-xl font-semibold my-2">
            100% Secure Payments
        </h1>
        <p className="text-sm">
            Rest easy with our Bus Rental App – your payments are 100% secure. We prioritize the safety and security of your transactions, providing you with peace of mind throughout the booking process. Your financial information is handled with the utmost care, ensuring a secure and reliable payment experience every time.
        </p>
    </div>
</div>

<div className="p-3">
    <div className="text-5xl text-primarycolors-red mb-3">
        <FaSurprise />
    </div>
    <div>
        <h1 className="text-xl font-semibold my-2">Surprise Gifts</h1>
        <p className="text-sm">
            As a token of appreciation, enjoy surprise gifts with every booking made through our Bus Rental App. We believe in adding an extra touch of joy to your travel experience. Whether it's a special discount, an upgrade, or a personalized offer, we love surprising our customers and making each journey with us a delightful adventure.
        </p>
    </div>
</div>

            </div>
          </div>
          <div>
            <AppBanner />
          </div>
          <div className="mt-4">
            <Footer />
          </div>{" "}
       
    </>
  );
};

export default Offers;
