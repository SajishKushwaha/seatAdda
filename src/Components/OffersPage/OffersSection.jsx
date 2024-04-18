import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import OfferCard from "./OfferCard";
import axios from "axios";

const OffersSection = () => {
  const url = "https://seatadda.co.in/api/offers-list";
  const [allOffers, setallOffers] = useState([]);

  const fetchInfo = async () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setallOffers(d));
  };
  // console.log(allOffers)
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="">
      <div className="p-2 mt-3 ">
        <h1 className="text-2xl  m-2 text-primarycolors-black font-semibold">
          Bus Booking Offers
        </h1>
        <h1 className="text-xl px-1 my-2 text-primarycolors-black  font-semibold">
          Exciting offers on Bus Booking Online
        </h1>
        <p className=" text-sm sm:text-base my-2 px-4">
          Get exciting bus booking offers across India on Web.Travellers can{" "}
          <span className=" text-primarycolors-skyblue">
            {" "}
            <NavLink to="/"> book bus tickets </NavLink>
          </span>{" "}
          quickly, easily and fast on Web. If you're looking for ways to
          save money on online bus booking offers today, simply use bus booking
          coupons on Web and avail great savings!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 sm:p-6 gap-5 ">
        {allOffers.map((offer, index) => {
          return <OfferCard key={index} offer={offer} />;
        })}
      </div>

      <div>
        <div className=" text-left border-[1px] border-primarycolors-gray m-3 rounded-lg p-5">
          <h1 className="font-semibold my-2 text-xl">Bus Ticket Offers</h1>

          <p className="my-2">
            Booking a bus ticket has never been more convenient, thanks to the
            plethora of online options available today. To get started, plan
            your trip by determining your travel dates and destination. The best
            way to book a bus ticket is through online booking website which
            provide a comprehensive list of bus services, schedules, and prices.
            Alternatively, you can visit the official website of the bus
            operator if you have a specific one in mind or are seeking exclusive
            deals. Before finalizing your booking, compare prices and read
            customer reviews to choose a service that aligns with your
            preferences.
          </p>

          <p className="my-2">
            Look out for discounts and offers to save on your ticket, and select
            your preferred seat for added comfort. Upon completing your booking,
            receive a confirmation email or SMS, and don't forget to arrive a
            bit early at the bus station with your ticket and identification in
            hand. Finally, after your journey, consider leaving a review to help
            other travelers make informed decisions. Booking a bus ticket has
            become a seamless process that ensures a comfortable and safe
            journey.
          </p>
        </div>

        <div className=" text-left border-[1px] border-primarycolors-gray m-3 rounded-lg p-5">
          <h1 className="font-semibold my-2 text-xl">
            Bus Ticket Booking Offers Online at Web
          </h1>

          <p className="my-2">
            Booking your bus tickets well in advance is a tried-and-true method
            for getting the lowest prices. Most online booking platforms offer
            attractive discounts for those who plan ahead. Therefore, as soon as
            your travel dates are confirmed, don't hesitate to make
            reservations. By doing so, you lock in a lower fare and ensure your
            seat on the bus.
            <br />
            Flexibility is another key to finding the best deals. If your
            schedule allows, consider adjusting your travel dates or opting for
            off-peak hours. Bus fares often fluctuate based on demand, so
            traveling during less popular times can yield significant savings.
            Additionally, consider mid-week or non-holiday travel, as prices
            tend to be lower on these days.
          </p>

          <p className="my-2">
            Furthermore, loyalty programs and memberships can provide access to
            special discounts. Check if you qualify for any loyalty programs
            with bus operators or if your credit card offers travel-related
            perks. These can lead to reduced ticket prices or cashback rewards,
            ultimately saving you money.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OffersSection;
