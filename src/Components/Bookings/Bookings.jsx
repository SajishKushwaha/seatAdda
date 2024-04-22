import React, { useState } from "react";
import Navbar from "../Navigation";
import FooterDesktop from "../FooterDesktop";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import BookingSection from "./BookingSection";
import "./book.css";
import Footer from "../Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import LoginModal from "../LoginModal";
import { Toaster } from "react-hot-toast";

const Bookings = () => {
  const location = useLocation();
  const { pathname } = location;
  //Javascript split method to get the name of the path in array
  const path = pathname.split("/");
  // console.log(path)
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(!isLoggedIn); // Open modal initially if not logged in

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBackward = () => {
    navigate("/");
  };
  return (
    <div>
      <>
        {" "}
        <div>
          {" "}
          <div className="hidden md:block">
            <Navbar />
          </div>
          <div className="md:hidden block">
            <div className="fixed  border-b-[1px] border-primarycolors-gray  overflow-y-hidden top-0   z-10 w-full  flex items-center gap-4  text-primarycolors-white py-3 px-2 bg-primarycolors-textcolor">
              <div className="text-3xl font-normal" onClick={handleBackward}>
                <BiArrowBack className="font-light" />
              </div>
              <div className=" px-0 text-left text-xl mt-1 font-light ">
                Bookings
              </div>
            </div>
          </div>
        </div>
        <div className="relative  top-[3rem] md:top-0">
          {/* <Toaster/> */}
          {isLoggedIn ? (
            <div className="">
              <BookingSection />
            </div>
          ) : !isLoggedIn && isModalOpen ? (
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
      </>
    </div>
  );
};

export default Bookings;
