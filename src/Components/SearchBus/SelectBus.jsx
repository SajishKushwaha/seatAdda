import React, { useState, useEffect } from "react";
import Navbar from "../Navigation";
import Header from "./Header";
import toast, { Toaster } from "react-hot-toast";
import Right from "./Right";
import Left from "./Left";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout, loginFailure } from "../../Redux/auth/action";
import Cookies from "js-cookie";
import {
  MdAcUnit,
  MdAirlineSeatLegroomNormal,
  MdFilterAlt,
  MdOutlineFilter5,
} from "react-icons/md";
import { BiFilterAlt, BiReset, BiSolidBadgeCheck } from "react-icons/bi";
import { FaSun, FaCloudSun, FaCloud, FaMoon } from "react-icons/fa";

import { updateFilterDetails } from "../../Redux/FilterAndSort/action";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Footer from "../Footer";
import FooterDesktop from "../FooterDesktop";
import LoginModal from "../LoginModal";

const initState = {
  departureTime: {
    before6am: false,
    "6amto12pm": false,
    "12pmto6pm": false,
    after6pm: false,
  },
  busType: {
    seater: false,
    sleeper: false,
    ac: false,
    nonac: false,
  },
  arrivalTime: {
    before6am: false,
    "6amto12pm": false,
    "12pmto6pm": false,
    after6pm: false,
  },
  sortingProperty: "Default",
};

const SelectBus = () => {
  const busTypes = [
    { name: "ac", icon: <MdAcUnit className=" text-sm my-1" /> },
    { name: "nonac", icon: <MdOutlineFilter5 className=" text-sm my-1" /> },
    { name: "sleeper", icon: <BiFilterAlt className=" text-sm my-1" /> },
    {
      name: "seater",
      icon: <MdAirlineSeatLegroomNormal className=" text-sm my-1" />,
    },
  ];
  const Time = [
    {
      timeRange: "before6am",
      label: "Before 6AM",
      icon: <FaSun />,
    },
    {
      timeRange: "6amto12pm",
      label: "6AM - 12PM",
      icon: <FaCloudSun />,
    },
    {
      timeRange: "12pmto6pm",
      label: "12PM - 6PM",
      icon: <FaCloud />,
    },
    {
      timeRange: "after6pm",
      label: "After 6PM",
      icon: <FaMoon />,
    },
  ];

  const [isCalender, setIsCalender] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [FilterValues, setFilterValues] = useState(initState);
  const [modalOpen, setModalOpen] = useState(false);

  let dispatch = useDispatch();

  const navigate = useNavigate();
  const filterBusType = useSelector(
    (state) => state.updateFilterDetailsReducer.busType
  );

  const filterDepartureTime = useSelector(
    (state) => state.updateFilterDetailsReducer.departureTime
  );

  const filterArrivalTime = useSelector(
    (state) => state.updateFilterDetailsReducer.arrivalTime
  );

  const sortingProperty = useSelector(
    (state) => state.updateFilterDetailsReducer.sortingProperty
  );

  const [sort, setsort] = useState(sortingProperty);
  const handleSortProperty = (sort) => {
    const payload = {
      key: "sortingProperty",
      value: sort,
    };

    dispatch(updateFilterDetails(payload));
  };

  const handleBusTypeClick = async (busTypeName) => {
    const nbus = {
      ...filterBusType,
      [busTypeName]: !filterBusType[busTypeName],
    };

    // console.log(nbus);
    dispatch(updateFilterDetails({ key: "busType", value: nbus }));
  };

  const handleArrivalTime = async (arrivalTime) => {
    const nbus = {
      ...filterArrivalTime,
      [arrivalTime]: !filterArrivalTime[arrivalTime],
    };
    // console.log(nbus);
    dispatch(updateFilterDetails({ key: "arrivalTime", value: nbus }));
  };

  const handleDepartureTime = async (departureTime) => {
    const nbus = {
      ...filterDepartureTime,
      [departureTime]: !filterDepartureTime[departureTime],
    };
    // console.log(nbus);
    dispatch(updateFilterDetails({ key: "departureTime", value: nbus }));
    // console.log(filterDepartureTime)
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
    document.body.style.overflow = !sidebarOpen ? "hidden" : "auto";
  };

  const handleApply = () => {
    handleSidebarToggle();
    handleSortProperty(sort);
    toast.success("Filter Applied Successfully.");
  };

  const customerName = useSelector(
    (state) => state.authReducer.currentCustomer
  );
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    const checkAuthToken = () => {
      const jwtToken = Cookies.get("jwt_token");
      if (!jwtToken) {
        // Logout if the token is missing
        dispatch(logout());
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        // toast.success("Logged Out");
        // dispatch(loginFailure());
      }
    };

    // Check on mount
    checkAuthToken();

    // Check every time the component re-renders
    const interval = setInterval(() => {
      checkAuthToken();
    }, 1000); // Check every second

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [dispatch, navigate]);
  return (
    <>
      <Navbar />
      <div className=" bg-primarycolors-bg_sky/50">
        <>
          <div>
            <Header setIsCalender={setIsCalender} />
          </div>
          <div className="container mx-auto sm:my-5  ">
            {modalOpen ? (
              <>
                <div>
                  <LoginModal
                    setIsModalOpen={setModalOpen}
                    onClose={handleCloseModal}
                  />
                </div>
                <div className="md:grid md:p-3 grid-cols-8 md:gap-3">
                  <div className="hidden md:block col-span-2">
                    <Left />
                  </div>
                  <div className="col-span-6 md:border-[1px] border-primarycolors-textcolor/50 rounded-md h-fit  ">
                    <Right setIsModalOpen={setModalOpen} isCal={isCalender} />
                  </div>
                </div>
              </>
            ) : (
              <div className="md:grid md:p-2 grid-cols-8 md:gap-3">
                <div className="hidden md:block col-span-2">
                  <Left />
                </div>
                <div className="col-span-6 md:border-[1px] border-primarycolors-textcolor/50 rounded-md h-fit  ">
                  <Right setIsModalOpen={setModalOpen} isCal={isCalender} />
                </div>
              </div>
            )}
          </div>

          <div className="">
            {/* <Toaster /> */}
            <div className="fixed md:hidden bg-primarycolors-textcolor shadow-lg  rounded-md bottom-2 left-2 right-2 ">
              {/* <div className="flex justify-between  ">
                
                <div
                  className="overflow-x-auto px-4 py-1"
                  style={{ maxHeight: "200px" }}
                >
                  <div className="flex w-full gap-4 py-2">
                    {busTypes.map((busType) => (
                      <div
                        key={busType.name}
                        className={`w-20  h-12 flex flex-col items-center justify-center px-3 py-1 border-t border-primarycolors-gray  bg-primarycolors-textcolor shadow-xl rounded-lg ${
                          filterBusType[busType.name]
                            ? "bg-blue-500 text-primarycolors-red" 
                            : ""
                        }`}
                        onClick={() => handleBusTypeClick(busType.name)}
                      >
                        <p
                          className={` ${
                            filterBusType[busType.name]
                              ? "text-primarycolors-red"
                              : "text-primarycolors-white"
                          }`}
                        >
                          {busType.icon}
                        </p>
                        <p
                          className={` font-bold uppercase text-[9px] w-[50px]  ${
                            filterBusType[busType.name]
                              ? "text-primarycolors-red" 
                              : "text-primarycolors-white"
                          }`}
                        >
                          {busType.name}
                        </p>
                      </div>
                    ))}

                    {Time.map((item) => (
                      <div
                        onClick={() => handleDepartureTime(item.timeRange)}
                        key={item.timeRange}
                        className={`w-80  h-12 flex flex-col items-center justify-center px-3 py-1 border-t border-primarycolors-gray   shadow-xl rounded-lg ${
                          filterDepartureTime[item.timeRange]
                            ? " text-primarycolors-red" 
                            : ""
                        }`}
                      >
                        <p
                          className={`  text-sm my-1 ${
                            filterDepartureTime[item.timeRange]
                              ? " text-primarycolors-red" 
                              : "text-primarycolors-white"
                          }`}
                        >
                          {item.icon}
                        </p>

                        <h3
                          className={` font-bold uppercase text-[9px] w-[60px] ${
                            filterDepartureTime[item.timeRange]
                              ? " text-primarycolors-red" 
                              : "text-primarycolors-white"
                          }`}
                        >
                          {item.label}
                        </h3>
                       
                      </div>
                    ))}

                    <div
                      key=""
                      className="w-20  h-12 flex flex-col items-center justify-center px-3 py-1   border-primarycolors-gray  bg-primarycolors-textcolor  rounded-lg"
                    ></div>
                  </div>
                </div>
              
                <div
                  className="bg-primarycolors-red shadow-lg flex items-center justify-center rounded-r-lg"
                  onClick={handleSidebarToggle}
                >
                  <div className="bg-gray-100 flex flex-col items-center p-2">
                    <MdFilterAlt className="text-primarycolors-white text-base" />
                    <p className="text-primarycolors-white font-bold  text-[12px]">
                      Sort/Filter
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <Footer />
          {sidebarOpen && (
            <div
              className={`fixed shadow-md z-[100] h-[100%] top-0 right-0 bottom-0 overflow-y-scroll bg-primarycolors-white  w-[95%]  `}
            >
              <div className="fixed z-[10] bg-primarycolors-white shadow-md p-2 rounded-t top-0  w-[95%]">
                <h3 className="text-white  text-xl bg-primarycolors-gra text-primarycolors-black font-bold   ">
                  Filters
                </h3>
              </div>
              <div className="relative top-8 flex flex-col  justify-between ">
                <div className="overflow-y-scroll p-2 pb-6">
                  <div className="p-1">
                    {/* Sort By */}
                    <div className="flex flex-col  my-1  p-2">
                      <h3 className="text-white text-left text-base font-bold ">
                        Sort by
                      </h3>
                      <div className="my-2 flex shadow-md rounded-md flex-col ">
                        <label className="inline-flex items-center px-4 my-1 border-b border-primarycolors-textcolor rounded bg-primarycolors-white">
                          <input
                            onChange={() => setsort("Default")}
                            type="radio"
                            className="form-radio text-2xl"
                            name="sortOption"
                            value="Default"
                            checked={sort === "Default" || sort === "None"}
                          />
                          <span className="ml-2 p-1 text-white">Default</span>
                        </label>
                        <label className=" inline-flex items-center px-4 my-1 border-b border-primarycolors-textcolor rounded bg-primarycolors-white">
                          <input
                            onChange={() => setsort("lowtohigh")}
                            type="radio"
                            className="form-radio"
                            name="sortOption"
                            value="lowtohigh"
                            checked={sort === "lowtohigh"}
                          />
                          <span className="ml-2 p-1 text-white">
                            Price Low to High
                          </span>
                        </label>
                        <label className="inline-flex items-center px-4 my-1 border-b border-primarycolors-textcolor rounded bg-primarycolors-white">
                          <input
                            onChange={() => setsort("hightolow")}
                            type="radio"
                            className="form-radio text-2xl"
                            name="sortOption"
                            value="hightolow"
                            checked={sort === "hightolow"}
                          />
                          <span className="ml-2 p-1 text-white">
                            Price High to Low
                          </span>
                        </label>
                        <label className="inline-flex items-center px-4 my-1 mb-0 border-b border-primarycolors-textcolor rounded bg-primarycolors-white">
                          <input
                            type="radio"
                            className="form-radio"
                            name="sortOption"
                            value="option1"
                          />
                          <span className="ml-2 p-1 text-white">
                            Popularity
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Bus Type */}
                    <div className="my-4 rounded-md p-2">
                      <h3 className="text-white text-left text-base font-bold my-2">
                        Bus Type
                      </h3>

                      <div className="grid grid-cols-4 gap-2 w-full">
                        {busTypes.map((type, index) => (
                          <div
                            onClick={() => handleBusTypeClick(type.name)}
                            key={index}
                            className=" p-1 h-fit   rounded-lg shadow-md"
                          >
                            {/*  <FaBus className=" text-sm text-primarycolors-textcolor" /> */}
                            <p
                              className={` ${
                                filterBusType[type.name]
                                  ? "text-primarycolors-red" // Apply styles for selected state
                                  : "text-primarycolors-textcolor"
                              }`}
                            >
                              {type.icon}
                            </p>
                            <h3
                              className={`text-[12px] font-semibold mb-2 uppercase  ${
                                filterBusType[type.name]
                                  ? "text-primarycolors-red" // Apply styles for selected state
                                  : "text-primarycolors-textcolor"
                              }`}
                            >
                              {type.name}
                            </h3>
                            {/* Additional information about the bus type */}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Departure Time */}
                    <div className="my-4  rounded-md p-2">
                      <h3 className="text-white text-left text-base font-bold my-2">
                        Departure Time
                      </h3>

                      <div className="grid grid-cols-4 gap-1 w-full">
                        {Time.map((item) => (
                          <div
                            onClick={() => handleDepartureTime(item.timeRange)}
                            key={item.timeRange}
                            className={` p-2   bg-gray-200 rounded-lg shadow-md ${
                              filterDepartureTime[item.timeRange]
                                ? " text-primarycolors-red" // Apply styles for selected state
                                : "text-primarycolors-textcolor"
                            }`}
                          >
                            <p className=" text-sm ">{item.icon}</p>

                            <h3 className="text-[10px]  font-semibold mb-2">
                              {item.label}
                            </h3>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Arrival Time */}
                    <div className="my-4  rounded-md p-2 mb-10">
                      <h3 className="text-white text-left text-base font-bold my-2">
                        Arrival Time
                      </h3>

                      <div className="grid grid-cols-4 gap-1 w-full ">
                        {Time.map((item) => (
                          <div
                            onClick={() => handleArrivalTime(item.timeRange)}
                            key={item.timeRange}
                            className={` p-2   bg-gray-200 rounded-lg shadow-md ${
                              filterArrivalTime[item.timeRange]
                                ? " text-primarycolors-red"
                                : "text-primarycolors-textcolor"
                            }`}
                          >
                            <p className=" text-sm ">{item.icon}</p>

                            <h3 className="text-[10px]  font-semibold mb-2">
                              {item.label}
                            </h3>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fixed w-[95%] bottom-0 bg-primarycolors-white  shadow-inner p-3  ">
                  <div className="flex justify-between gap-4 ">
                    <button
                      className="font-bold w-1/2 px-4 p-2 rounded-md bg-primarycolors-textcolor/90 text-primarycolors-white flex items-center justify-center gap-3 "
                      onClick={handleSidebarToggle}
                    >
                      {" "}
                      <BiReset /> Close
                    </button>
                    <button
                      onClick={handleApply}
                      className="font-bold w-1/2 px-4 p-2 rounded-md bg-primarycolors-red/90 text-primarycolors-white flex items-center justify-center gap-3  "
                    >
                      {" "}
                      <BiSolidBadgeCheck /> Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default SelectBus;
