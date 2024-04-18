import React from "react";
import AppImg from "../assets/Bus Stop-pana.svg";
import appstore from "../assets/app-store.png";
import googleplay from "../assets/google-play.png";
import star from "../assets/star.webp";
const AppBanner = () => {
  return (
    <div className="container text-left p-2 sm:p-5 mb-[5rem] sm:mb-[0rem] mx-auto">
      <div className="offer-section p-3 my-3 w-7/8 shadow-md font-light text-primarycolors-black ">
        <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-6">
          <div className="flex  flex-col items-center justify-between w-full  lg:flex-row">
            <div className="my-4 lg:px-5 lg:mt-0">
              <img
                className=" mx-auto w-full lg:w-[500px]"
                src={AppImg}
                alt=""
              />
            </div>{" "}
            <div className="mb-5 sm:mb-16 lg:mb-0 lg:max-w-xl lg:pr-2">
              <div className="max-w-xl mb-6 ">
                <h2 className="font-sans text-2xl font-semibold tracking-tight sm:text-3xl sm:leading-none max-w-lg mb-6">
                  Install Web App & Make Travel a Lot of Fun
                </h2>
                <p className="text-gray-700 text-base md:text-lg">
                  Our Bus Rental App is designed to provide you with the utmost
                  flexibility and transparency. No more hidden fees or
                  last-minute surprises our pricing is competitive and
                  straightforward.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-5">
                  <div className="border-l-4 px-5 border-l-primarycolors-red">
                    <h1 className="text-primarycolors-black font-semibold text-xl">
                      Get Notified
                    </h1>
                    <h4>When the bus starts and is about to reach you. </h4>
                  </div>
                  <div className="border-l-4 px-5 border-l-primarycolors-red">
                    <h1 className="text-primarycolors-black font-semibold text-xl">
                      Trusted by Thousands
                    </h1>
                    <h4>Over 1000 reviews from our customers. </h4>
                  </div>
                  <div className="border-l-4 px-5 border-l-primarycolors-red">
                    <h1 className="text-primarycolors-black font-semibold text-xl">
                      Lightning Fast
                    </h1>
                    <h4>Book in 30 seconds even on Low Network. </h4>
                  </div>
                  <div className="border-l-4 px-5 border-l-primarycolors-red">
                    <h1 className="text-primarycolors-black font-semibold text-xl">
                      Enjoy Other Stuff
                    </h1>
                    <h4>Games, offers, Free Rides and a lot more. </h4>
                  </div>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 lg:flex   mt-10 items-center justify-between">
                <div className="flex justify-start smaller-screen  items-center space-x-3">
                  {/*  <a
                    href="/"
                    className="w-32 transition duration-300 hover:shadow-lg"
                  >
                    <img
                      src={appstore}
                      className="object-cover object-top w-full h-auto mx-auto"
                      alt=""
                    />
                  </a> */}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.ashish_nitm.seatadda"
                    target="_blank"
                    className="w-32 transition duration-300 hover:shadow-lg"
                  >
                    <img
                      src={googleplay}
                      className="object-cover object-top w-full h-auto mx-auto"
                      alt=""
                    />
                  </a>
                </div>

                <div className="my-4 mx-auto smaller-screen sm:mx-0 sm:flex lg:block justify-center items-center lg:my-0">
                  <img className="h-fit" src={star} alt="" />
                  <div className="sm:mx-3 sm:px-5 lg:px-0 lg:mx-0">
                    <span className="font-bold">4.6/5 </span>based on 966
                    reviews
                  </div>
                  <div className="sm:mx-3 text-xs font-semibold sm:px-5 lg:px-0 lg:mx-0">
                    Trusted by 1000+ Travellers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBanner;
