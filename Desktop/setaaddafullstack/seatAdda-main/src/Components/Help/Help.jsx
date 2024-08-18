import React from "react";
import {

  FaQuestionCircle,
} from "react-icons/fa";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import chatbot from "../../assets/chat_bot.svg";
import support from "../../assets/active_support.svg";
import chat from "../../assets/undraw_begin_chat.svg";

// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react";

// Styles must use direct files imports
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import HelpCard from "./HelpCard";

import { BiChat } from "react-icons/bi";
import FooterDesktop from "../FooterDesktop";
import Footer from "../Footer";

const Help = () => {

  return (
    <div className=" h-full">
      <div className="fixed overflow-y-hidden z-10 w-full   flex items-center gap-4  text-primarycolors-white py-3 px-3 bg-primarycolors-textcolor">
        <div className="text-3xl">
          <FaQuestionCircle />
        </div>
        <div className="w-[75%] px-0 text-left text-xl  font-light mt-1 truncate">
          Get Help
        </div>
      </div>
      <div className="relative top-[4rem] ">
        <div className=" h-max  pt-4 px-4">
          <Swiper
            className=""
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{
              dynamicBullets: true,
            }}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={true}
          /*  onSlideChange={() => console.log('slide change')}
                 onSwiper={(swiper) => console.log(swiper)} */
          >
            <SwiperSlide>
              {" "}
              <HelpCard image={support} />{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <HelpCard image={chat} />{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <HelpCard image={chatbot} />{" "}
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="mb-[8rem] text-primarycolors-white text-lg my-[2rem] cursor-pointer  bg-primarycolors-red/90 hover:bg-primarycolors-red w-3/4 mx-auto flex items-center justify-center gap-2 p-3 rounded-md shadow-lg ">
          <BiChat className="text-2xl" /> <p> Chat With Us</p>
        </div>
      </div>


      <Footer />


    </div>
  );
};

export default Help;
