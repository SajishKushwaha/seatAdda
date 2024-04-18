import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateBookingDetails } from "../../../Redux/BookBus/action";
import { MdArrowBack, MdArrowForward, MdInfo } from "react-icons/md";
import MobileSleeper from "./MobileSleeper";
import { FaBus } from "react-icons/fa";
import MobileSeat from "./MobileSeat";
import BoardingAndDroppingModal from "./BoardingAndDroppingModal";
import LoginModal from "../../LoginModal";
import { BiArrowBack } from "react-icons/bi";
import Seat from "../Seat";
import Sleeper from "../Sleeper";

const ViewSeatMobile = () => {
  const Data = localStorage.getItem("busData");
  const busData = JSON.parse(Data);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState("");
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState("");

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    if (!isModalOpen) {
      document.body.classList.remove("modal-open");
    } else {
      document.body.classList.add("modal-open");
    }
  };

  const alreadyBookedSeats = busData.filledSeats;
  const boardingPoints = busData.routeDetails;
  const droppingPoints = busData.routeDetails;
  const seat_json = busData.seat_json;

  // console.log(routeDetails)
  let dispatch = useDispatch();

  const navigate = useNavigate();
  const handleBookSeat = () => {
    if (!selectedBoardingPoint || !selectedDroppingPoint) {
      alert("Select Boarding and Dropping Points");
    } else {
      const payload = {
        selectedSeats: selectedSeats,
        totalFare: selectedSeats.length * busData.seatPrice,
        boardPoint: selectedBoardingPoint,
        dropPoint: selectedDroppingPoint,
        From: busData.departure,
        To: busData.arrival,
        date: busData.date,
      };

      dispatch(updateBookingDetails(payload));

      navigate("/passenger-details");
    }
  };

  const [showUpperBerth, setShowUpperBerth] = useState(false);
  const [showLowerBerth, setShowLowerBerth] = useState(true);

  const toggleUpperBerth = () => {
    setShowUpperBerth((prev) => !prev);
    setShowLowerBerth((prev) => !prev);
  };

  const toggleLowerBerth = () => {
    setShowLowerBerth((prev) => !prev);
    setShowUpperBerth((prev) => !prev);
  };

  const handleSelectedSeats = (seatNo) => {
    if (selectedSeats.includes(seatNo)) {
      const arr = selectedSeats.filter((item) => item !== seatNo);
      setSelectedSeats(arr);
    } else {
      setSelectedSeats([...selectedSeats, seatNo]);
    }
  };
  const handleBackward = () => {
    navigate(-1);
  };

  const [LoginmodalOpen, setLoginModalOpen] = useState(false);
  const handleCloseModal = () => {
    setLoginModalOpen(false);
  };
  const totalFare = busData.seatPrice * selectedSeats.length;


  const renderSeating = () => {
    const totalRows = Object.keys(seat_json);

    let selectedRows;
    if (totalRows.length > 6) {
      const mid = Math.floor(totalRows.length / 2);
      selectedRows = showLowerBerth ? totalRows.slice(0, mid) : totalRows.slice(mid);
    } else {
      selectedRows = totalRows;
    }

    // Filter rows with non-empty seats
    const nonEmptyRows = selectedRows.filter(row => {
      const seats = seat_json[row];
      const seatValues = Object.values(seats);
      return seatValues.some(seat => seat !== ""); // Check if any seat is non-empty
    });

    return selectedRows.map(row => {
      const seats = seat_json[row];
      // console.log(seats);
      const seatValues = Object.values(seats);
      // console.log(seatValues)
      // Check if all seats in the row are empty
      const allSeatsEmpty = seatValues.every(seat => seat.seat === "");

      if (allSeatsEmpty) {
        return (
          <div key={row} style={{ width: '20px' }}>

          </div>
        );
      }


      const seatsToRender = [];
      for (let i = 0; i < seatValues.length; i++) {
        // console.log(seatValues[i]);

        let seat = seatValues[i].seat; // Access the 'seat' property
        // console.log(seat);

        // console.log(seatValues[i + 1]);

        if (seat === seatValues[i + 1]?.seat) {
          i++; // Skip the next seat as it's already combined
          seatsToRender.push({ type: 'DoubleSeat', value: seat });
        } else {
          seatsToRender.push({ type: 'Seat', value: seat });
        }
      }

      return (
        <div key={row} className="flex flex-col md:flex-row w-fit md:w-full justify-between">
          {seatsToRender.map((seat, index) => (
            <div key={index} className=" mx-auto">
              {seat.type === 'DoubleSeat' ? (
                <MobileSleeper
                  key={index}
                  seatNo={seat.value}
                  alreadyBookedSeats={alreadyBookedSeats}

                  handleSelectedSeats={handleSelectedSeats}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  setLoginModalOpen={setLoginModalOpen}
                />
              ) : (
                <MobileSeat
                  key={index}
                  seatNo={seat.value}
                  alreadyBookedSeats={alreadyBookedSeats}
                  handleSelectedSeats={handleSelectedSeats}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  setLoginModalOpen={setLoginModalOpen}
                />
              )}
            </div>
          ))}
        </div>
      );

    });
  };




  return (
    <>
      {LoginmodalOpen ? (
        <div>
          <LoginModal
            setIsModalOpen={setLoginModalOpen}
            onClose={handleCloseModal}
          />
          <div className="w-full bg-primarycolors-bg_sky h-[100vh] ">
            <div className=" bg-primarycolors-textcolor  px-3 py-2 text-primarycolors-gray grid grid-cols-4  items-center ">
              <div
                className="flex justify-start mr-[0px] "
                onClick={handleBackward}
              >
                <BiArrowBack className="text-3xl font-bold" />
                {/* <BiArrowBack /> */}
              </div>
              <div className=" col-span-2">
                <p className="text-l font-bold">
                  {busData.arrival} - {busData.departure}
                </p>
                <p className="text-sm uppercase font-semibold text-primarycolors-black">
                  {busData.operatorName}
                </p>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div>
          <div className="w-full bg-primarycolors-bg_sky h-[100vh] ">
            <div className=" bg-primarycolors-textcolor  px-3 py-2 text-primarycolors-gray grid grid-cols-4  items-center ">
              <div
                className="flex justify-start mr-[0px] "
                onClick={handleBackward}
              >
                <BiArrowBack className="text-3xl font-bold" />
                {/* <BiArrowBack /> */}
              </div>
              <div className=" col-span-2">
                <p className="text-l font-bold">
                  {busData.arrival} - {busData.departure}
                </p>
                <p className="text-sm uppercase font-semibold text-primarycolors-black">
                  {busData.operatorName}
                </p>
              </div>
            </div>
            <div className="mb-10 overflow-y-scroll h-[75vh] ">
              <div className=" my-2 gap-3 flex justify-center items-center">
                <button className="px-2 text-[12px] py-2 border-[1px] border-primarycolors-gray gap-2 flex justify-center items-center bg-primarycolors-white rounded-md">
                  <FaBus /> View Seats
                </button>
                <button className="px-2 py-2 text-[12px] gap-2 border-[1px] border-primarycolors-gray   flex justify-center items-center bg-primarycolors-white rounded-md">
                  <MdInfo className="" /> Cancellation Policy
                </button>
              </div>
              <div className="mx-auto">
                <div className=" rounded-md  border-primarycolors-textcolor">
                  <div className="flex  items-center h-[100%] mb-10 justify-center md:justify-between w-full">
                    {busData.busType == "Seater" ? (
                      <div className="my-3 w-[75%] p-3 mx-auto bg-primarycolors-white shadow-md rounded-md h-[65vh] overflow-y-auto justify-center   ">
                        <div className="flex pr-6 justify-end text-3xl items-center">
                          <svg
                            x="0px"
                            y="0px"
                            viewBox="0 0 24 24"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            className="svg-icon"
                          >
                            <g transform="matrix(0.022438, 0, 0, 0.022438, 0.781086, 0.781028)">
                              <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                                <path d="M4456.6,4992.6c-1186-146.8-2204.3-655.9-3009.9-1500.5C757.8,2770.3,335.5,1928.7,152.8,922.4c-68.9-392.3-71.9-1230.9,0-1617.3c128.8-715.8,437.3-1458.6,835.6-2021.6c242.6-344.4,829.6-934.4,1171-1174c937.4-661.9,2126.4-985.3,3234.6-883.5c694.8,65.9,1144.1,191.7,1773,497.2c518.1,254.5,853.6,497.1,1287.8,931.4c197.7,197.7,446.3,482.2,551.1,628.9C9221.6-2411,9539-1782,9652.8-1431.7c335.4,1009.3,329.4,2129.4-18,3141.7c-122.8,365.4-404.3,913.5-634.9,1239.9c-239.6,341.4-829.6,928.4-1174,1171c-560.1,395.3-1317.8,709.8-2006.6,832.6C5492.8,5010.5,4765,5031.5,4456.6,4992.6z M5585.7,4019.2c1233.9-182.7,2330.1-964.4,2914.1-2081.5l152.7-296.5H4998.7H1341.8l107.8,218.6c380.4,760.7,1000.3,1389.7,1755.1,1773C3947.4,4010.2,4762.1,4142,5585.7,4019.2z M5352,997.3c545.1-191.7,691.9-904.5,266.6-1290.8c-161.7-143.8-302.5-197.7-518.1-200.6c-212.6,0-356.4,53.9-518.1,203.7c-173.7,155.8-245.6,320.5-245.6,560.1C4336.8,805.6,4848.9,1174,5352,997.3z M1955.8,23.9c290.5-74.9,679.9-254.6,928.4-434.3c275.5-197.7,637.9-596,802.6-886.5c263.6-464.2,407.3-1078.2,365.4-1554.4c-21-239.6-119.8-703.8-164.7-775.7c-32.9-56.9-188.7-12-566,164.7c-425.3,200.7-760.7,437.3-1111.1,790.7c-622.9,620-994.3,1350.7-1123.1,2216.3c-24,155.7-44.9,350.4-44.9,431.3v146.8l338.4-18C1563.4,95.8,1824,59.9,1955.8,23.9z M8949-27c0-80.9-21-272.5-44.9-428.3c-128.8-865.6-500.2-1599.3-1123.1-2216.3c-353.4-353.4-691.8-593-1111.1-790.7c-425.3-197.7-404.3-197.7-461.2-12c-128.8,440.2-137.8,1132.1-18,1536.4c74.9,245.6,263.6,649.9,392.3,838.6c488.2,709.8,1371.7,1198,2195.3,1210l170.7,3V-27z"></path>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <div className="flex md:flex-col  justify-center md:justify-between mx-2 ">
                          <div className="flex flex-col  w-fit md:w-full p-2  justify-between">
                            {new Array(10).fill(0).map((item, index) => {
                              return (
                                <MobileSeat
                                  key={index}
                                  seatNo={index + 1}
                                  alreadyBookedSeats={alreadyBookedSeats}
                                  handleSelectedSeats={handleSelectedSeats}
                                  selectedSeats={selectedSeats}
                                  setSelectedSeats={setSelectedSeats}
                                  setLoginModalOpen={setLoginModalOpen}
                                />
                              );
                            })}
                          </div>
                          <div className="flex flex-col  w-fit md:w-full p-2  justify-between">
                            {new Array(10).fill(0).map((item, index) => {
                              return (
                                <MobileSeat
                                  key={index}
                                  seatNo={10 + index + 1}
                                  alreadyBookedSeats={alreadyBookedSeats}
                                  handleSelectedSeats={handleSelectedSeats}
                                  selectedSeats={selectedSeats}
                                  setSelectedSeats={setSelectedSeats}
                                  setLoginModalOpen={setLoginModalOpen}
                                />
                              );
                            })}
                          </div>
                          <div className="flex w-[30px] flex-col   md:w-full p-2  justify-between"></div>
                          <div className="flex flex-col  w-fit md:w-full p-2  justify-between ">
                            {new Array(10).fill(0).map((item, index) => {
                              return (
                                <MobileSeat
                                  key={index}
                                  seatNo={20 + index + 1}
                                  alreadyBookedSeats={alreadyBookedSeats}
                                  handleSelectedSeats={handleSelectedSeats}
                                  selectedSeats={selectedSeats}
                                  setSelectedSeats={setSelectedSeats}
                                  setLoginModalOpen={setLoginModalOpen}
                                />
                              );
                            })}
                          </div>
                          <div className="flex flex-col  w-fit md:w-full p-2  justify-between">
                            {new Array(10).fill(0).map((item, index) => {
                              return (
                                <MobileSeat
                                  key={index}
                                  seatNo={30 + index + 1}
                                  alreadyBookedSeats={alreadyBookedSeats}
                                  handleSelectedSeats={handleSelectedSeats}
                                  selectedSeats={selectedSeats}
                                  setSelectedSeats={setSelectedSeats}
                                  setLoginModalOpen={setLoginModalOpen}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full  ">
                        <div className=" ">
                          <div
                            className={`my-3 w-[75%] p-3 mx-auto bg-primarycolors-white shadow-md rounded-md h-[65vh] overflow-y-auto justify-center    ${showUpperBerth
                              ? " shadowseat"
                              : "shadowseatreverse"
                              }`}
                          >
                            <div className="sm:flex my-2  justify-center sm:m-4 space-x-2 sm:space-x-4">
                              <button
                                onClick={toggleLowerBerth}
                                className={`px-4 py-1  ${showLowerBerth
                                  ? "bg-primarycolors-red text-primarycolors-white"
                                  : "bg-primarycolors-textcolor/10"
                                  }  bg-blue-500 text-white rounded-md`}
                              >
                                {showLowerBerth ? "Lower" : "Lower"}
                              </button> <button
                                onClick={toggleUpperBerth}
                                className={`px-4 py-1  ${showUpperBerth
                                  ? "bg-primarycolors-red text-primarycolors-white"
                                  : "bg-primarycolors-textcolor/10"
                                  }  bg-blue-500 text-white rounded-md`}
                              >
                                {showUpperBerth ? "Upper " : " Upper"}
                              </button>

                            </div>{" "}

                            <div className="mt-5  flex pr-6 justify-end text-3xl items-center">
                              <svg
                                x="0px"
                                y="0px"
                                viewBox="0 0 24 24"
                                width="2rem"
                                height="2rem"
                                fill="currentColor"
                                className="svg-icon"
                              >
                                <g transform="matrix(0.022438, 0, 0, 0.022438, 0.781086, 0.781028)">
                                  <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                                    <path d="M4456.6,4992.6c-1186-146.8-2204.3-655.9-3009.9-1500.5C757.8,2770.3,335.5,1928.7,152.8,922.4c-68.9-392.3-71.9-1230.9,0-1617.3c128.8-715.8,437.3-1458.6,835.6-2021.6c242.6-344.4,829.6-934.4,1171-1174c937.4-661.9,2126.4-985.3,3234.6-883.5c694.8,65.9,1144.1,191.7,1773,497.2c518.1,254.5,853.6,497.1,1287.8,931.4c197.7,197.7,446.3,482.2,551.1,628.9C9221.6-2411,9539-1782,9652.8-1431.7c335.4,1009.3,329.4,2129.4-18,3141.7c-122.8,365.4-404.3,913.5-634.9,1239.9c-239.6,341.4-829.6,928.4-1174,1171c-560.1,395.3-1317.8,709.8-2006.6,832.6C5492.8,5010.5,4765,5031.5,4456.6,4992.6z M5585.7,4019.2c1233.9-182.7,2330.1-964.4,2914.1-2081.5l152.7-296.5H4998.7H1341.8l107.8,218.6c380.4,760.7,1000.3,1389.7,1755.1,1773C3947.4,4010.2,4762.1,4142,5585.7,4019.2z M5352,997.3c545.1-191.7,691.9-904.5,266.6-1290.8c-161.7-143.8-302.5-197.7-518.1-200.6c-212.6,0-356.4,53.9-518.1,203.7c-173.7,155.8-245.6,320.5-245.6,560.1C4336.8,805.6,4848.9,1174,5352,997.3z M1955.8,23.9c290.5-74.9,679.9-254.6,928.4-434.3c275.5-197.7,637.9-596,802.6-886.5c263.6-464.2,407.3-1078.2,365.4-1554.4c-21-239.6-119.8-703.8-164.7-775.7c-32.9-56.9-188.7-12-566,164.7c-425.3,200.7-760.7,437.3-1111.1,790.7c-622.9,620-994.3,1350.7-1123.1,2216.3c-24,155.7-44.9,350.4-44.9,431.3v146.8l338.4-18C1563.4,95.8,1824,59.9,1955.8,23.9z M8949-27c0-80.9-21-272.5-44.9-428.3c-128.8-865.6-500.2-1599.3-1123.1-2216.3c-353.4-353.4-691.8-593-1111.1-790.7c-425.3-197.7-404.3-197.7-461.2-12c-128.8,440.2-137.8,1132.1-18,1536.4c74.9,245.6,263.6,649.9,392.3,838.6c488.2,709.8,1371.7,1198,2195.3,1210l170.7,3V-27z"></path>
                                  </g>
                                </g>
                              </svg>
                            </div>



                            <div className="flex  flex-row-reverse  p-2 md:flex-col justify-evenly md:justify-between  ">

                              {renderSeating()}
                            </div>
                            {/* <div
                              className={`p-2 flex justify-center mb-5   ${showUpperBerth ? "" : "hidden"
                                }       `}
                            >
                              <div className="flex flex-col  w-fit md:w-full p-2  justify-between">
                                {" "}
                                {new Array(10).fill(0).map((item, index) => {
                                  return (
                                    <MobileSleeper
                                      key={index}
                                      seatNo={`U${index + 1}`}
                                      alreadyBookedSeats={alreadyBookedSeats}
                                      handleSelectedSeats={handleSelectedSeats}
                                      selectedSeats={selectedSeats}
                                      setSelectedSeats={setSelectedSeats}
                                      setLoginModalOpen={setLoginModalOpen}
                                    />
                                  );
                                })}
                              </div>
                              <div className="flex flex-col  w-[20px] md:w-full p-2 justify-between"></div>
                              <div className="flex flex-col  w-fit md:w-full p-2  justify-between">
                                {" "}
                                {new Array(10).fill(0).map((item, index) => {
                                  return (
                                    <MobileSleeper
                                      key={index}
                                      seatNo={`U${10 + index + 1}`}
                                      alreadyBookedSeats={alreadyBookedSeats}
                                      handleSelectedSeats={handleSelectedSeats}
                                      selectedSeats={selectedSeats}
                                      setSelectedSeats={setSelectedSeats}
                                      setLoginModalOpen={setLoginModalOpen}
                                    />
                                  );
                                })}
                              </div>{" "}
                              <div className="flex flex-col  w-fit md:w-full p-2 justify-between">
                                {" "}
                                {new Array(10).fill(0).map((item, index) => {
                                  return (
                                    <MobileSleeper
                                      key={index}
                                      seatNo={`U${20 + index + 1}`}
                                      alreadyBookedSeats={alreadyBookedSeats}
                                      handleSelectedSeats={handleSelectedSeats}
                                      selectedSeats={selectedSeats}
                                      setSelectedSeats={setSelectedSeats}
                                      setLoginModalOpen={setLoginModalOpen}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                            <div
                              className={`flex w-fit mx-auto mb-5  ${showLowerBerth ? "" : "hidden"
                                }`}
                            >
                              <div className="flex flex-col md:flex-row w-fit md:w-full p-2  justify-between">
                                {" "}
                                {new Array(10).fill(0).map((item, index) => {
                                  return (
                                    <MobileSleeper
                                      key={index}
                                      seatNo={`L${index + 1}`}
                                      alreadyBookedSeats={alreadyBookedSeats}
                                      handleSelectedSeats={handleSelectedSeats}
                                      selectedSeats={selectedSeats}
                                      setSelectedSeats={setSelectedSeats}
                                      setLoginModalOpen={setLoginModalOpen}
                                    />
                                  );
                                })}
                              </div>

                              <div className="flex flex-col w-[20px] md:flex-row  p-2 justify-between"></div>
                              <div className="flex flex-col md:flex-row w-fit md:w-full p-2  justify-between">
                                {" "}
                                {new Array(10).fill(0).map((item, index) => {
                                  return (
                                    <MobileSleeper
                                      key={index}
                                      seatNo={`L${10 + index + 1}`}
                                      alreadyBookedSeats={alreadyBookedSeats}
                                      handleSelectedSeats={handleSelectedSeats}
                                      selectedSeats={selectedSeats}
                                      setSelectedSeats={setSelectedSeats}
                                      setLoginModalOpen={setLoginModalOpen}
                                    />
                                  );
                                })}
                              </div>
                              <div className="flex flex-col md:flex-row w-fit md:w-full p-2  justify-between">
                                {" "}
                                {new Array(10).fill(0).map((item, index) => {
                                  return (
                                    <MobileSleeper
                                      key={index}
                                      seatNo={`L${20 + index + 1}`}
                                      alreadyBookedSeats={alreadyBookedSeats}
                                      handleSelectedSeats={handleSelectedSeats}
                                      selectedSeats={selectedSeats}
                                      setSelectedSeats={setSelectedSeats}
                                      setLoginModalOpen={setLoginModalOpen}
                                    />
                                  );
                                })}
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {selectedSeats.length > 0 && (
              <div className="fixed  w-full  bottom-0">
                <div className="flex gap-2 justify-between items-center  px-2 py-3  bg-primarycolors-white shadow-md border-t-[1px] border-primarycolors-gray rounded-t-md">
                  <div className="font-bold text-sm">
                    {selectedSeats.length} Seats | {selectedSeats.join(", ")}
                  </div>
                  <div className="font-bold text-lg">
                    {" "}
                    <span className="">&#8377;</span>
                    {totalFare}{" "}
                  </div>
                </div>{" "}
                <div
                  className="flex w-full gap-2 items-center justify-between px-2 py-3 text-base bg-primarycolors-red text-primarycolors-white font-sans font-semibold"
                  onClick={toggleModal}
                >
                  <p> Select Boarding and Dropping Point</p>
                  <MdArrowForward className="text-3xl font-extrabold" />
                </div>
              </div>
            )}
          </div>
          {isModalOpen && (
            <BoardingAndDroppingModal
              busData={busData}
              selectedSeats={selectedSeats}
              isOpen={isModalOpen}
              toggleModal={toggleModal}
              boardingPoints={boardingPoints}
              droppingPoints={droppingPoints}
              selectedBoardingPoint={selectedBoardingPoint}
              setSelectedBoardingPoint={setSelectedBoardingPoint}
              selectedDroppingPoint={selectedDroppingPoint}
              setSelectedDroppingPoint={setSelectedDroppingPoint}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ViewSeatMobile;
