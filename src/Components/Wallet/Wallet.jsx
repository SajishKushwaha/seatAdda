import React, { useState } from "react";
import Navbar from "../Navigation";
import FooterDesktop from "../FooterDesktop";
import WalletSection from "./WalletSection";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CiCalendar, CiChat1, CiHome, CiWallet } from "react-icons/ci";
import { CgMenuGridO } from "react-icons/cg";
import Footer from "../Footer";
import Cookies from "js-cookie";
import LoginModal from "../LoginModal";
const Wallet = () => {
  const location = useLocation();
  const { pathname } = location;
  //Javascript split method to get the name of the path in array
  const path = pathname.split("/");
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(!isLoggedIn);
  const handleBackward = () => {
    navigate("/");
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const jwtToken = Cookies.get("jwt_token");

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
        {jwtToken ? (
          <div className="">
            <WalletSection />
          </div>
        ) : !jwtToken && isModalOpen ? (
          <div>
            <LoginModal
              setIsModalOpen={setIsModalOpen}
              onClose={handleCloseModal}
            />
          </div>
        ) : (
          <div className="my-5 text-primarycolors-white p-2 px-4 w-fit mx-auto rounded-md bg-primarycolors-red">
            <button onClick={() => setIsModalOpen(true)}>Login </button>
          </div>
        )}

        <div className="">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
