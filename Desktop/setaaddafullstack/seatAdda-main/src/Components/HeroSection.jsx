import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import {
  BiSolidMap,
  BiSolidCalendar,
  BiSolidNavigation,
  BiTransfer,
  BiSolidCity,
} from "react-icons/bi";
import { MdLocationCity } from "react-icons/md";
import { NavLink } from "react-router-dom";

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
const HeroSection = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [showFromRoutes, setShowFromRoutes] = useState(false);
  const [showToRoutes, setShowToRoutes] = useState(false);
  const [filterRoutes, setfilterRoutes] = useState([]);
  const isSmallDevice = window.innerWidth <= 768;

  const filterBySearch = (event) => {
    const query = event.target.value;
    var updatedList = [...routes];
    updatedList = updatedList.filter((item) => {
      return item.city.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setfilterRoutes(updatedList);
  };

  const handleDate = (value) => {
    setDate(value);
    setShowCalendar(false);
  };

  const handleTransfer = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };
  const handleSearch = () => {
    if (!fromLocation.trim() || !toLocation.trim()) {
      alert("Please provide both 'Leaving From' and 'Going to' locations.");
    } else {
      // console.log(`date:${date}`);
      // const formattedDate = date.toISOString().split("T")[0];
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
      var day = ("0" + date.getDate()).slice(-2);

      // Format the date as "Y-m-d"
      var formattedDate = year + "-" + month + "-" + day;
      navigate(
        `/select-bus?departure=${fromLocation}&arrival=${toLocation}&date=${formattedDate}`
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
          <div className="my-5 sm:p-10">
            <div className="">
              <h1 className="text-primarycolors-white text-2xl">
                Book Bus Tickets
              </h1>
              <div className="flex flex-wrap justify-center mt-3 text-primarycolors-white">
                <NavLink to="/">
                  {" "}
                  <button className="bg-primarycolors-red text-xl  m-3 px-7 py-2 rounded-full">
                    Buses
                  </button>
                </NavLink>
                <NavLink to="/rental">
                  <button className="bg-primarycolors-white text-primarycolors-black text-xl  m-3 px-7 py-2 rounded-full">
                    Rental
                  </button>
                </NavLink>
                {/*  <button className='bg-primarycolors-white text-primarycolors-black m-3 px-4 py-1 rounded-full'>Trains</button>
                        <button className='bg-primarycolors-white text-primarycolors-black m-3 px-4 py-1 rounded-full'>Hotels</button> */}
              </div>
            </div>
            <div className="md:flex p-5">
              <div className="md:flex mb-2 relative md:bg-primarycolors-white rounded-xl md:rounded-none md:rounded-l-xl">
                <div className="flex relative bg-primarycolors-white rounded-xl md:rounded-none mx-2 focus:border-2 items-center md:w-full p-2 my-4 md:my-0">
                  <BiSolidNavigation
                    className="text-primarycolors-red"
                    size={30}
                  />
                  <input
                    className="block w-full py-1 outline-none px-4"
                    id=""
                    type="text"
                    placeholder="Leaving From"
                    value={fromLocation}
                    onChange={(e) => {
                      filterBySearch(e);
                      setFromLocation(e.target.value);
                      setShowFromRoutes(true);
                    }}
                    onFocus={() => {
                      setShowFromRoutes(true);
                      setShowToRoutes(false);
                    }}
                  />{" "}
                  {showFromRoutes && (
                    <div className="absolute w-full rounded-lg top-[41px] overflow-hidden left-0 sm:left-2 ">
                      <div className="custom-scroll-container ">
                        <ul className="custom-scrollbar bg-primarycolors-white list border-[1px] border-primarycolors-textcolor absolute  mt-3 w-[100%] overflow-y-auto max-h-[200px] rounded-lg shadow-lg">
                          {filterRoutes.map((route) => (
                            <li
                              key={route.city}
                              className="cursor-pointer py-1 pl-5 hover:bg-primarycolors-red/50"
                              onClick={() => {
                                setFromLocation(route.city);
                                setShowFromRoutes(false);
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
                <div className="absolute justify-end w-full md:w-auto top-10 md:top-0  z-[1] md:relative flex  px-5   md:justify-center items-center md:mx-2 lg:mx-4">
                  <button onClick={handleTransfer}>
                    <BiTransfer className="text-primarycolors-white text-3xl md:text-3xl bg-primarycolors-red ,md:text-primarycolors-textcolor p-1  border-none rounded-full rotate-90 md:rotate-0" />
                  </button>
                </div>
                <div className="flex relative z-1 bg-primarycolors-white rounded-xl md:rounded-none mx-2 focus:border-2 items-center md:w-full p-2 my-4 md:my-0">
                  <BiSolidMap className="text-primarycolors-red" size={30} />
                  <input
                    className="block w-full py-1 outline-none px-4"
                    id=""
                    type="text"
                    placeholder="Going to"
                    value={toLocation}
                    onChange={(e) => {
                      filterBySearch(e);
                      setToLocation(e.target.value);
                      setShowToRoutes(true);
                    }}
                    onFocus={() => {
                      setShowToRoutes(true);
                      setShowFromRoutes(false);
                    }}
                  />{" "}
                  {showToRoutes && (
                    <div className="absolute w-full rounded-lg top-[41px] overflow-hidden  left-0  sm:ml-[10px]">
                      <div className="custom-scroll-container ">
                        <ul className="custom-scrollbar bg-primarycolors-white list border-[1px] border-primarycolors-textcolor absolute  mt-3 w-[100%] overflow-y-auto max-h-[200px] rounded-lg shadow-lg">
                          {filterRoutes.map((route) => (
                            <li
                              key={route.city}
                              className="cursor-pointer py-1 pl-5 hover:bg-primarycolors-red/50"
                              onClick={() => {
                                setToLocation(route.city);
                                setShowToRoutes(false);
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
                {/*  <div className="flex flex-shrink relative bg-primarycolors-white rounded-xl md:rounded-none mx-2 items-center md:w-full p-2 my-4 md:my-0 md:border-l-[1px]">
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
                  // onClick={() => setShowCalendar(!showCalendar)}
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
                        value={date.toLocaleDateString("en-GB")}
                        onFocus={() => setShowCalendar(true)}
                      />
                    )}
                    {isSmallDevice && (
                      <button
                        className="w-auto outline-none mt-2"
                        onClick={() => setShowCalendar(true)}
                      >
                        {date.toLocaleDateString("en-GB")}
                      </button>
                    )}
                    {isSmallDevice && showCalendar && (
                      <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-10">
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
                        className="absolute z-[100]"
                        // value={date}
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
                    Search
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

export default HeroSection;
