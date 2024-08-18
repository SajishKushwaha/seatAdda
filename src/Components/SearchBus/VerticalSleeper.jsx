import React, { useState } from "react";
import { MdOutlineAirlineSeatIndividualSuite } from "react-icons/md";
import sleeper from "../../assets/sleeper.png";
import swal from "sweetalert";
import "./index.css";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import LoginModal from "../LoginModal";
const VerticalSleeper = ({
  available,
  seatNo,
  alreadyBookedSeats,
  handleSelectedSeats,
  selectedSeats,
  setSelectedSeats,
  setIsModalOpen,
  seatType,
}) => {
  var color;

  if (!available) {
    color = { backgroundColor: "red", color: "white" };
  } else if (selectedSeats.includes(seatNo)) {
    // color = { backgroundColor: "rgb(59 130 246)",color:'white' };
    color = { backgroundColor: "rgb(59 130 246 )", color: "white" };
  } else {
    color = { backgroundColor: "#DEDEDE" };
  }

  if (alreadyBookedSeats.includes(seatNo)) {
    color = { backgroundColor: "rgb(254 202 202)", cursor: "not-allowed" };
  }
  const customerName = useSelector(
    (state) => state.authReducer.currentCustomer
  );
  const jwtToken = Cookies.get("jwt_token");
  const handleSeatBooking = () => {
    if (jwtToken === undefined) {
      setSelectedSeats([]);
      setIsModalOpen(true);
    } else if (!alreadyBookedSeats.includes(seatNo)) {
      handleSelectedSeats(seatNo, seatType);
    }
  };
  return (
    <div className="relative">
      <button
        disabled={!available}
        onClick={handleSeatBooking}
        style={color}
        className="cursor-pointer flex flex-row items-center mt-n5 justify-center rounded-sm border-[1px] w-[25px] h-[59px] "
      >
        <div className="absolute top-0 right-[2px] w-[20px] h-[10%] rounded-[1px] border-[1px] border-primarycolors-black"></div>
        <div className="border-dotted flex-grow">
          {" "}
          {/* Added flex-grow to make this div fill the remaining space */}
          <p className="text-center align-middle text-xs">{seatNo}</p>
        </div>
      </button>
    </div>
  );
};

export default VerticalSleeper;
