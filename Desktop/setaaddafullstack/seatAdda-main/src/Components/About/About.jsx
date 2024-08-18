import React, { useState } from 'react'
import Navbar from '../Navigation'
import AboutSection from './AboutSection'
import { NavLink } from "react-router-dom";

import {
  FaBars,
  FaBook,
  FaCoins,
  FaHome,
  FaQuestionCircle,
} from "react-icons/fa";
import Footer from '../Footer';
import FooterDesktop from '../FooterDesktop';

const About = () => {
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
        <div>

            <Navbar />

            <div className='container mx-auto'>
                <AboutSection />
            </div>

            <div>
        <Footer/>
            </div>

        </div>
    )
}

export default About