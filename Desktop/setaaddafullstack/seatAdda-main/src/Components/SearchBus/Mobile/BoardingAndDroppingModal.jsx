import React, { useEffect, useState } from "react";
import { updateBookingDetails } from "../../../Redux/BookBus/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FaChevronCircleRight } from "react-icons/fa";

const BoardingAndDroppingModal = ({
  selectedSeats,
  busData,
  isOpen,
  toggleModal,
  boardingPoints,
  droppingPoints,
  selectedBoardingPoint,
  setSelectedBoardingPoint,
  selectedDroppingPoint,
  setSelectedDroppingPoint,
}) => {
  const [pointActive, setPointActive] = useState(true);

  //get boarding and destination point
  const [boardPoint, setBoardPoint] = useState("");
  const [destPoint, setDestPoint] = useState("");
  const [continueDisabled, setContinueDisabled] = useState(true); // To disable the "Continue" button

  // useEffect to enable the "Continue" button when both boarding and dropping points are selected
  useEffect(() => {
    if (boardPoint && destPoint) {
      setContinueDisabled(false);
    } else {
      setContinueDisabled(true);
    }
  }, [boardPoint, destPoint]);
  var boardingStyle, droppingStyle;

  const activeStyle = {
    borderBottom: "3px solid red",
    fontWeight: "bold",
    /*   transition:' 0.2s ease-in-out' */
  };

  const inactiveStyle = {
    borderBottom: "0px",
  };

  if (pointActive === false) {
    droppingStyle = activeStyle;
    boardingStyle = inactiveStyle;
  } else {
    droppingStyle = inactiveStyle;
    boardingStyle = activeStyle;
  }
  const handleBoardChange = (e) => {
    setBoardPoint(e.target.value);
    setPointActive(false); // Move to dropping points section after selecting boarding point
  };

  const handleDestChange = (e) => {
    setDestPoint(e.target.value);
    // console.log(destPoint)
  };

  let dispatch = useDispatch();

  const navigate = useNavigate();
  const handleBookSeat = () => {
    const payload = {
      selectedSeats: selectedSeats,
      totalFare: selectedSeats.length * busData.seatPrice,
      boardPoint: boardPoint,
      dropPoint: destPoint,
      From: busData.departure,
      To: busData.arrival,
      date: busData.date,
    };

    dispatch(updateBookingDetails(payload));

    navigate("/passenger-details");
  };
  return (
    <div className="drop-container fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
      <div className="drop-content  w-[95%]  flex items-center justify-center modal overflow-x-hidden overflow-y-auto relative outline-none focus:outline-none">
        <div className=" rounded-md  relative overflow-y-auto  w-[100%] h-[300px] ">
          {/* Tab Buttons */}

          <div className="fixed p-2  w-[95%] rounded-md rounded-b-none bg-primarycolors-gray z-[10] flex justify-between  gap-4">
            <div
              className="w-1/2  text-[14px] cursor-pointer"
              onClick={() => setPointActive(true)}
              style={pointActive ? activeStyle : inactiveStyle}
            >
              BOARDING POINT
            </div>
            <div
              className="w-1/2 text-[14px] cursor-pointer"
              onClick={() => setPointActive(false)}
              style={!pointActive ? activeStyle : inactiveStyle}
            >
              DROPPING POINT
            </div>
          </div>

          {/* Boarding Points List */}
          <div
            className={`${pointActive ? "block" : "hidden"
              } w-full h-full  relative top-10`}
            key="boardingContainer"
            onChange={handleBoardChange}
          >
            {boardingPoints.map((item) => {
              return (
                <div
                  className="p-2 flex  justify-start gap-10 items-center"
                  key={item.boading_points}
                >
                  <div
                    className=" flex "
                    style={{
                      fontSize: "15px",
                      color: "#4a4a4a",
                      fontWeight: "700",
                    }}
                  >
                    <input
                      className=""
                      type="radio"
                      id={item.boading_points}
                      name="board-address"
                      value={item.boading_points}
                    />
                    &nbsp;&nbsp; {item.time}
                  </div>
                  <div>
                    <div
                      className="font-bold"
                      style={{ fontSize: "15px", color: "#3e3e52" }}
                    >
                      {item.boading_points}
                    </div>
                    <div className=" text-left" style={{ fontSize: "12px", color: "#7e7e8c" }}>
                      {item.city}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dropping Points List */}
          <div
            className={`${!pointActive ? "block" : "hidden"
              } w-full h-full   relative top-10`}
            key="destinationContainer"
            onChange={handleDestChange}
          >
            {droppingPoints.map((item) => {
              return (
                <div
                  className="p-2 flex justify-start gap-10 items-center"
                  key={item.boading_points}
                >
                  <div
                    className=" flex"
                    style={{
                      fontSize: "15px",
                      color: "#4a4a4a",
                      fontWeight: "700",
                    }}
                  >
                    <input
                      type="radio"
                      id={item}
                      name="dest-address"
                      value={item.boading_points}
                    />
                    &nbsp;&nbsp; {item.time}
                  </div>
                  <div>
                    <div
                      className="font-bold"
                      style={{ fontSize: "15px", color: "#3e3e52" }}
                    >
                      {item.boading_points}
                    </div>
                    <div className=" text-left" style={{ fontSize: "12px", color: "#7e7e8c" }}>
                      {item.city}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Buttons at the bottom */}
          <div className="flex justify-between gap-4 p-4 fixed bottom-2 left-4 right-4">
            <button
              className="flex items-center rounded-md shadow-md justify-evenly gap-2 text-base bg-primarycolors-textcolor w-fit  px-4 py-1 text-primarycolors-white mr-4"
              onClick={toggleModal}
            >
              <MdClose /> Close
            </button>
            <button
              className={`${continueDisabled
                ? "bg-primarycolors-textcolor cursor-not-allowed"
                : "bg-primarycolors-red"
                } px-4 py-2 text-base w-fit rounded-md shadow-md flex items-center justify-evenly gap-2 text-primarycolors-white`}
              onClick={handleBookSeat}
              disabled={continueDisabled}
            >
              Continue <FaChevronCircleRight className="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingAndDroppingModal;
