import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react";
import OfferCardMob from "../Components/SearchBus/Mobile/OfferCardMob";
// Styles must use direct files imports

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { useSelector, useDispatch } from "react-redux";
import headerbg from "../assets/headerbg.webp";
import OfferCard from "./OfferCard";
import { NavLink } from "react-router-dom";
const OffersSection = () => {
  const url = "https://seatadda.co.in/api/offers-list";
  const [allOffers, setallOffers] = useState([]);
  const isLoading = useSelector((state) => state.busDetailsReducer.isLoading);
  const isError = useSelector((state) => state.busDetailsReducer.isError);
  const isSuccess = useSelector((state) => state.busDetailsReducer.isSuccess);
  const fetchInfo = async () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setallOffers(d));
  };
  console.log(allOffers);
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      <div className="container mx-auto p-5">
        <div className="offer-section p-3 my-3 w-7/8 mx-auto shadow-md ">
          <div className="flex p-2 justify-between mx-auto md:mx-0">
            <div className="">
              <h1 className="text-2xl font-semibold">Web Offers</h1>
            </div>

            <div className="">
              {/* <div className="mx-3 text-sm md:text-lg">
              {" "}
              <button className="p-1 md:p-2 px-1 md:px-4 hover:bg-primarycolors-gray/50 text-primarycolors-red  rounded-lg">
                All Offers
              </button>
            </div>
            <div className="mx-3 text-sm md:text-lg">
              {" "}
              <button className="p-1 md:p-2 px-1 md:px-4 hover:bg-primarycolors-gray/50 text-primarycolors-red  rounded-lg">
                Bus Offers
              </button>
            </div> */}

              <NavLink to="/offers" className="mx-3 text-sm md:text-lg">
                <button className=" p-1 md:p-2 px-3 md:px-4 bg-primarycolors-red text-primarycolors-white rounded-lg">
                  View All
                </button>
              </NavLink>
            </div>
          </div>
          <div>
            <div className=" md:hidden pt-4 px-4 z-0">
              <Swiper
                className=""
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1.5}
                autoplay={true}
              >
                <SwiperSlide>
                  {" "}
                  <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
                </SwiperSlide>

                <SwiperSlide>
                  {" "}
                  <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="hidden md:block   pt-4 px-2 z-0">
              <Swiper
                className=" "
                style={{ zIndex: true ? -1 : 1 }}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={3}
                autoplay={true}
              >
                <SwiperSlide>
                  {" "}
                  <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
                </SwiperSlide>

                <SwiperSlide>
                  {" "}
                  <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="slider m-3 ">
            <Swiper
              style={{ zIndex: true ? -1 : 1 }}
              className=""
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={3}
              breakpoints={{
                300: {
                  width: 300,
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  width: 768,
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
              }}
              autoplay={true}
              /*  onSlideChange={() => console.log('slide change')}
                     onSwiper={(swiper) => console.log(swiper)} */
            >
              {allOffers.map((offer, index) => {
                return (
                  <SwiperSlide key={index}>
                    <OfferCard offer={offer} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersSection;
