import React from "react";
import { useState } from "react";
import ViewSeat from "./ViewSeat";

const BottomTabs = (props) => {
  const [showViewSeat, setshowViewSeat] = useState(false);
  const handleViewSeat = () => {
    setshowViewSeat(!showViewSeat);
  };
  const handleButtonClick = () => {
    props.setShowPopup((prevShowPopup) => !prevShowPopup);
  };
  const handleTabState = (value) => { };

  return (
    <>
      <div className="md:flex  justify-between items-center py-2">
        <div className="flex flex-wrap px-3 gap-x-3 text-primarycolors-textcolor">
          <div onClick={() => handleTabState(0)}>Amenities</div>
          <div>|</div>
          <div onClick={() => handleTabState(1)}>
            Boarding and Droping Points
          </div>
          <div>|</div>
          <div onClick={() => handleTabState(2)}>Reviews</div>
          <div>|</div>
          <div onClick={() => handleTabState(3)}>Booking Policies</div>
          <div>|</div>
        </div>
        <div className="my-3  flex  justify-center  md:my-0 md:-[2rem]  rounded-md ">

          <button className="py-1  px-2 bg-primarycolors-red  mx-3 text-primarycolors-white text-lg  rounded-md 
          " onClick={handleButtonClick}>Show Route</button>


         {/*  {props.seat_json && <button
            type="submit"
            onClick={handleViewSeat}
            className="py-1  px-2 bg-primarycolors-red  mx-3 text-primarycolors-white text-lg  rounded-md "
          >
            {!showViewSeat ? "View Seat" : "Hide seat"}
          </button>} */}



        </div>
      </div>
      {showViewSeat && <ViewSeat {...props} />}
    </>
  );
};

export default BottomTabs;
