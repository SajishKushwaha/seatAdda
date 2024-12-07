import React from "react";

const OfferCard = ({ offer }) => {
  return (
    <div className="">
      <img className=" sm:w-full  " src={offer.offer_img} alt="" />
    </div>
  );
};

export default OfferCard;
