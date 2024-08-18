import React, { useEffect, useState } from "react";
import { BiFilterAlt, BiSleepy } from "react-icons/bi";
import "./left.css";
import {
  MdAcUnit,
  MdAirlineSeatLegroomNormal,
  MdFilterAlt,
  MdOutlineAirlineSeatIndividualSuite,
  MdOutlineEventSeat,
  MdOutlineFilter5,
  MdSunny,
} from "react-icons/md";
import {
  FaSun,
  FaCloudSun,
  FaCloud,
  FaMoon,
  FaSearch,
  FaAngleUp,
  FaAngleDown,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFilterDetails,
  updateSelectedPoints,
} from "../../Redux/FilterAndSort/action";
import { useLocation } from "react-router-dom";
import axios from "axios";

const resetState = {
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

const busTypes = [
  { name: "ac", label: "AC", icon: <MdAcUnit /> },
  { name: "nonac", label: "Non-AC", icon: <MdSunny /> },
  {
    name: "sleeper",
    label: "Sleeper",
    icon: <MdOutlineAirlineSeatIndividualSuite />,
  },
  {
    name: "seater",
    label: "Seater",
    icon: <MdOutlineEventSeat />,
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
const Left = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [boardingPoints, setboardingPoints] = useState([]);
  const [droppingPoints, setdroppingPoints] = useState([]);
  // const [selectedBoardingPoints, setSelectedBoardingPoints] = useState([]);
  // const [selectedDroppingPoints, setSelectedDroppingPoints] = useState([]);
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const departure = query.get("departure");
  const arrival = query.get("arrival");
  const date = query.get("date");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [isOpenDrop, setIsOpenDrop] = useState(false);
  const toggleDropDropdown = () => {
    setIsOpenDrop(!isOpenDrop);
  };

  let dispatch = useDispatch();
  const filterBusType = useSelector(
    (state) => state.updateFilterDetailsReducer.busType
  );

  const filterDepartureTime = useSelector(
    (state) => state.updateFilterDetailsReducer.departureTime
  );

  const filterArrivalTime = useSelector(
    (state) => state.updateFilterDetailsReducer.arrivalTime
  );

  // New filters for boarding and dropping points
  const selectedBoardingPoints = useSelector(
    (state) => state.updateFilterDetailsReducer.selectedBoardingPoints
  );
  const selectedDroppingPoints = useSelector(
    (state) => state.updateFilterDetailsReducer.selectedDroppingPoints
  );

  const handleBusTypeClick = async (busTypeName) => {
    const nbus = {
      ...filterBusType,
      [busTypeName]: !filterBusType[busTypeName],
    };

    // console.log(nbus);
    dispatch(updateFilterDetails({ key: "busType", value: nbus }));
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

  const handleArrivalTime = async (arrivalTime) => {
    const nbus = {
      ...filterArrivalTime,
      [arrivalTime]: !filterArrivalTime[arrivalTime],
    };
    // console.log(nbus);
    dispatch(updateFilterDetails({ key: "arrivalTime", value: nbus }));
  };

  // Handle click on boarding point
  const handleBoardingPointClick = (boardingPoint) => {
    const isSelected = selectedBoardingPoints.includes(boardingPoint);
    const updatedBoardingPoints = isSelected
      ? selectedBoardingPoints.filter((point) => point !== boardingPoint)
      : [...selectedBoardingPoints, boardingPoint];

    dispatch(
      updateSelectedPoints(updatedBoardingPoints, selectedDroppingPoints)
    );
  };

  // Handle click on dropping point
  const handleDroppingPointClick = (droppingPoint) => {
    const isSelected = selectedDroppingPoints.includes(droppingPoint);
    const updatedDroppingPoints = isSelected
      ? selectedDroppingPoints.filter((point) => point !== droppingPoint)
      : [...selectedDroppingPoints, droppingPoint];

    dispatch(
      updateSelectedPoints(selectedBoardingPoints, updatedDroppingPoints)
    );
  };

  // Use useEffect to log the updated state values
  // useEffect(() => {
  //   console.log("Selected Boarding Points:", selectedBoardingPoints);
  // }, [selectedBoardingPoints]);

  // useEffect(() => {
  //   console.log("Selected Dropping Points:", selectedDroppingPoints);
  // }, [selectedDroppingPoints]);

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

  const handleApply = () => {
    handleSortProperty(sort);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const resetAllFilters = () => {
    dispatch(
      updateFilterDetails({ key: "busType", value: resetState.busType })
    );
    dispatch(
      updateFilterDetails({
        key: "departureTime",
        value: resetState.departureTime,
      })
    );
    dispatch(
      updateFilterDetails({ key: "arrivalTime", value: resetState.arrivalTime })
    );

    dispatch(
      updateFilterDetails({
        key: "sortingProperty",
        value: "None",
      })
    );

    dispatch(updateSelectedPoints([], []));

    // console.log("Reset")
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append("source", departure);
        formData.append("destination", arrival);
        const formattedDate = formatDate(date);
        formData.append("date", formattedDate);

        const response = await axios.post(
          "https://seatadda.co.in/auth/api/stocks",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // console.log(response.data);
        setboardingPoints(response.data.s_boading_points);
        setdroppingPoints(response.data.d_boading_points);
      } catch (error) {
        // console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="">
        <div className="w-full ">
          <div className="flex   rounded-md mb-0 border-slate-500 justify-between items-center p-1 pt-0">
            <h1 className="text-lg font-semibold">Filter</h1>
            <button
              onClick={() => resetAllFilters()}
              className="text-sm text-primarycolors-red font-semibold"
            >
              Clear All
            </button>
          </div>

          <div className=" border-primarycolors-gray bg-primarycolors-gray/30  border-[1px] mb-3">
            {/* Sort */}
            <div className="mb-4 ">
              <div className="flex justify-between px-2 my-2">
                <h1 className="">Sort</h1>
                {/*  <button className="text-sm text-primarycolors-red ">
                  Clear
                </button> */}
              </div>
              <div className="bg-primarycolors-white text-sm py-2 border-primarycolors-gray border-[1px] gap-1 flex mx-2 flex-col ">
                <label className="cursor-pointer inline-flex items-center px-4 border-b-[0.5px] border-primarycolors-gray/50">
                  <input
                    onChange={() => {
                      handleSortProperty("lowtohigh");
                      setsort("lowtohigh");
                    }}
                    type="radio"
                    className="form-radio"
                    name="sortOption"
                    value="lowtohigh"
                    checked={sortingProperty === "lowtohigh"}
                  />
                  <span className="ml-2 p-1 text-white">Price Low to High</span>
                </label>
                <label className="cursor-pointer inline-flex items-center px-4 border-b-[0.5px] border-primarycolors-gray/50  ">
                  <input
                    onChange={() => {
                      handleSortProperty("hightolow");
                      setsort("hightolow");
                    }}
                    type="radio"
                    className="form-radio text-2xl"
                    name="sortOption"
                    value="hightolow"
                    checked={sortingProperty === "hightolow"}
                  />
                  <span className="ml-2 p-1 text-white">Price High to Low</span>
                </label>
                <label className="cursor-pointer inline-flex items-center px-4 mb-0  ">
                  <input
                    onChange={() => {
                      handleSortProperty("popularity");
                      setsort("popularity");
                    }}
                    type="radio"
                    className="form-radio"
                    name="sortOption"
                    value="option1"
                    checked={sortingProperty === "popularity"}
                  />
                  <span className="ml-2 p-1 text-white">Popularity</span>
                </label>
              </div>
            </div>

            <hr className=" text-primarycolors-textcolor" />

            {/* Bus Type */}
            <div className="my-4 mt-1">
              <div className="flex justify-between px-2 my-2">
                <h1 className="">Bus Type</h1>
                {/*  <button className="text-sm text-primarycolors-red ">
                  Clear
                </button> */}
              </div>
              <div className="grid grid-cols-4 box-border m-2 ">
                {busTypes.map((type, index) => {
                  return (
                    <button
                      onClick={() => handleBusTypeClick(type.name)}
                      key={index}
                      className={` ${
                        filterBusType[type.name]
                          ? "bg-primarycolors-red/90 text-primarycolors-white"
                          : "bg-primarycolors-white hover:bg-primarycolors-gray "
                      }  p-1 border-primarycolors-gray border-[1px] `}
                    >
                      <div className="flex flex-col gap-1 items-center justify-center">
                        {type.icon}
                        <p className="text-xs">{type.label}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className=" text-primarycolors-textcolor" />
            {/* Boarding Points */}
            <div
              className={` ${!isOpen ? " bg-primarycolors-white  " : "mb-3"}`}
            >
              <div className="flex justify-between px-2 py-4">
                <button onClick={toggleDropdown}>
                  Boarding Points {isOpen ? <FaAngleUp /> : <FaAngleDown />}{" "}
                </button>
              </div>
              <div
                className={`mx-2 border-[0.5px] p-1 bg-primarycolors-white rounded-md border-primarycolors-gray ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                {/* ... (Other JSX code) */}

                <div className="p-2 text-left overflow-y-auto max-h-[150px]">
                  {boardingPoints.map((boardPoint, index) => {
                    return (
                      <div
                        key={index}
                        className=""
                        onClick={() =>
                          handleBoardingPointClick(boardPoint.boading_points)
                        }
                      >
                        <label className="">
                          <input
                            className=" mr-2"
                            type="checkbox"
                            checked={selectedBoardingPoints.includes(
                              boardPoint.boading_points
                            )}
                          />

                          {boardPoint.boading_points}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <hr className=" text-primarycolors-textcolor" />

            {/* Dropping Points */}
            <div
              className={` ${!isOpenDrop ? " bg-primarycolors-white" : "mb-3"}`}
            >
              <div className={`flex justify-between px-2 py-4 `}>
                <button onClick={toggleDropDropdown}>
                  Dropping Points {isOpenDrop ? <FaAngleUp /> : <FaAngleDown />}{" "}
                </button>
              </div>
              <div
                className={`mx-2 border-[0.5px] p-1 bg-primarycolors-white rounded-md border-primarycolors-gray ${
                  isOpenDrop ? "block" : "hidden"
                }`}
              >
                {/* ... (Other JSX code) */}

                <div className="p-2 text-left overflow-y-auto max-h-[150px]">
                  {droppingPoints.map((dropPoint, index) => {
                    return (
                      <div
                        key={index}
                        className=""
                        onClick={() =>
                          handleDroppingPointClick(dropPoint.boading_points)
                        }
                      >
                        <label className="">
                          <input
                            className=" mr-2"
                            type="checkbox"
                            checked={selectedDroppingPoints.includes(
                              dropPoint.boading_points
                            )}
                          />

                          {dropPoint.boading_points}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <hr className=" text-primarycolors-textcolor" />

            {/* Departure Time */}
            <div className="my-4">
              <div className="flex justify-between px-2 my-2">
                <h1>Departure Time</h1>
                {/*  <button className="text-sm text-primarycolors-red ">
                  Clear
                </button> */}
              </div>
              <div className="grid grid-cols-2 box-border m-2 ">
                {Time.map((item, index) => {
                  return (
                    <button
                      onClick={() => handleDepartureTime(item.timeRange)}
                      key={index}
                      className={` ${
                        filterDepartureTime[item.timeRange]
                          ? "bg-primarycolors-red/90 text-primarycolors-white"
                          : "bg-primarycolors-white hover:bg-primarycolors-gray "
                      }  p-1 border-primarycolors-gray border-[1px] `}
                    >
                      <div className="flex flex-col gap-1 items-center justify-center">
                        {item.icon}
                        <p className="text-xs">{item.label} </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <hr className=" text-primarycolors-textcolor" />

            {/* Arrival TIme */}
            <div className="my-4">
              <div className="flex justify-between px-2 my-2">
                <h1>Arrival Time</h1>
                {/*  <button className="text-sm text-primarycolors-red ">
                  Clear
                </button> */}
              </div>
              <div className="grid grid-cols-2 box-border m-2 ">
                {Time.map((item, index) => {
                  return (
                    <button
                      onClick={() => handleArrivalTime(item.timeRange)}
                      key={index}
                      className={` ${
                        filterArrivalTime[item.timeRange]
                          ? "bg-primarycolors-red/90 text-primarycolors-white"
                          : "bg-primarycolors-white hover:bg-primarycolors-gray "
                      }  p-1 border-primarycolors-gray border-[1px] `}
                    >
                      <div className="flex flex-col gap-1 items-center justify-center">
                        {item.icon}
                        <p className="text-xs">{item.label} </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Left;
