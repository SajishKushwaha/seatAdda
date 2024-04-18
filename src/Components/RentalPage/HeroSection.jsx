import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import {
  BiSolidMap,
  BiSolidCalendar,
  BiSolidNavigation,
  BiTransfer,
} from "react-icons/bi";
import "react-calendar/dist/Calendar.css";
import { NavLink, useNavigate } from "react-router-dom";
// const times = [
//   "12:00",
//   "13:00",
//   "14:00",
//   "15:00",
//   "16:00",
//   "17:00",
//   "18:00",
//   "19:00",
//   "20:00",
// ];

const routes = [
  "Motihari",
  "Muzaffarpur",
  "Mumbai, Maharashtra",
  "Delhi, Delhi",
  "Kolkata, West Bengal",
  "Chennai, Tamil Nadu",
  "Bengaluru, Karnataka",
  "Hyderabad, Telangana",
  "Ahmedabad, Gujarat",
  "Pune, Maharashtra",
  "Jaipur, Rajasthan",
];
const HeroSection = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [twoWay, setTwoWay] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showCalendar1, setShowCalendar1] = useState(false);
  const [return_date, setreturn_date] = useState(new Date());
  const [showCalendar2, setShowCalendar2] = useState(false);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [showFromRoutes, setShowFromRoutes] = useState(false);
  const [showToRoutes, setShowToRoutes] = useState(false);
  const [filterRoutes, setfilterRoutes] = useState(routes);
  const times = [];

  for (let i = 0; i < 24; i++) {
    const hour = i < 10 ? `0${i}` : `${i}`;
    times.push(`${hour}:00`);
  }

  // console.log(times);
  const isSmallDevice = window.innerWidth <= 768;
  const handleDate = (value) => {
    setDate(value);
    setShowCalendar1(false);
  };

  const handleTransfer = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  const handleReturnDate = (value) => {
    setreturn_date(value);
    setShowCalendar2(false);
  };

  const handleSearch = () => {
    if (!fromLocation.trim() || !toLocation.trim()) {
      alert("Please provide both 'Leaving From' and 'Going to' locations.");
    } else {
      navigate(
        `/rental-bus?departure=${fromLocation}&arrival=${toLocation}&date=${date}`
      );
    }
  };

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

  return (
    <section className=" bg-hero  bg-cover bg-center bg-no-repeat">
      <div className="backdrop-blur-[0.5px] flex items-center justify-center">
        <div className="flex items-center justify-center text-center ">
          <div className="my-5 lg:p-10">
            <div className="">
              <h1 className="text-primarycolors-white text-2xl">
                Book Rentals Tickets
              </h1>
              <div className="flex flex-wrap justify-center mt-3 text-primarycolors-white">
                <NavLink to="/">
                  {" "}
                  <button className="bg-primarycolors-white text-primarycolors-black text-xl  m-3 px-7 py-2 rounded-full">
                    Buses
                  </button>
                </NavLink>
                <NavLink to="/rental">
                  <button className="bg-primarycolors-red  text-xl  m-3 px-7 py-2 rounded-full">
                    Rental
                  </button>
                </NavLink>
              </div>
            </div>
            <div className="flex flex-wrap relative justify-center md:justify-end mt-3 md:mr-10 text-primarycolors-white">
              <div className="radio-container flex items-center gap-1">
                {/* <span className="radio-checkmark"></span> */}
                <input
                  type="radio"
                  name="tripType"
                  checked={!twoWay}
                  onChange={() => setTwoWay(false)}
                />{" "}
                <label className="radio-container mr-4">One Way</label>
              </div>
              <div className="radio-container flex items-center gap-1">
                {/* <span className="radio-checkmark"></span> */}
                <input
                  className=""
                  type="radio"
                  name="tripType"
                  checked={twoWay}
                  onChange={() => setTwoWay(true)}
                />
                <label className="radio-container">Two Way</label>
              </div>

              {/*  <div class="radio-buttons-container">
                <div class="radio-button">
                  <input
                    name="radio-group"
                    id="radio2"
                    class="radio-button__input"
                    type="radio"
                  />
                  <label for="radio2" class="radio-button__label">
                    <span class="radio-button__custom"></span>
                    Next
                  </label>
                </div>
                <div class="radio-button">
                  <input
                    name="radio-group"
                    id="radio1"
                    class="radio-button__input"
                    type="radio"
                  />
                  <label for="radio1" class="radio-button__label">
                    <span class="radio-button__custom"></span>
                    Svelte
                  </label>
                </div>
                <div class="radio-button">
                  <input
                    name="radio-group"
                    id="radio3"
                    class="radio-button__input"
                    type="radio"
                  />
                  <label for="radio3" class="radio-button__label">
                    <span class="radio-button__custom"></span>
                    Remix
                  </label>
                </div>
              </div> */}
            </div>
            <div className="md:flex lg:p-5  ">
              <div className="md:flex  relative   mb-2 md:bg-primarycolors-white rounded-xl  md:rounded-xl">
                <div className="flex relative flex-shrink bg-primarycolors-white rounded-xl md:rounded-none mx-2 focus:border-2 items-center md:w-full p-2 my-4 md:my-0">
                  <BiSolidNavigation
                    className="text-primarycolors-red"
                    size={30}
                  />
                  <input
                    className="appearance-none block w-full py-1 outline-none px-4"
                    id=""
                    value={fromLocation}
                    required
                    type="text"
                    placeholder="Leaving From"
                    onChange={(e) => {
                      setFromLocation(e.target.value);
                      setShowFromRoutes(true);
                    }}
                    onFocus={() => {
                      setShowFromRoutes(true);
                      setShowToRoutes(false);
                    }}
                  />
                  {showFromRoutes && (
                    <div className="absolute w-full rounded-lg top-[41px] overflow-hidden left-0 sm:left-2 ">
                      <div className="custom-scroll-container ">
                        <ul className="custom-scrollbar bg-primarycolors-white list border-[1px] border-primarycolors-textcolor absolute  mt-3 w-[100%] overflow-y-auto max-h-[200px] rounded-lg shadow-lg">
                          {filterRoutes.map((route) => (
                            <li
                              key={route.city}
                              className="cursor-pointer py-1  hover:bg-primarycolors-red/50"
                              onClick={() => {
                                setFromLocation(route.city);
                                setShowFromRoutes(false);
                              }}
                            >
                              {route.city}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute justify-end w-full md:w-auto top-10 md:top-0  z-[1] md:relative flex  px-5   md:justify-center items-center md:mx-2 lg:mx-4">
                  <button onClick={handleTransfer}>
                    <BiTransfer
                      className="text-primarycolors-white bg-primarycolors-red ,md:text-primarycolors-textcolor p-1  border-none rounded-full rotate-90 md:rotate-0"
                      size={30}
                    />
                  </button>
                </div>
                <div className="flex relative bg-primarycolors-white rounded-xl md:rounded-none mx-2 items-center md:w-full p-2 my-4 md:my-0  ">
                  <BiSolidMap className="text-primarycolors-red" size={30} />
                  <input
                    className="appearance-none block w-full py-1 outline-none px-4"
                    id=""
                    type="text"
                    required
                    placeholder="Going to"
                    value={toLocation}
                    onChange={(e) => {
                      setToLocation(e.target.value);
                      setShowToRoutes(true);
                    }}
                    onFocus={() => {
                      setShowToRoutes(true);
                      setShowFromRoutes(false);
                    }}
                  />

                  {showToRoutes && (
                    <div className="absolute w-full rounded-lg top-[41px] overflow-hidden  left-0  sm:ml-[4px]">
                      <div className="custom-scroll-container ">
                        <ul className="custom-scrollbar bg-primarycolors-white list border-[1px] border-primarycolors-textcolor absolute  mt-3 w-[100%] overflow-y-auto max-h-[200px] rounded-lg shadow-lg">
                          {filterRoutes.map((route) => (
                            <li
                              key={route.city}
                              className="cursor-pointer py-1   hover:bg-primarycolors-red/50"
                              onClick={() => {
                                setToLocation(route.city);
                                setShowToRoutes(false);
                              }}
                            >
                              {route.city}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`flex flex-shrink relative bg-primarycolors-white rounded-xl  md:rounded-none mx-2 items-center md:w-full p-2 my-4 md:my-0 ${
                    twoWay ? "md:rounded-r-xl" : ""
                  } md:border-l-[1px]`}
                >
                  <BiSolidCalendar
                    className="text-primarycolors-red"
                    size={30}
                  />
                  {/*  <input
                                        className="my-auto appearance-none block w-full py-1 outline-none px-4"
                                        id=""
                                        type='date'
                                        placeholder="Date of Journey"
                                    /> */}

                  <label
                    htmlFor=" "
                    className="text-xs text-primarycolors-textcolor overflow-hidden absolute top-[2px] left-[50px]"
                  >
                    Hire From
                  </label>
                  <div className="ml-3">
                    <input
                      id="departure"
                      required
                      className="w-auto outline-none  mt-2"
                      value={date.toLocaleDateString("en-GB")}
                      onFocus={() => setShowCalendar1(true)}
                    />
                    {/*  <Calendar
                      className={showCalendar1 ? "absolute calender" : "hide"}
                      value={date}
                      onChange={handleDate}
                      minDate={new Date()}
                    /> */}

                    {isSmallDevice && showCalendar1 && (
                      <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-10">
                        <div className="bg-white p-4 rounded-lg w-5/6">
                          <Calendar
                            value={date}
                            onChange={handleDate}
                            minDate={new Date()}
                          />
                        </div>
                      </div>
                    )}

                    {!isSmallDevice && showCalendar1 && (
                      <Calendar
                        className="absolute z-[100]"
                        value={date}
                        onChange={handleDate}
                        minDate={new Date()}
                      />
                    )}
                  </div>
                  <div className="absolute inset-y-0 right-2 flex items-center">
                    <select
                      id="start-time"
                      name="start-time"
                      placeholder="Time"
                      className="h-full  rounded-md border-0  bg-primarycolors-white py-0 pl-2 pr-2 sm:pr-1  text-gray-500  sm:text-sm"
                    >
                      <option>Time</option>
                      {times.map((time) => (
                        <option className="">{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {twoWay && (
                  <div className="flex flex-shrink relative bg-primarycolors-white rounded-xl md:rounded-l-none mx-2 md:rounded-r-xl md:border-l-[1px]  items-center md:w-full p-2 my-4 md:my-0 ">
                    <BiSolidCalendar
                      className="text-primarycolors-red"
                      size={30}
                    />
                    {/*  <input
                                        className="my-auto appearance-none block w-full py-1 outline-none px-4"
                                        id=""
                                        type='date'
                                        placeholder="Date of Journey"
                                    /> */}
                    <label
                      htmlFor=" "
                      className="text-xs text-primarycolors-textcolor overflow-hidden absolute top-[2px] left-[50px]"
                    >
                      Hire Till
                    </label>
                    <div className="ml-3">
                      <input
                        required
                        value={return_date.toLocaleDateString("en-GB")}
                        onFocus={() => setShowCalendar2(true)}
                        className="outline-none w-auto mt-2"
                      />
                      {/*  <Calendar
                        className={showCalendar2 ? "absolute w-fit" : "hide"}
                        value={return_date}
                        onChange={handleReturnDate}
                        minDate={new Date()}
                      /> */}

                      {isSmallDevice && showCalendar2 && (
                        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-10">
                          <div className="bg-white p-4 rounded-lg w-5/6">
                            <Calendar
                              value={return_date}
                              onChange={handleReturnDate}
                              minDate={new Date()}
                            />
                          </div>
                        </div>
                      )}

                      {!isSmallDevice && showCalendar2 && (
                        <Calendar
                          className="absolute z-[100]"
                          value={return_date}
                          onChange={handleReturnDate}
                          minDate={new Date()}
                        />
                      )}
                    </div>
                    <div className="absolute inset-y-0 right-2 flex items-center">
                      <select
                        id="end-time"
                        name="end-time"
                        placeholder="Time"
                        className="h-full rounded-md border-0 bg-primarycolors-white py-0 pl-2 pr-2 sm:pr-1  text-gray-500  sm:text-sm"
                      >
                        <option>Time</option>
                        {times.map((time) => (
                          <option>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              onClick={handleSearch}
              className="md:flex mb-2 w-[98%] md:w-fit mx-auto bg-primarycolors-red rounded-lg "
            >
              <div className="md:w-full  p-1 mb-6 md:mb-0">
                <button
                  type="submit"
                  className="py-1 px-3 mx-3 text-primarycolors-white text-lg"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
