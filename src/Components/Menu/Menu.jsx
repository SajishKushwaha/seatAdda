import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTicketAlt, FaUserCircle } from "react-icons/fa";

import Cookies from "js-cookie";

import {
  MdArrowForwardIos,
  MdContactPage,
  MdFormatQuote,
  MdLabelOutline,
  MdLocalOffer,
  MdPolicy,
  MdTerminal,
  MdCardTravel,
} from "react-icons/md";
import { BiUserCircle, BiCaretDown } from "react-icons/bi";
import { GoCrossReference } from "react-icons/go";
import { BiSolidCoupon } from "react-icons/bi";
import FooterDesktop from "../FooterDesktop";
import Footer from "../Footer";
import { useSelector } from "react-redux";

const Menu = () => {
  const navigate = useNavigate();

  const jwt_token = Cookies.get("jwt_token");
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <div className=" bg-primarycolors-bg_sky/50">
        {jwt_token && userData ? (
          <NavLink
            to="/account"
            className="fixed overflow-y-hidden z-10 w-full flex items-center justify-between text-primarycolors-white px-2 py-5 bg-primarycolors-textcolor sm:bg-primarycolors-textcolor"
          >
            <div className="flex items-center justify-start">
              <BiUserCircle
                className="text-center text-primarycolors-red"
                size={50}
              />
              <div style={{ marginLeft: "10px", fontSize: "20px" }}>
                <h1>{userData.user.name}</h1>
              </div>
            </div>

            <NavLink to="/account">
              {" "}
              <MdArrowForwardIos />
            </NavLink>
          </NavLink>
        ) : (
          <NavLink
            to="/bookings"
            className="fixed overflow-y-hidden z-10 w-full flex items-center justify-around text-primarycolors-white px-2 py-5 bg-primarycolors-textcolor sm:bg-primarycolors-textcolor"
          >
            <div className="text-5xl">
              <FaUserCircle />
            </div>
            <div className="w-[70%] px-1 text-base  truncate">
              Login to avail Offers and more exiciting
            </div>
            <div className="text-xl">
              {" "}
              <NavLink to="/bookings">
                {" "}
                <MdArrowForwardIos />
              </NavLink>
            </div>
          </NavLink>
        )}
        <div className="overflow-y-auto  relative top-[6rem] mb-[10rem]">
          <div className=" bg-primarycolors-white rounded-lg shadow-md flex flex-col m-3 p-3 py-6 gap-5 border-[0.5px]  border-primarycolors-textcolor/30">
            <div className="flex items-baseline justify-between px-3 text-primarycolors-textcolor/75">
              <div className="text-2xl">
                <FaTicketAlt />
              </div>
              <div className="w-3/4 text-sm text-primarycolors-black   text-left">
                Booking History
              </div>
              <div className="text-xl">
                {" "}
                <NavLink to="/bookings">
                  <MdArrowForwardIos />
                </NavLink>
              </div>
            </div>
            {/* <NavLink
              // to="/free-rides"
              className="flex items-baseline justify-between px-3 text-primarycolors-textcolor/75"
            >
              <div className="text-2xl">
                <BiSolidCoupon />
              </div>
              <div className="w-3/4   text-primarycolors-black text-sm  text-left">
                Get FREE Rides
              </div>
              <div className="text-xl">
                {" "}
                <NavLink>
                  {" "}
                  <MdArrowForwardIos />
                </NavLink>
              </div>
            </NavLink> */}
          </div>

          <div className=" bg-primarycolors-white rounded-lg shadow-md flex flex-col m-3 p-3 gap-5 border-[0.5px]  border-primarycolors-textcolor/30">
            <NavLink
              to="/ReferAndEarn"
              className="flex items-baseline justify-between px-3 text-primarycolors-textcolor/75"
            >
              <div className="text-2xl">
                <GoCrossReference />
              </div>
              <div className="w-3/4 text-sm text-primarycolors-black   text-left">
                Refer And Earn
              </div>
              <div className="text-xl">
                {" "}
                <NavLink to="/ReferAndEarn">
                  {" "}
                  <MdArrowForwardIos />
                </NavLink>
              </div>
            </NavLink>

            <NavLink
              to="/offers"
              className="flex items-baseline justify-between px-3 text-primarycolors-textcolor/75"
            >
              <div className="text-2xl">
                <MdLocalOffer />
              </div>
              <div className="w-3/4 text-sm text-primarycolors-black   text-left">
                Bus Booking Offers
              </div>
              <div className="text-xl">
                {" "}
                <NavLink>
                  {" "}
                  <MdArrowForwardIos />
                </NavLink>
              </div>
            </NavLink>

            <NavLink
              to="/faq"
              className="flex items-baseline justify-between px-3 text-primarycolors-textcolor/75"
            >
              <div className="text-2xl">
                <MdFormatQuote />
              </div>
              <div className="w-3/4 text-sm text-primarycolors-black    text-left">
                FAQ's
              </div>
              <div className="text-xl">
                {" "}
                <NavLink to="/faq">
                  {" "}
                  <MdArrowForwardIos />
                </NavLink>
              </div>
            </NavLink>
            <NavLink
              to="/travelpolicy"
              className="flex items-baseline justify-between px-3 text-primarycolors-textcolor/75"
            >
              <div className="text-2xl">
                <MdCardTravel />
              </div>
              <div className="w-3/4 text-sm text-primarycolors-black    text-left">
                Travel Policy
              </div>
              <div className="text-xl">
                {" "}
                <NavLink to="/travelpolicy">
                  {" "}
                  <MdArrowForwardIos />
                </NavLink>
              </div>
            </NavLink>

            <NavLink
              to="/terms"
              className="flex items-baseline justify-between px-3 text-primarycolors-textcolor/75"
            >
              <div className="text-2xl">
                <MdTerminal />
              </div>
              <div className="w-3/4 text-sm text-primarycolors-black    text-left">
                Terms and Conditions
              </div>
              <div className="text-xl">
                {" "}
                <NavLink to="/terms">
                  {" "}
                  <MdArrowForwardIos />
                </NavLink>
              </div>
            </NavLink>

            <NavLink
              to="/privacy"
              className="flex items-baseline justify-between px-3 text-primarycolors-textcolor/75"
            >
              <div className="text-2xl">
                <MdPolicy />
              </div>
              <div className="w-3/4 text-sm text-primarycolors-black    text-left">
                Privacy Policy
              </div>
              <div className="text-xl">
                {" "}
                <NavLink to="privacy">
                  {" "}
                  <MdArrowForwardIos />
                </NavLink>
              </div>
            </NavLink>

            <NavLink
              to="/about"
              className="flex items-baseline justify-between px-3 text-primarycolors-textcolor/75"
            >
              <div className="text-2xl">
                <MdLabelOutline />
              </div>
              <div className="w-3/4 text-sm text-primarycolors-black    text-left">
                About Us
              </div>
              <div className="text-xl">
                {" "}
                <NavLink to="/about">
                  {" "}
                  <MdArrowForwardIos />
                </NavLink>
              </div>
            </NavLink>

            <NavLink
              to="/contact"
              className="flex items-baseline justify-between px-3 text-primarycolors-textcolor/75"
            >
              <div className="text-2xl">
                <MdContactPage />
              </div>
              <div className="w-3/4 text-sm text-primarycolors-black    text-left">
                Contact Us
              </div>
              <div className="text-xl">
                {" "}
                <NavLink to="/contact">
                  {" "}
                  <MdArrowForwardIos />
                </NavLink>
              </div>
            </NavLink>
          </div>
        </div>{" "}
        <Footer />
      </div>{" "}
    </>
  );
};

export default Menu;
