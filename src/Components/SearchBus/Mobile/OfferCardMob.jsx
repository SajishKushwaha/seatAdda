import React from "react";

const OfferCardMob = ({ image }) => {
  console.log(image);
  return (
    <div className="mx-auto   rounded-xl">
      <img className="w-full rounded-xl" src={image} alt="" />
    </div>
  );
};

export default OfferCardMob;
