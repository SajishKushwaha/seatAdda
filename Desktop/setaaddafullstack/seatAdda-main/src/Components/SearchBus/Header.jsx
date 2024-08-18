import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BiSolidMap,
  BiSolidCalendar,
  BiSolidNavigation,
  BiTransfer,
} from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Calendar from "react-calendar";
import { MdLocationCity } from "react-icons/md";
import Select from "react-select";
import "./index.css";
// const routes = [
//   "Motihari",
//   "Muzaffarpur",
//   "Mumbai, Maharashtra",
//   "Delhi, Delhi",
//   "Kolkata, West Bengal",
//   "Chennai, Tamil Nadu",
//   "Bengaluru, Karnataka",
//   "Hyderabad, Telangana",
//   "Ahmedabad, Gujarat",
//   "Pune, Maharashtra",
//   "Jaipur, Rajasthan",
// ];
const Header = ({ setIsCalender }) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const departure = query.get("departure");
  const arrival = query.get("arrival");
  const urldate = query.get("date");
  /*  let dateStr = query.get("date");
 
   const currdate = dayjs(dateStr).format('DD/MM/YYYY') */

  // console.log(isoString);
  const [routes, setRoutes] = useState([]);
  const [date, setDate] = useState(urldate);
  const [showCalendar, setShowCalendar] = useState(false);
  const [fromLocation, setFromLocation] = useState(departure);
  const [toLocation, setToLocation] = useState(arrival);
  const [showFromRoutes, setShowFromRoutes] = useState(false);
  const [showToRoutes, setShowToRoutes] = useState(false);
  const [filterRoutes, setfilterRoutes] = useState(routes);
  const isSmallDevice = window.innerWidth <= 768;
  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...routes];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.city.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // console.log(updatedList);
    setfilterRoutes(updatedList);
  };

  const handleDate = (value) => {
    setDate(value.toLocaleDateString("en-GB"));
    setShowCalendar(false);
    setIsCalender(false);
  };

  const handleTransfer = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  const handleSearch = () => {
    // var year = date.getFullYear();
    // var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
    // var day = ("0" + date.getDate()).slice(-2);

    // // Format the date as "Y-m-d"
    // var formattedDate = year + "-" + month + "-" + day;
    const [day, month, year] = date.split("/");
    const outputDate = `${year}-${month}-${day}`;
    // const formattedDate = urldate.toISOString().split("T")[0];
    navigate(
      `/select-bus?departure=${fromLocation}&arrival=${toLocation}&date=${outputDate}`
    );
  };

  const hanldeIsCalender = () => {
    setShowCalendar(true);
    setIsCalender(true);
    setShowFromRoutes(false);
    setShowToRoutes(false);
  };
  useEffect(() => {
    console.log("Adding event listener");
    function handleClickOutside(event) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        !event.target.classList.contains("custom-scrollbar")
      ) {
        setShowFromRoutes(false);
        setShowToRoutes(false);
        setShowCalendar(false);
        setIsCalender(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      console.log("Removing event listener");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const response = await fetch(
          "https://seatadda.co.in/api/source-destination"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data.date);
        setRoutes(data.date);
        setfilterRoutes(data.date);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    }

    fetchRoutes();
  }, []);
  console.log(fromLocation);
  return (
    <section className=" bg-hero  bg-cover bg-center bg-no-repeat ">
      <div className="backdrop-blur-[0.5px] flex items-center justify-center">
        <div className="flex items-center justify-center text-center ">
          <div className="my-1 sm:p-1">
            <div className="md:flex p-5">
              <div
                ref={inputRef}
                className="md:flex mb-2 relative md:bg-primarycolors-white rounded-xl md:rounded-none md:rounded-l-xl"
              >
                <div className="flex relative bg-primarycolors-white rounded-xl md:rounded-none mx-2 focus:border-2 items-center md:w-full p-2 my-4 md:my-0">
                  <BiSolidNavigation
                    className="text-primarycolors-red"
                    size={30}
                  />
                  <label
                    htmlFor=" "
                    className="text-xs text-primarycolors-textcolor overflow-hidden absolute top-[2px] left-[50px]"
                  >
                    Leaving from
                  </label>
                  <input
                    className="block w-full outline-none px-4 mt-2"
                    id=""
                    type="text"
                    placeholder=""
                    value={fromLocation}
                    onChange={(e) => {
                      filterBySearch(e);
                      setFromLocation(e.target.value);
                      setShowFromRoutes(true);
                    }}
                    onFocus={() => {
                      setShowFromRoutes(true);
                      setShowToRoutes(false);
                      setIsCalender(true);
                      setShowCalendar(false);
                    }}
                  />
                  {showFromRoutes && (
                    <div className="absolute w-full rounded-lg top-[41px] overflow-hidden left-2 ">
                      <div className="custom-scroll-container ">
                        <ul className="custom-scrollbar bg-primarycolors-white list border-[1px] border-primarycolors-textcolor/20 absolute  mt-3 w-[100%] overflow-y-auto max-h-[200px] rounded-lg shadow-lg">
                          {filterRoutes.map((route) => (
                            <li
                              key={route.city}
                              className="cursor-pointer py-1 pl-5  hover:bg-primarycolors-red/50"
                              onClick={() => {
                                setFromLocation(route.city);
                                setShowFromRoutes(false);
                                setIsCalender(false);
                              }}
                            >
                              <div className=" flex gap-4 justify-start items-center ">
                                <div>
                                  <MdLocationCity
                                    size={20}
                                    className=" text-primarycolors-red"
                                  />
                                </div>
                                <div>
                                  <p className=" text-left">{route.city}</p>
                                  <p className=" text-[12px] text-primarycolors-textcolor text-left ">
                                    {route.state}
                                  </p>
                                </div>{" "}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {/* <div className="App">
                    <Select
                      className="boradingPoint1"
                      defaultValue={fromLocation}
                      onChange={(selectedOption) => {
                        setFromLocation(selectedOption.label);
                        // setIsOpenDrop(true); // Close the dropdown menu
                      }}
                      placeholder="Search Boarding Point"
                      options={filterstate}
                    />
                  </div> */}
                </div>
                <div className="absolute justify-end w-full md:w-auto top-10 md:top-0  z-[1] md:relative flex  px-5   md:justify-center items-center md:mx-2 lg:mx-4">
                  <button onClick={handleTransfer}>
                    <BiTransfer className="text-primarycolors-white text-3xl md:text-3xl bg-primarycolors-red ,md:text-primarycolors-textcolor p-1  border-none rounded-full rotate-90 md:rotate-0" />
                  </button>
                </div>
                <div className="flex relative bg-primarycolors-white rounded-xl md:rounded-none mx-2 focus:border-2 items-center md:w-full p-2 my-4 md:my-0">
                  <BiSolidMap className="text-primarycolors-red" size={30} />
                  <label
                    htmlFor=" "
                    className="text-xs   text-primarycolors-textcolor overflow-hidden absolute top-[2px] left-[50px]"
                  >
                    Going to
                  </label>
                  <input
                    className="block w-full  outline-none px-4 mt-2"
                    id=""
                    type="text"
                    placeholder="Going to"
                    value={toLocation}
                    onChange={(e) => {
                      filterBySearch(e);
                      setShowToRoutes(true);
                      setToLocation(e.target.value);
                    }}
                    onFocus={() => {
                      setShowToRoutes(true);
                      setShowFromRoutes(false);
                      setIsCalender(true);
                      setShowCalendar(false);
                    }}
                    // onBlur={() => setShowFromRoutes(false)}
                  />{" "}
                  {showToRoutes && (
                    <div className="absolute w-full rounded-lg top-[41px] overflow-hidden ml-[4px]">
                      <div className="custom-scroll-container ">
                        <ul className="custom-scrollbar bg-primarycolors-white list border-[1px] border-primarycolors-textcolor/20 absolute  mt-3 w-[100%] overflow-y-auto max-h-[200px] rounded-lg shadow-lg">
                          {filterRoutes.map((route) => (
                            <li
                              key={route.city}
                              className="cursor-pointer py-1 pl-5  hover:bg-primarycolors-red/50"
                              onClick={() => {
                                setToLocation(route.city);
                                setShowToRoutes(false);
                                setIsCalender(false);
                              }}
                            >
                              <div className=" flex gap-4 justify-start items-center ">
                                <div>
                                  <MdLocationCity
                                    size={20}
                                    className=" text-primarycolors-red"
                                  />
                                </div>
                                <div>
                                  <p className=" text-left">{route.city}</p>
                                  <p className=" text-[12px] text-primarycolors-textcolor text-left ">
                                    {route.state}
                                  </p>
                                </div>{" "}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>{" "}
                {/*    <div className="flex flex-shrink relative bg-primarycolors-white rounded-xl md:rounded-none mx-2 items-center md:w-full p-2 my-4 md:my-0 md:border-l-[1px]">
                  <BiSolidCalendar
                    className="text-primarycolors-red"
                    size={30}
                  />
                  <label
                    htmlFor=" "
                    className="text-xs  text-primarycolors-textcolor overflow-hidden absolute top-[2px] left-[50px]"
                  >
                    Date of Journey
                  </label>
                  <div className="ml-3">
                    <input
                      id=""
                      className="w-auto outline-none mt-2"
                      value={date.toLocaleDateString()}
                      onFocus={() => setShowCalendar(true)}
                    />
                    <Calendar
                      className={showCalendar ? "absolute z-[100]" : "hide"}
                      value={date}
                      onChange={handleDate}
                      minDate={new Date()}
                    />
                  </div>
                </div> */}
                <div
                  ref={inputRef}
                  /*  onClick={() => setShowCalendar(!showCalendar)} */
                  className="flex flex-shrink relative bg-primarycolors-white rounded-xl md:rounded-none mx-2 items-center md:w-full p-2 my-4 md:my-0 md:border-l-[1px]"
                >
                  <BiSolidCalendar
                    className="text-primarycolors-red"
                    size={30}
                  />
                  <label
                    htmlFor=" "
                    className="text-xs text-primarycolors-textcolor overflow-hidden absolute top-[2px] left-[50px]"
                  >
                    Date of Journey
                  </label>
                  <button className="ml-3 ">
                    {!isSmallDevice && (
                      <input
                        id=""
                        className="w-auto outline-none mt-2"
                        value={date}
                        onFocus={hanldeIsCalender}
                      />
                    )}
                    {isSmallDevice && (
                      <button
                        className="w-auto outline-none mt-2"
                        onClick={() => setShowCalendar(true)}
                      >
                        {date}
                      </button>
                    )}
                    {isSmallDevice && showCalendar && (
                      <div className="fixed inset-0 z-10  bg-black bg-opacity-50 flex items-center justify-center ">
                        <div className="bg-white p-4 rounded-lg w-5/6">
                          <Calendar
                            // value={date}
                            onChange={handleDate}
                            minDate={new Date()}
                          />
                        </div>
                      </div>
                    )}
                    {!isSmallDevice && showCalendar && (
                      <Calendar
                        className="absolute"
                        onChange={handleDate}
                        minDate={new Date()}
                      />
                    )}
                  </button>
                </div>
              </div>
              <div
                onClick={handleSearch}
                className="md:flex mb-2 bg-primarycolors-red rounded-xl md:rounded-none md:rounded-r-xl"
              >
                <div className="md:w-full p-2 mb-6 md:mb-0">
                  <button className="py-1 px-3 mx-5 text-primarycolors-white text-lg">
                    Modify
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
