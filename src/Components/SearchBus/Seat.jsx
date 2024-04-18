import React from "react";
import { MdEventSeat, MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { useSelector } from "react-redux";
import swal from "sweetalert";
const Seat = ({
  seatNo,
  alreadyBookedSeats,
  handleSelectedSeats,
  selectedSeats,
  setSelectedSeats,
  setIsModalOpen
}) => {
  var color;

  if (selectedSeats.includes(seatNo)) {
    color = { backgroundColor: "rgb(59 130 246)",color:'white' };
} else {
    color = { backgroundColor: "rgb(226 232 240)" };
}

// if (alreadyBookedSeats.includes(seatNo)) {
//     color = { backgroundColor: "rgb(254 202 202)", cursor:'not-allowed' };
// }
const customerName = useSelector(
  (state) => state.authReducer.currentCustomer
);
  const handleSeatBooking = () => {
    // console.log(customerName);
    if (customerName === null) {
      setSelectedSeats([]);
      setIsModalOpen(true);
    } else {
      handleSelectedSeats(seatNo);
    }
  };
  return (
    <div>
      <div className="">
        <div
          onClick={handleSeatBooking}
          style={color}
          className="m-1 cursor-pointer flex items-center justify-center rounded-sm border-[1px] border-primarycolors-black w-[23px] h-[25px]  "
        >
          <p className="text-center align-middle text-xs">{seatNo}</p>
        </div>
      </div>
    </div>
    
  );
};

export default Seat;
