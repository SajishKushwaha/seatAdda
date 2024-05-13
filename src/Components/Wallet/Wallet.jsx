import React from "react";
import Navbar from "../Navigation";
import FooterDesktop from "../FooterDesktop";
import WalletSection from "./WalletSection";

import { BiArrowBack } from "react-icons/bi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CiCalendar, CiChat1, CiHome, CiWallet } from "react-icons/ci";
import { CgMenuGridO } from "react-icons/cg";
import Footer from "../Footer";

const Wallet = () => {
  const location = useLocation();
  const { pathname } = location;
  //Javascript split method to get the name of the path in array
  const path = pathname.split("/");
  const navigate = useNavigate();
  const handleBackward = () => {
    navigate("/");
  };
  return (
    <div className="">
      <div className="hidden md:block ">
        <Navbar />
      </div>
      <div className="md:hidden block">
        <div className="fixed shadow-xl border-b-[1px] border-primarycolors-gray overflow-y-hidden top-0   z-10 w-full  flex items-center gap-4  text-primarycolors-white py-3 px-2 bg-primarycolors-textcolor">
          <div className="text-3xl font-normal" onClick={handleBackward}>
            <BiArrowBack />
          </div>
          <div className=" px-0 text-left text-xl mt-1  font-light  ">
            Web Wallet
          </div>
        </div>
      </div>
      <div className="relative top-[3rem] md:top-0">
        <div className="">
          <WalletSection />
        </div>

        <div className="">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
