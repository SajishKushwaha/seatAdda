import React from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";

const MobileSeat = ({
  seatNo,
  alreadyBookedSeats,
  handleSelectedSeats,
  selectedSeats,
  setSelectedSeats,
  setLoginModalOpen,
}) => {
  var color;

  // console.log(alreadyBookedSeats);
  if (selectedSeats.includes(seatNo)) {
    color = { backgroundColor: "rgb(59 130 246)" };
  } else {
    color = { backgroundColor: "rgb(226 232 240)" };
  }

  if (alreadyBookedSeats.includes(seatNo)) {
    color = { backgroundColor: "rgb(254 202 202)" };
  }
  const customerName = useSelector(
    (state) => state.authReducer.currentCustomer
  );
  const handleSeatBooking = () => {
    // console.log(customerName);
    if (customerName === null) {
      setSelectedSeats([]);
      setLoginModalOpen(true);
    } else if (!alreadyBookedSeats.includes(seatNo)) {
      handleSelectedSeats(seatNo);
    }
  };
  return (
    <div className="">
      <div
        onClick={handleSeatBooking}
        style={color}
        className="m-2 flex items-center justify-center rounded-sm border-[1px] border-primarycolors-black w-[25px] h-[25px]  "
      >
        <p className="text-center align-middle text-xs">{seatNo}</p>
      </div>
    </div>
  );
};

export default MobileSeat;
