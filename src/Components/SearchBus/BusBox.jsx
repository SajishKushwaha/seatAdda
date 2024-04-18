import React, { useEffect, useState } from "react";
import { BiUser, BiXCircle } from "react-icons/bi";

import BottomTabs from "./BottomTabs";
import { MdOutlinePeopleOutline, MdStar } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import ViewSeat from "./ViewSeat";
import { useNavigate } from "react-router-dom";
import RouteTable from "./RouteTable";
import { FaLocationCrosshairs } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

const BusBox = ({
  uniqueId,
  service_name,
  travels_name,
  reg_no,
  fare,
  bus_name,
  vehicle_make,
  other_info,
  seat_type,
  bus_type_ac,
  booked_seat,
  seat_json,
  via_route,
  busType,
  arrivalTime,
  departureTime,
  totalSeats,
  filledSeats,
  routes,
  liveTracking,
  date,
  departure,
  arrival,
  setIsModalOpen,
}) => {
  const dateObject = new Date(date);
  // console.log(seat_json);
  const navigate = useNavigate();
  // Get the individual components of the date
  const month = dateObject.toLocaleString("default", { month: "long" });
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();

  // Format the date in the desired format: "July 26 2023"
  const formattedDate = `${day} ${month} `;
  const [showViewSeat, setshowViewSeat] = useState(false);

  const busData = {
    totalSeats: totalSeats,
    filledSeats: booked_seat,
    seatPrice: fare,
    routeDetails: via_route,
    busType: busType,
    busId: uniqueId,
    busArrivalTime: arrivalTime,
    busDepartureTime: departureTime,
    operatorName: service_name,
    departure: departure,
    arrival: arrival,
    seat_json: seat_json,
    date: formattedDate,

    // Add other data properties as needed
  };
  const [showPopup, setShowPopup] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  // const [feedback, setFeedback] = useState("");
  const [showBoardingDropdown, setShowBoardingDropdown] = useState(false);
  const [showCancellationDropdown, setShowCancellationDropdown] =
    useState(false);
  const [showTravelPolicyDropdown, setShowTravelPolicyDropdown] =
    useState(false);

  const [formState, setFormState] = useState({
    formType: "feedback",
    errorType: null,
    feedback: "",
    email: "",
    mobile: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleButtonClick = () => {
    setShowPopup(!showPopup);
  };
  const handleViewSeat = () => {
    setshowViewSeat(!showViewSeat);
  };

  const handleview = () => {
    localStorage.setItem("busData", JSON.stringify(busData));
    navigate("/select-seat");
  };

  const handleBoardingDropdownClick = () => {
    // console.log(via_route);
    if (showCancellationDropdown === true) {
      setShowCancellationDropdown(false);
    }
    if (showTravelPolicyDropdown === true) {
      setShowTravelPolicyDropdown(false);
    }
    setShowBoardingDropdown(!showBoardingDropdown);
  };

  const handleCancellationDropdownClick = () => {
    if (showBoardingDropdown === true) {
      setShowBoardingDropdown(false);
    }
    if (showTravelPolicyDropdown === true) {
      setShowTravelPolicyDropdown(false);
    }
    setShowCancellationDropdown(!showCancellationDropdown);
  };

  const handleTravelPolicyDropdownClick = () => {
    if (showBoardingDropdown === true) {
      setShowBoardingDropdown(false);
    }
    if (showCancellationDropdown === true) {
      setShowCancellationDropdown(false);
    }
    setShowTravelPolicyDropdown(!showTravelPolicyDropdown);
  };

  const handleFeedback = async () => {
    // console.log(formState);
    try {
      // Assuming you have an API endpoint for handling feedback
      const formData = new FormData();
      formData.append("source", departure);
      formData.append("destination", arrival);
      formData.append("date", date);
      formData.append("travels_name", travels_name);
      formData.append("uniqueId", uniqueId);
      formData.append("form_type", formState.formType);
      formData.append(
        "error_type",
        formState.errorType != null ? formState.errorType : "no"
      ); // If errorType is null, append an empty string
      formData.append("feedback", formState.feedback);
      formData.append("email", formState.email);
      formData.append("mobile", formState.mobile);

      // console.log(formData);
      const response = await axios.post(
        "https://seatadda.co.in/api/feedback",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(response.data);
      if (response.data.status === true) {
        toast.success(response.data.message);
      } else {
        // console.log(response.data.message);
        toast.error(response.data.message);
      }
      setShowFeedbackModal(false);
      setFormState((prevFormState) => ({
        ...prevFormState,
        feedback: "",
        formType: "feedback",
        errorType: null,
        email: "",
        mobile: "",
      }));
    } catch (error) {
      setShowFeedbackModal(false);

      setFormState((prevFormState) => ({
        ...prevFormState,
        feedback: "",
        formType: "feedback",
        errorType: null,
        email: "",
        mobile: "",
      }));

      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showPopup]);

  // Function to remove seconds from a time string
  function removeSeconds(timeString) {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  }

  const formatDate = (inputDate) => {
    /*  const date = new Date(inputDate);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const newDate = date.toLocaleDateString("en-US", options).replace(",", " ");

    const [month, day] = newDate.split(" ");
    return `${day} ${month}`; */

    const [year, month, day] = inputDate.split("-");
    return `${day}-${month}-${year}`;
  };
  const sourceTime =
    via_route && via_route.length > 0 ? removeSeconds(via_route[0].time) : null;
  const destinationTime =
    via_route && via_route.length > 0
      ? removeSeconds(via_route[via_route.length - 1].time)
      : null;
  const sourceDate =
    via_route && via_route.length > 0 ? via_route[0].date : null;
  const destinationDate =
    via_route && via_route.length > 0
      ? via_route[via_route.length - 1].date
      : null;

  const parseTime = (time) => {
    const [timePart, ampm] = time.split(" ");
    const [hours, minutes] = timePart.split(":").map(Number);
    let hour = hours;
    if (ampm === "PM" && hour !== 12) {
      hour += 12;
    } else if (ampm === "AM" && hour === 12) {
      hour = 0;
    }
    return { hour, minutes };
  };

  const parseDateTime = (date, time) => {
    const { hour, minutes } = parseTime(time);
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day, hour, minutes);
  };

  const startTime = parseDateTime(sourceDate, sourceTime);
  let endTime = parseDateTime(destinationDate, destinationTime);

  if (endTime < startTime) {
    endTime = new Date(endTime.getTime() + 24 * 60 * 60 * 1000); // Add a day
  }

  const timeDiff = endTime - startTime;

  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  const totalTime = `${hours} hour ${minutes} minutes`;
  // console.log(totalTime);

  return (
    <>
      {/*  <div className="hidden   md:block p-2">
        <div className="p-2 w-full hover:shadow-xl rounded-md border-[1px] border-primarycolors-textcolor/30 hover:scale-[1.01] bg-primarycolors-white transition-all">
          <div>
            <div className=" md:flex w-full justify-between">
              <div className="p-3 w-full">
                <div className="flex justify-center sm:justify-start ">
                  <h1 className="font-bold text-xl uppercase mr-4">
                    {travels_name}
                  </h1>
                  <button className="bg-primarycolors-btncolor px-2  rounded-md justify-center flex items-center">
                    <MdStar className="text-primarycolors-white" />{" "}
                    <span className="text-primarycolors-white">4.2</span>
                  </button>
                </div>
                <div className="flex flex-wrap justify-between items-center my-3 md:w-1/2">
                  <p className="text-sm text-primarycolors-textcolor">
                    {bus_type_ac === "0" ? "Non-AC" : "AC"}

                    {seat_type ? `(${seat_type})` : ""}
                  </p>
                  |
                  <p className="text-sm text-primarycolors-textcolor">
                   
                    20 Seats Left
                  </p>{" "}
                  |
                  <p className="text-sm text-primarycolors-textcolor">
                  
                    Window Seats
                  </p>
                </div>

                {via_route.length > 0 && (
                  <div>
                    <div className="flex flex-col md:flex-row sm:gap-4 gap-1">
                      <h1 className="sm:text-lg text-sm font-semibold self-center ">
                        
                        {via_route.length > 0 && (
                          <>
                            {sourceTime} , {formattedDate}
                          </>
                        )}
                      </h1>
                      <span className="hidden md:block"> ---</span>
                      <h1 className="sm:text-l text-[14px]  self-center text-slate-500">
                        <span className="inline md:hidden"> --- </span>{" "}
                        {`${hours}h ${minutes}m`}
                        <span className="inline md:hidden"> ---</span>
                      </h1>
                      <span className="hidden md:block"> ---</span>
                      <h1 className="sm:text-lg text-sm font-semibold self-center text-slate-700">
                        {via_route.length > 0 && (
                          <>
                            {destinationTime} , {formattedDate}
                          </>
                        )}
                      </h1>
                    </div>
                  </div>
                )}
              </div>
              <div className=" md:w-1/4 rounded-md  bg-primarycolors-textcolor/20 md:bg-primarycolors-textcolor/0 p-3 md:border-l-[2px] border-primarycolors-textcolor/30 my-2">
                <p className="text-sm ">Trip Cost</p>
                <div className="p-2">
                  <p className="text-l text-primarycolors-textcolor">
                    Starting From
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    <span className="">&#8377;</span>
                    {fare}
                  </p>
                </div>
              </div>
            </div>

            <div className=" border-t-[2px] border-primarycolors-textcolor/30">
              <BottomTabs
                totalSeats={totalSeats}
                booked_seat={booked_seat}
                seatPrice={fare}
                routeDetails={via_route}
                busType={busType}
                bus_schedule_id={bus_schedule_id}
                seat_json={seat_json}
                busArrivalTime={arrivalTime}
                busDepartureTime={departureTime}
                service_name={service_name}
                departure={departure}
                arrival={arrival}
                date={formattedDate}
                setIsModalOpen={setIsModalOpen}
                setShowPopup={setShowPopup}
                handleButtonClick={handleButtonClick}
              />
            </div>
          </div>
        </div>
        {showPopup && (
          <div className="modal-container">
            <div className="modal-content flex items-center   justify-center  w-full  overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
              <div className=" sm:p-4 md:p-0   w-full max-w-[30rem] ">
                <div className="m-2 sm:mt-10 bg-primarycolors-white rounded-lg relative ">
                  <RouteTable routes={via_route} setShowPopup={setShowPopup} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div> */}

      <div className="hidden   md:block p-2">
        <div className=" bg-primarycolors-white rounded-md  hover:shadow-md">
          <div className=" flex justify-between">
            <div className="w-full">
              <div className=" border-b-[0.5px] border-primarycolors-gray">
                <div className=" p-4 flex gap-4 justify-between">
                  <div className=" w-[200px]">
                    <h1 className="font-bold text-md text-left ">
                      {travels_name}
                    </h1>
                    <p className="text-sm text-left text-primarycolors-textcolor">
                      {bus_type_ac === "0" && "Non-AC "}
                      {bus_type_ac === "1" && "AC "}
                      {seat_type ? `${seat_type}` : ""}
                    </p>
                    <p className="text-[12px]  text-left text-primarycolors-textcolor">
                      Bus No: {reg_no}
                    </p>
                  </div>
                  <div className=" flex gap-5 justify-between items-center pr-2">
                    <div className="text-left w-[150px]">
                      {via_route.length > 0 && (
                        <>
                          {sourceDate != null && (
                            <p className="  text-[12px]">{formatDate(sourceDate)}</p>
                          )}

                          
                          <p className=" font-bold">{sourceTime}</p>
                          <p className="text-[12px]">{departure}</p>
                        </>
                      )}
                    </div>
                    <div>
                      {via_route.length > 0 && (
                        <>
                          {" "}
                          ---
                          <button className=" border-[0.25px] text-[12px] border-primarycolors-gray mx-2 px-1 rounded-md">
                            {`${hours}:${minutes} Hrs`}
                          </button>
                          ---
                        </>
                      )}
                    </div>
                    <div className=" w-[150px] text-right">
                      {via_route.length > 0 && (
                        <>
                          {destinationDate != null && (
                            <p className="  text-[12px]">
                              {formatDate(destinationDate)}
                            </p>
                          )}
                         
                          <p className=" font-bold">{destinationTime}</p>
                          <p className="text-[12px]">{arrival}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" flex items-center gap-3">
                  <div className=" w-fit m-2 rounded-md  border-[1px] flex  border-primarycolors-red">
                    <button className="text-primarycolors-white p-1 rounded-l-md text-xs  bg-primarycolors-red flex items-center">
                      <MdStar className="text-sm" />
                      2.1
                    </button>
                    <button className="flex px-2 items-center text-xs">
                      <BiUser className="text-sm" />
                      1k
                    </button>
                  </div>
                  <div className=" flex items-center gap-1">
                    <FaLocationCrosshairs />{" "}
                    <p className=" text-xs">Live Tracking</p>
                  </div>
                </div>
              </div>

              <div className=" text-sm flex justify-start gap-3 p-1 items-center">
                <button
                  className={` p-1 ${
                    showBoardingDropdown
                      ? "text-primarycolors-red"
                      : "hover:text-primarycolors-red"
                  }`}
                  onClick={handleBoardingDropdownClick}
                >
                  {" "}
                  Boarding & Dropping Points{" "}
                  {showBoardingDropdown ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}{" "}
                </button>

                 <div className=" text-primarycolors-gray">|</div>
                <button
                  onClick={handleCancellationDropdownClick}
                  className={` p-1 ${
                    showCancellationDropdown
                      ? "text-primarycolors-red"
                      : "hover:text-primarycolors-red"
                  }`}
                >
                  Cancelation Policy{" "}
                  {showCancellationDropdown ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
                <div className=" text-primarycolors-gray">|</div>
                <button
                  onClick={handleTravelPolicyDropdownClick}
                  className={` p-1 ${
                    showTravelPolicyDropdown
                      ? "text-primarycolors-red"
                      : "hover:text-primarycolors-red"
                  }`}
                >
                  {" "}
                  Travel Policy{" "}
                  {showTravelPolicyDropdown ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
              </div>
            </div>
            <div className=" border-l-[0.5px] border-primarycolors-gray p-4 flex w-[200px] justify-end items-center ">
              <div className="">
                <p className=" text-sm">Starting at</p>
                <p className="text-2xl font-bold mt-1">
                  <span className="">&#8377;</span>
                  {fare}
                </p>{" "}
                <button
                  className="py-1 my-2  px-2 bg-primarycolors-red  mx-3 text-primarycolors-white text-md  rounded-md"
                  onClick={handleButtonClick}
                >
                  Show Route
                </button>


                
          {seat_json && <button
            type="submit"
            onClick={handleViewSeat}
            className="py-1  px-2 bg-primarycolors-red  mx-3 text-primarycolors-white text-lg  rounded-md "
          >
            {!showViewSeat ? "View Seat" : "Hide seat"}
          </button>}
              </div>
            </div>
          </div>
        </div>
     
        {showViewSeat && <ViewSeat seat_json={seat_json} routeDetails={via_route} booked_seat={booked_seat} seatPrice={fare} departure={departure} arrival={arrival} date={date} setIsModalOpen={setIsModalOpen}  />}
        
        {showBoardingDropdown && (
          /* Add your dropdown content here for Boarding & Dropping Points */
          <div className=" absolute bg-primarycolors-white w-1/3 rounded-md shadow-xl mt-1 border-primarycolors-gray border-[1px]">
            <div className="text-left text-sm grid grid-cols-2">
              <div className="border-r-[1px] border-primarycolors-gray">
                <div className=" border-b-[1px]  border-primarycolors-gray p-2 font-bold">
                  Boarding Points
                </div>
                <div className="p-2 h-[100px] overflow-auto ">
                  {via_route.map((route, index) => (
                    <div key={index} className=" mb-2 ">
                      <p>{route.boading_points}</p>
                      <p className=" text-primarycolors-textcolor text-xs">
                        {" "}
                        {route.city}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <div className=" border-b-[1px]  border-primarycolors-gray p-2 font-bold">
                  Dropping Points
                </div>
                <div className="p-2 h-[100px] overflow-auto ">
                  {via_route.map((route, index) => (
                    <div key={index} className=" mb-2 ">
                      <p>{route.boading_points}</p>
                      <p className=" text-primarycolors-textcolor text-xs">
                        {" "}
                        {route.city}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {showCancellationDropdown && (
          /* Add your dropdown content here for Boarding & Dropping Points */
          <div className=" absolute right-[200px] bg-primarycolors-white w-1/3 rounded-md shadow-xl mt-1 border-primarycolors-gray border-[1px]">
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Reiciendis veniam ea quaerat atque modi, consectetur mollitia
              saepe explicabo eos tempore corrupti accusamus, et eligendi.
              Dicta, harum est! Possimus quasi doloremque officiis. Ea molestias
              dolore animi. Possimus, iure itaque ipsum expedita et porro
              voluptas error rem.
            </div>
          </div>
        )}
        {showTravelPolicyDropdown && (
          /* Add your dropdown content here for Boarding & Dropping Points */
          <div className=" absolute right-[50px] bg-primarycolors-white w-1/3 rounded-md shadow-xl mt-1 border-primarycolors-gray border-[1px]">
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Reiciendis veniam ea quaerat atque modi, consectetur mollitia
              saepe explicabo eos tempore corrupti accusamus, et eligendi.
              Dicta, harum est! Possimus quasi doloremque officiis. Ea molestias
              dolore animi. Possimus, iure itaque ipsum expedita et porro
              voluptas error rem.
            </div>
          </div>
        )}
        {showPopup && (
          <div className="modal-container">
            <div className="modal-content flex items-center   justify-center  w-full  overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
              <div className=" sm:p-4 md:p-0   w-full max-w-[30rem] ">
                <div className="m-2 sm:mt-10 bg-primarycolors-white rounded-lg relative ">
                  <RouteTable
                    routes={via_route}
                    setShowPopup={setShowPopup}
                    setShowFeedbackModal={setShowFeedbackModal}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {showFeedbackModal && (
          <div className="modal-container">
            <div className="modal-content flex items-center   justify-center  w-full  overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
              <div className=" sm:p-4 md:p-0   w-full max-w-[50rem] ">
                <div className="m-2 sm:mt-10 bg-primarycolors-white rounded-lg relative ">
                  <section class="flex flex-col justify-between h-full bg-gray-100 text-gray-600">
                    <div className="flex items-center justify-between bg-primarycolors-red px-3 rounded-t-lg  ">
                      <h2 className="py-2 text-sm text-primarycolors-white font-bold flex items-center gap-1">
                        <MdOutlinePeopleOutline size={20} /> Feedback or
                        suggestion / Report Site Data or Error
                      </h2>
                      <button
                        type="button"
                        className="text-primarycolors-white rounded-lg text-xl pointer  ml-auto inline-flex items-center hover:text-gray-200"
                        title="Close"
                        onClick={() => {
                          setShowFeedbackModal(false);
                        }}
                      >
                        <BiXCircle size={20} />
                      </button>
                    </div>
                    <div className=" my-2 ">
                      <div className="text-center text-primarycolors-black">
                        <h1 className="  text-md font-bold">
                          Still Need Help?
                        </h1>
                        <p className="text-xs ">
                          Please fill the below form and our team will assist
                          you with your query/report
                        </p>{" "}
                      </div>
                      <div className="my-5 flex flex-col gap-2">
                        {/* Report Type Dropdown */}
                        <div className="w-[90%] flex items-center gap-2">
                          <label
                            htmlFor="report-type"
                            className="w-1/4 mb-2 flex justify-end text-[12px] font-medium text-gray-900"
                          >
                            Report Type:
                          </label>
                          <select
                            id="report-type"
                            name="formType"
                            value={formState.formType}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.75rem] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {/* Options */}
                            <option value="feedback">
                              Feeback / Suggestion
                            </option>
                            <option value="report">
                              Report a Problem / Site Error / Data Error
                            </option>
                          </select>
                        </div>

                        {/* Error Type Dropdown */}
                        {formState.formType === "report" && (
                          <div className="w-[90%] flex items-center gap-2">
                            <label
                              htmlFor="error_type"
                              className="w-1/4 mb-2 flex justify-end text-[12px] font-medium text-gray-900"
                            >
                              Please be a little bit specific:
                            </label>
                            <select
                              id="error_type"
                              name="errorType"
                              value={formState.errorType}
                              onChange={handleInputChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.75rem] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              {/* Options */}
                              <option selected disabled>
                                Choose a Option
                              </option>
                              <option value="Incorrect Bus Information">
                                Incorrect Bus Information
                              </option>
                              <option value="Missing Bus Data In Database">
                                Missing Bus Data In Database
                              </option>
                              <option value="Route Map is not correct">
                                Route Map is not correct
                              </option>
                              <option value="Incorrect Fare">
                                Incorrect Fare
                              </option>
                            </select>
                          </div>
                        )}

                        {/* Feedback Textarea */}
                        <div className="w-[90%] flex items-center gap-2">
                          <label
                            htmlFor="message"
                            className="w-1/4 mb-2 flex justify-end text-[12px] font-medium text-gray-900"
                          >
                            Write a Message:
                          </label>
                          <textarea
                            id="message"
                            name="feedback"
                            rows="3"
                            className="my-2 text-[0.75rem] w-3/4 p-2 border-[1px] rounded-md"
                            placeholder="Enter your feedback here..."
                            value={formState.feedback}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Email Input */}
                        <div className="w-[90%] flex items-center gap-2">
                          <label
                            htmlFor="email"
                            className="w-1/4 mb-2 flex justify-end text-[12px] font-medium text-gray-900"
                          >
                            Your Email Address:
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formState.email}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.75rem] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>

                        {/* Mobile Input */}
                        <div className="w-[90%] flex items-center gap-2">
                          <label
                            htmlFor="mobile"
                            className="w-1/4 mb-2 flex justify-end text-[12px] font-medium text-gray-900"
                          >
                            Your Mobile Number:
                          </label>
                          <input
                            id="mobile"
                            name="mobile"
                            type="tel"
                            placeholder="+91 9126567432"
                            value={formState.mobile}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.75rem] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className=" flex justify-center">
                      <button
                        type="button"
                        className="py-1 mb-2   w-fit px-2 bg-primarycolors-red  mx-3 text-primarycolors-white text-md  rounded-md"
                        title="feeback"
                        onClick={handleFeedback}
                      >
                        Send Feedback
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Devices*/}
      {/*   <div>
        <div className="block md:hidden  ">
          <div className="p-3 m-1 my-4  shadow-lg border-[0.5px]  rounded-xl bg-primarycolors-white  border-primarycolors-textcolor">
            <div className="my-2 flex   text-primarycolors-red justify-end items-center text-[12px]">
              {" "}
              <div className=" border-[1px] rounded-lg py-1 px-2 bg-primarycolors-red/20">
                {" "}
                <MdLocalOffer /> 10% OFF{" "}
              </div>
            </div>
            <div className="flex  gap-2 justify-between ">
              <div className="text-left">
                <div className="text-xl">
                  <span className="font-bold">
                    {via_route.length > 0 && <>{sourceTime}</>}
                  </span>
                  <MdHorizontalRule />

                  {via_route.length > 0 && <>{destinationTime}</>}
                </div>
                <div className="text-primarycolors-textcolor text-sm">
                  <span>{`${hours}h ${minutes}m`}</span>
                  <MdCircle className="ml-1 text-primarycolors-textcolor text-[6px]" />{" "}
                  <span className="text-left">5 Seats</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl font-sans">
                  <span className="">&#8377; </span>
                  {fare}
                </p>
                <p className="text-sm  text-primarycolors-textcolor">
                  <strike>
                    <span className="">&#8377; </span>
                    {parseFloat(fare) + 100}
                  </strike>
                </p>
              </div>
            </div>
            <div className="mt-4 mb-1 flex gap-2 justify-between ">
              <div className="text-left">
                <p className="font-bold uppercase ">{travels_name}</p>
                <p className=" text-primarycolors-textcolor text-sm ">
                  {bus_type_ac === "0" ? "Non-AC" : "AC"}

                  {seat_type ? `(${seat_type})` : ""}
                </p>
              </div>
              <div className="">
                <div className="  rounded-md  border-[1px] flex  border-primarycolors-red">
                  <button className="text-primarycolors-white px-2 rounded-l-md rounded-r-md bg-primarycolors-red flex items-center">
                    <MdStar className="text-sm" />
                    2.1
                  </button>
                  <button className="flex px-2 items-center">
                    <BiUser className="text-sm" />
                    32
                  </button>
                </div>
              </div>
            </div>
            {seat_json ? (
              <div
                className="flex justify-end mt-4 items-center "
                onClick={handleview}
              >
                <div className=" bg-primarycolors-blue flex items-center  rounded-md  justify-center px-2 p-1">
                  <div>
                    <BiShow className=" text-primarycolors-white text-[20px]" />
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      onClick={handleview}
                      className="ml-2 text-primarycolors-white text-[16px]"
                    >
                      View Seats
                    </button>
                  </div>
                </div>

                <div className=" bg-primarycolors-blue flex items-center  rounded-md  justify-center px-2 p-1">
                  <div className="">
                    <button
                      className="ml-2 text-primarycolors-white text-[16px]"
                      onClick={() => handleButtonClick(busData.route)}
                    >
                      Show Route
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex justify-end mt-4 items-center "
                onClick={handleview}
              >
                <div className=" bg-primarycolors-blue flex items-center  rounded-md  justify-center px-2 p-1">
                  <div className="">
                    <button
                      className="ml-2 text-primarycolors-white text-[16px]"
                      onClick={() => handleButtonClick(busData.route)}
                    >
                      Show Route
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>{" "}
          {showPopup && (
            <div className="modal-container">
              <div className="modal-content flex items-center   justify-center  w-full  overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                <div className=" sm:p-4 md:p-0  w-full     ">
                  <div className="m-2 mt-0 sm:mt-10 bg-primarycolors-white rounded-lg relative ">
                    <RouteTable
                      routes={via_route}
                      setShowPopup={setShowPopup}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div> */}

      {/* Mobile Devices*/}
      <div>
        <div className="block md:hidden  ">
          <div className=" bg-primarycolors-white rounded-xl  hover:shadow-md p-3 my-4">
            <div className=" grid grid-cols-4 gap-4">
              <div className=" col-span-3 flex flex-col gap-1">
                <div className="text-left flex justify-between items-center ">
                  <div>
                    <h1 className=" font-bold text-xl ">{travels_name}</h1>
                    <p className="text-sm font-semibold  text-primarycolors-textcolor">
                      {bus_type_ac === "0" && "Non-AC "}
                      {bus_type_ac === "1" && "AC "}
                      {seat_type ? `${seat_type}` : ""}
                    </p>
                    <p className="text-[12px] text-left text-primarycolors-textcolor">
                      Bus No: {reg_no}
                    </p>
                  </div>
                </div>
                <div className=" flex  justify-between items-center  w-fit gap-3">
                  <div className="text-left w-fit">
                    {via_route.length > 0 && (
                      <>
                        <p className=" text-lg font-bold">{sourceTime}</p>
                      </>
                    )}
                  </div>
                  <div className=" w-full">
                    {via_route.length > 0 && (
                      <div className=" flex items-center justify-center text-primarycolors-textcolor">
                        {/* <GoDotFill className=" text-xs text-primarycolors-textcolor " /> */}
                        ---
                        <button className=" border-[0.25px] text-[10px] text-primarycolors-textcolor border-primarycolors-gray mx-2  px-2 rounded-[4px]">
                          {`${hours}h:${minutes}m`}
                        </button>
                        ---
                        {/* <GoDotFill className=" text-xs text-primarycolors-textcolor" /> */}
                      </div>
                    )}
                  </div>
                  <div className=" w-fit text-right">
                    {via_route.length > 0 && (
                      <>
                        <p className=" font-bold text-lg">{destinationTime}</p>
                      </>
                    )}
                  </div>
                </div>

                {/*  <div className=" flex justify-start my-1 ">
                  <button className=" px-3 py-1 text-sm rounded-md text-primarycolors-green font-semibold bg-primarycolors-green/10">
                    72 Seats Left
                  </button>
                </div> */}
              </div>

              <div>
                {/*  <div className=" rounded-md p-2  flex flex-col">
                  <div className=" text-sm rounded-t-md px-1 bg-primarycolors-btncolor flex gap-1 justify-center items-center text-primarycolors-white">
                    <MdStar className="text-sm" />
                    2.1
                  </div>
                  <div className="rounded-b-md text-sm px-1 bg-primarycolors-gray flex gap-1 justify-center items-center text-primarycolors-white">
                    <BiUser className="text-sm" />
                    38
                  </div>
                </div> */}

                <div>
                  <h1 className=" text-xs text-primarycolors-textcolor">
                    Starts @
                  </h1>{" "}
                  <h1 className=" text-lg font-bold ">
                    {" "}
                    <span className=" -mr-1">&#8377;</span> <span>{fare}</span>
                  </h1>
                </div>
              </div>
            </div>
            <hr className=" h-[0.2px] my-1 text-primarycolors-gray" />

            <div className=" grid grid-cols-5">
              <div className="col-span-3 flex items-center text-xs gap-1 pl-2">
                {/* <p className=" text-primarycolors-textcolor"> 3+ Amenities</p> |
                <button className=" text-primarycolors-red">
                  View More...
                </button> */}
              </div>
              <div className=" col-span-2 flex justify-end">
                <button
                  className="py-1 mt-1  px-2 bg-primarycolors-red  mx-1 text-primarycolors-white text-sm  rounded-md"
                  onClick={handleButtonClick}
                >
                  Show Route
                </button>
              </div>
            </div>
          </div>
          {showPopup && (
            <div className="modal-container">
              <div className="modal-content flex items-center   justify-center  w-full  overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                <div className=" sm:p-4 md:p-0  w-full     ">
                  <div className="m-2 mt-0 sm:mt-10 bg-primarycolors-white rounded-lg relative ">
                    <RouteTable
                      routes={via_route}
                      setShowPopup={setShowPopup}
                      setShowFeedbackModal={setShowFeedbackModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {showFeedbackModal && (
            <div className="modal-container">
              <div className="modal-content flex items-center   justify-center  w-full  overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                <div className=" sm:p-4 md:p-0   w-full max-w-[30rem] ">
                  <div className="m-2 sm:mt-10 bg-primarycolors-white rounded-lg relative ">
                    <section class="flex flex-col justify-between h-full bg-gray-100 text-gray-600">
                      <div className="flex gap-4 items-center justify-between bg-primarycolors-red px-3 rounded-t-lg  ">
                        <h2 className="py-2 text-sm text-primarycolors-white font-bold text-left gap-1">
                          Feedback or Suggestion / Report Site Data or Error
                        </h2>
                        <button
                          type="button"
                          className="text-primarycolors-white rounded-lg text-xl pointer  ml-auto inline-flex items-center hover:text-gray-200"
                          title="Close"
                          onClick={() => {
                            setShowFeedbackModal(false);
                          }}
                        >
                          <BiXCircle size={20} />
                        </button>
                      </div>
                      <div className=" my-2 ">
                        <div className="text-center text-primarycolors-black">
                          <h1 className="  text-md font-bold">
                            Still Need Help?
                          </h1>
                          <p className="text-xs px-3 ">
                            Please fill the below form and our team will assist
                            you with your query/report
                          </p>{" "}
                        </div>
                        <div className="my-5 flex flex-col gap-2">
                          {/* Report Type Dropdown */}
                          <div className="w-[95%] flex items-center gap-2">
                            <label
                              htmlFor="report-type"
                              className="w-1/4 mb-2 flex justify-end text-[12px] font-medium text-gray-900"
                            >
                              Report Type:
                            </label>
                            <select
                              id="report-type"
                              name="formType"
                              value={formState.formType}
                              onChange={handleInputChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.75rem] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              {/* Options */}
                              <option value="feedback">
                                Feedback / Suggestion
                              </option>
                              <option value="report">
                                Report a Problem / Site Error / Data Error
                              </option>
                            </select>
                          </div>

                          {/* Error Type Dropdown */}
                          {formState.formType === "report" && (
                            <div className="w-[95%] flex items-center gap-2">
                              <label
                                htmlFor="error_type"
                                className="w-1/4 mb-2 flex justify-end text-[12px] font-medium text-gray-900"
                              >
                                Please be a little bit specific:
                              </label>
                              <select
                                id="error_type"
                                name="errorType"
                                value={formState.errorType}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.75rem] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              >
                                {/* Options */}
                                <option selected disabled>
                                  Choose a Option
                                </option>
                                <option value="Incorrect Bus Information">
                                  Incorrect Bus Information
                                </option>
                                <option value="Missing Bus Data In Database">
                                  Missing Bus Data In Database
                                </option>
                                <option value="Route Map is not correct">
                                  Route Map is not correct
                                </option>
                                <option value="Incorrect Fare">
                                  Incorrect Fare
                                </option>
                              </select>
                            </div>
                          )}

                          {/* Feedback Textarea */}
                          <div className="w-[95%] flex items-center gap-2">
                            <label
                              htmlFor="message"
                              className="w-1/4 mb-2 flex justify-end text-[12px] font-medium text-gray-900"
                            >
                              Write a Message:
                            </label>
                            <textarea
                              id="message"
                              name="feedback"
                              rows="3"
                              className="my-2 text-[0.75rem] w-3/4 p-2 border-[1px] rounded-md"
                              placeholder="Enter your feedback here..."
                              value={formState.feedback}
                              onChange={handleInputChange}
                            />
                          </div>

                          {/* Email Input */}
                          <div className="w-[95%] flex items-center gap-2">
                            <label
                              htmlFor="email"
                              className="w-1/4 mb-2 flex justify-end text-[12px] font-medium text-gray-900"
                            >
                              Your Email Address:
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="john@example.com"
                              value={formState.email}
                              onChange={handleInputChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.75rem] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>

                          {/* Mobile Input */}
                          <div className="w-[95%] flex items-center gap-2">
                            <label
                              htmlFor="mobile"
                              className="w-1/4 mb-2 flex justify-end text-[12px] font-medium text-gray-900"
                            >
                              Your Mobile Number:
                            </label>
                            <input
                              id="mobile"
                              name="mobile"
                              type="tel"
                              placeholder="+91 9126567432"
                              value={formState.mobile}
                              onChange={handleInputChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.75rem] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className=" flex justify-center">
                        <button
                          type="button"
                          className="py-1 mb-5   w-fit px-2 bg-primarycolors-red  mx-3 text-primarycolors-white text-md  rounded-md"
                          title="feeback"
                          onClick={handleFeedback}
                        >
                          Send Feedback
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BusBox;
