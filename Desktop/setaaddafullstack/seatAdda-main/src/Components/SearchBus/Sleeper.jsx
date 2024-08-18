import React, { useState, useEffect } from "react";
import { MdOutlineAirlineSeatIndividualSuite } from "react-icons/md";
import sleeper from "../../assets/sleeper.png";
import swal from "sweetalert";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { loginSuccess, logout } from "../../Redux/auth/action";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "../LoginModal";
import { Toaster, toast } from "react-hot-toast";
const Sleeper = ({
  available,
  seatType,
  seatNo,
  alreadyBookedSeats,
  handleSelectedSeats,
  selectedSeats,
  setSelectedSeats,
  setIsModalOpen,
}) => {
  var color;
  // console.log(available);
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div>
      <div className="">
        <button
          disabled={!available}
          onClick={handleSeatBooking}
          style={color}
          className="relative cursor-pointer m-1  flex items-center justify-center rounded-sm border-[1px] border-primarycolors-black  w-[63px] h-[27px]  "
        >
          <p className="text-center  align-middle text-xs">{seatNo}</p>

          <div className=" absolute right-[2px] w-[6px] h-[90%]  rounded-[1px] border-[1px] border-primarycolors-black"></div>
        </button>
      </div>
    </div>
  );
};

export default Sleeper;
// import React, { useState } from "react";
// import { MdOutlineAirlineSeatIndividualSuite } from "react-icons/md";
// import sleeper from "../../assets/sleeper.png";
// import swal from "sweetalert";
// import { useSelector } from "react-redux";
// import LoginModal from "../LoginModal";

// const Sleeper = ({
//   seatNo,
//   alreadyBookedSeats,
//   handleSelectedSeats,
//   selectedSeats,
//   setSelectedSeats,
//   setIsModalOpen,
// }) => {
//   var color;

//   if (selectedSeats.includes(seatNo)) {
//     color = { backgroundColor: "rgb(59 130 246)", color: "white" };
//   } else {
//     color = { backgroundColor: "rgb(226 232 240)" };
//   }

//   if (alreadyBookedSeats.includes(seatNo)) {
//     color = { backgroundColor: "rgb(254 202 202)", cursor: "not-allowed" };
//   }

//   const customerName = useSelector(
//     (state) => state.authReducer.currentCustomer
//   );

//   const handleSeatBooking = () => {
//     if (customerName === null) {
//       setSelectedSeats([]);
//       setIsModalOpen(true);
//     } else if (!alreadyBookedSeats.includes(seatNo)) {
//       handleSelectedSeats(seatNo);
//     }
//   };

//   return (
//     <td>
//       <div onClick={handleSeatBooking} style={color} className="relative cursor-pointer m-1 flex items-center justify-center rounded-sm border-[1px] border-primarycolors-black w-[50px] h-[24px]">
//         <p className="text-center align-middle text-xs">{seatNo}</p>
//         <div className="absolute right-[2px] w-[6px] h-[90%] rounded-[1px] border-[1px] border-primarycolors-black"></div>
//       </div>
//     </td>
//   );
// };

// export default Sleeper;
