import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { CiCalendar, CiChat1, CiHome, CiWallet } from "react-icons/ci";
import { CgMenuGridO } from "react-icons/cg";
const Footer = () => {
  const [selectedButton, setSelectedButton] = useState("Top Bus Routes");
  const url = "https://seatadda.co.in/general-settings";
  const [DATA, set_DATA] = useState([]);

  const fetchInfo = async () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => set_DATA(d.date));
  };
  // console.log(DATA);
  useEffect(() => {
    fetchInfo();
  }, []);

  const location = useLocation();

  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const path = pathname.split("/");
  // console.log(path)
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
          <li>Hyderabad to Chennai Bus</li>
          <li>Hyderabad to Mumbai Bus</li>
          <li>Hyderabad to Delhi Bus</li>
          <li>Hyderabad to Kolkata Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Ahmedabad to Udaipur Bus</li>
          <li>Ahmedabad to Jaipur Bus</li>
          <li>Ahmedabad to Mumbai Bus</li>
          <li>Ahmedabad to Delhi Bus</li>
          <li>Hyderabad to Pune Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Delhi to Agra Bus</li>
          <li>Delhi to Jaipur Bus</li>
          <li>Delhi to Chandigarh Bus</li>
          <li>Delhi to Amritsar Bus</li>
          <li>Hyderabad to Goa Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Bangalore to Mysore Bus</li>
          <li>Bangalore to Coorg Bus</li>
          <li>Bangalore to Ooty Bus</li>
          <li>Bangalore to Chennai Bus</li>
          <li>Hyderabad to Vizag Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Mumbai to Pune Bus</li>
          <li>Mumbai to Goa Bus</li>
          <li>Mumbai to Shirdi Bus</li>
          <li>Mumbai to Ahmedabad Bus</li>
          <li>Hyderabad to Nagpur Bus</li>
        </ul>
      </div>
    ),
    "Buses from Top Cities": (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 mx-auto lg:mx-auto lg:grid-cols-4 xl:grid-cols-5 gap-0 text-left ">
        <ul className="links mx-5">
          <li>Bangalore to Chennai Bus</li>
          <li>Hyderabad to Mumbai Bus</li>
          <li>Mumbai to Goa Bus</li>
          <li>Delhi to Agra Bus</li>
          <li>Chennai to Pondicherry Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Ahmedabad to Jaipur Bus</li>
          <li>Jaipur to Udaipur Bus</li>
          <li>Pune to Mumbai Bus</li>
          <li>Kolkata to Darjeeling Bus</li>
          <li>Hyderabad to Vizag Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Chandigarh to Shimla Bus</li>
          <li>Amritsar to Jammu Bus</li>
          <li>Lucknow to Varanasi Bus</li>
          <li>Guwahati to Shillong Bus</li>
          <li>Bhopal to Indore Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Coimbatore to Ooty Bus</li>
          <li>Kochi to Munnar Bus</li>
          <li>Kota to Kanyakumari Bus</li>
          <li>Goa to Hampi Bus</li>
          <li>Ahmedabad to Diu Bus</li>
        </ul>
        <ul className="links mx-5">
          <li>Nagpur to Nagaland Bus</li>
          <li>Ranchi to Rishikesh Bus</li>
          <li>Surat to Saputara Bus</li>
          <li>Pune to Araku Bus</li>
          <li>Hyderabad to Hampi Bus</li>
        </ul>
      </div>
    ),
    "Top RTC Buses": (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-6 xl:grid-cols-6 gap-0 text-left ">
        <ul className="links mx-5">
          <li>UPSRTC</li>
          <li>TSRTC</li>
          <li>OSRTC</li>
          <li>MSRTC</li>
        </ul>
        <ul className="links mx-5">
          <li>APSRTC</li>
          <li>KSRTC</li>
          <li>TSRTC</li>
          <li>MSRTC</li>
        </ul>
        <ul className="links mx-5">
          <li>GSRTC</li>
          <li>KSRTC</li>
          <li>UPSRTC</li>
        </ul>
        <ul className="links mx-5">
          <li>TSRTC</li>
          <li>OSRTC</li>
          <li>MSRTC</li>
        </ul>
        <ul className="links mx-5">
          <li>APSRTC</li>
          <li>GSRTC</li>
          <li>UPSRTC</li>
        </ul>
      </div>
    ),
  };

  return (
    <>
      {/*  <div className="bg-primarycolors-gray/50 hidden md:block">
       
        <div className="container mx-auto">
          <div className="flex  border-b-[1px] border-primarycolors-textcolor">
            {buttonLabels.map((buttonLabel) => (
              <button
                key={buttonLabel}
                onClick={() => handleButtonClick(buttonLabel)}
                className={`p-2 mx-3  rounded-t-md ${selectedButton === buttonLabel
                  ? "border-primarycolors-red border-b-[3px] font-bold "
                  : "hover:bg-primar
                  ycolors-textcolor/20"
                  }`}
              >
                {buttonLabel}
              </button>
            ))}
          </div>
          <div className="p-5">{linkContents[selectedButton]}</div>
        </div>
      </div> */}
      <div className="bg-primarycolors-textcolor/50 hidden md:block">
        {/* links */}
        <div className=" container mx-auto ">
          <div className=" p-4  mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
            <div className="md:flex justify-between">
              <div className="flex flex-wrap justify-center items-center  -my-2">
                {/* <div className="px-2 py-2">
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-500 hover:text-gray-900"
                  >
                    Operators
                  </a>
                </div>{" "}
                |
                <div className="px-2 py-2">
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-500 hover:text-gray-900"
                  >
                    Routes
                  </a>
                </div>{" "}
                |<div className="px-2 py-2">
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-500 hover:text-gray-900"
                  >
                    Blog
                  </a>
                </div>{" "}
                /*/}
                <div className="px-2 py-2">
                  <NavLink
                    to="/about"
                    className="text-base leading-6 text-gray-500 hover:text-gray-900"
                  >
                    About
                  </NavLink>
                </div>{" "}
                |
                <div className="px-2 py-2">
                  <NavLink
                    to="/privacy"
                    className="text-base leading-6 text-gray-500 hover:text-gray-900"
                  >
                    Privacy Policy
                  </NavLink>
                </div>{" "}
                |
                <div className="px-2 py-2">
                  <NavLink
                    to="/faq"
                    className="text-base leading-6 text-gray-500 hover:text-gray-900"
                  >
                    FAQ
                  </NavLink>
                </div>{" "}
                |
                <div className="px-2 py-2">
                  <NavLink
                    to="/contact"
                    className="text-base leading-6 text-gray-500 hover:text-gray-900"
                  >
                    Contact
                  </NavLink>
                </div>{" "}
                |
                <div className="px-2 py-2">
                  <NavLink
                    to="/terms"
                    className="text-base leading-6 text-gray-500 hover:text-gray-900"
                  >
                    Terms
                  </NavLink>
                </div>
              </div>
              <div className="flex flex-wrap justify-center items-center mt-3 md:mt-0 space-x-2  md:space-x-4">
                <div className=" rounded-full ">
                  <a
                    href={DATA.facebook_link}
                    target="_blank"
                    className="text-primarycolors-black "
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
                <div className=" rounded-full ">
                  <a
                    href={DATA.instagram_link}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
                <div className=" rounded-full ">
                  <a
                    href={DATA.twitter_link}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                </div>

                <div className=" rounded-full ">
                  <a
                    href={DATA.linkedin_link}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Linkedin</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 64 64"
                    >
                      <path d="M32,6C17.641,6,6,17.641,6,32c0,14.359,11.641,26,26,26s26-11.641,26-26C58,17.641,46.359,6,32,6z M25,44h-5V26h5V44z M22.485,24h-0.028C20.965,24,20,22.888,20,21.499C20,20.08,20.995,19,22.514,19c1.521,0,2.458,1.08,2.486,2.499 C25,22.887,24.035,24,22.485,24z M44,44h-5v-9c0-3-1.446-4-3-4c-1.445,0-3,1-3,4v9h-5V26h5v3c0.343-0.981,1.984-3,5-3c4,0,6,3,6,8 V44z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primarycolors-textcolor hidden md:block ">
        <div className="container mx-auto mb-[4rem] sm:mb-0">
          <div className="sm:flex justify-center">
            <div className=" p-3  text-base leading-6 text-center text-primarycolors-white">
              © 2024 {DATA.footer_content}
            </div>
          </div>
        </div>{" "}
      </div>

      {/* Footer Mobile */}
      <div className="fixed shadow-inner border-t-[1px] border-primarycolors-gray bottom-0 z-10 left-0 w-screen  font-light  bg-primarycolors-white  md:hidden">
        <div className="grid grid-cols-5   py-2">
          <div
            className={`text-center  ${
              path[1] === ""
                ? "text-primarycolors-red font-semibold"
                : "text-primarycolors-textcolor"
            }`}
          >
            <NavLink to="/">
              <CiHome className="bottom-icons-size " />
              <p className="bottom-text">HOME</p>
            </NavLink>
          </div>
          <div
            className={`text-center  ${
              path[1] === "bookings"
                ? "text-primarycolors-red font-semibold"
                : "text-primarycolors-textcolor"
            }`}
          >
            <NavLink to="" className="cursor-not-allowed">
              <CiCalendar className="bottom-icons-size" />
              <p className="bottom-text">BOOKINGS</p>
            </NavLink>
            {/*   <NavLink to="/bookings" className='cursor-not-allowed'>
              <CiCalendar className="bottom-icons-size" />
              <p className="bottom-text">BOOKINGS</p>
            </NavLink> */}
          </div>
          <div
            className={`text-center  ${
              path[1] === "menu"
                ? "text-primarycolors-red font-semibold"
                : "text-primarycolors-textcolor"
            }`}
          >
            <NavLink to="/menu">
              <CgMenuGridO className="bottom-icons-size " />
              <p className="bottom-text">MENU</p>
            </NavLink>
          </div>
          <div
            className={`text-center  ${
              path[1] === "wallet"
                ? "text-primarycolors-red font-semibold"
                : "text-primarycolors-textcolor"
            }`}
          >
            <NavLink to="">
              <CiWallet className="bottom-icons-size" />
              <p className="bottom-text">WALLET</p>
            </NavLink>
            {/* <NavLink to="/wallet">
              <CiWallet className="bottom-icons-size" />
              <p className="bottom-text">WALLET</p>
            </NavLink> */}
          </div>
          <div
            className={`text-center  ${
              path[1] === "help"
                ? "text-primarycolors-red font-semibold"
                : "text-primarycolors-textcolor"
            }`}
          >
            <NavLink to="/help">
              <CiChat1 className="bottom-icons-size" />
              <p className="bottom-text">HELP</p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
