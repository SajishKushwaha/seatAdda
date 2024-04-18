import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTicketAlt, FaUserCircle } from "react-icons/fa";
import {
  MdArrowForwardIos,
  MdContactPage,
  MdFormatQuote,
  MdLabelOutline,
  MdLocalOffer,
  MdPolicy,
  MdTerminal,
} from "react-icons/md";
import { BiSolidCoupon } from "react-icons/bi";
import FooterDesktop from "../FooterDesktop";
import Footer from "../Footer";
import { useSelector } from "react-redux";

const Menu = () => {
  const navigate = useNavigate();
  const customerName = useSelector(
    (state) => state.authReducer.currentCustomer
  );
  const handleAccount = () => {
    if (customerName !== null) navigate("/account");
    else alert("Login Required");
  };

  return (
    <>
      <div className=" bg-primarycolors-bg_sky/50">
        <NavLink
          onClick={handleAccount}
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
            <NavLink onClick={handleAccount}>
              {" "}
              <MdArrowForwardIos />
            </NavLink>
          </div>
        </NavLink>
        <div className="overflow-y-auto  relative top-[6rem] mb-[10rem]">
          <div className=" bg-primarycolors-white rounded-lg shadow-md flex flex-col m-3 p-3 py-6 gap-5 border-[0.5px]  border-primarycolors-textcolor/30">
            <div className="flex items-baseline justify-between px-3 text-primarycolors-textcolor/75">
              <div className="text-2xl">
                <FaTicketAlt />
              </div>
              <div className="w-3/4 text-sm text-primarycolors-black   text-left">
                Cancel Booking
              </div>
              <div className="text-xl">
                {" "}
                <NavLink>
                  {" "}
                  <MdArrowForwardIos />
                </NavLink>
              </div>
            </div>
            <NavLink
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
            </NavLink>
          </div>

          <div className=" bg-primarycolors-white rounded-lg shadow-md flex flex-col m-3 p-3 gap-5 border-[0.5px]  border-primarycolors-textcolor/30">
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
                <NavLink>
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
                <NavLink>
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
                <NavLink>
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
                <NavLink>
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
                <NavLink>
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
