import React from "react";
import { BiArrowBack, BiBus } from "react-icons/bi";
// import { FaLocationCrosshairs } from "react-icons/fa6";
// import { MdStar } from "react-icons/md";
// import { BiUser } from "react-icons/bi";
import "./book.css";
const Upcoming = ({ bookinghistory }) => {
  console.log(bookinghistory);
  function convertTo12HourFormat(time) {
    // Parse the time string
    const [hours, minutes] = time.split(":").map((num) => parseInt(num));

    // Determine AM or PM
    const suffix = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const adjustedHours = hours % 12 || 12;

    // Return formatted time
    return `${adjustedHours}:${minutes < 10 ? "0" : ""}${minutes} ${suffix}`;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "short", day: "2-digit", month: "long" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    const parts = formattedDate.split(" ");
    return `${parts[0]} ${parts[2]} ${parts[1]}`;
  };
  return (
    <div className="m-3 childscroll overflow-y-scroll  md:h-[800px] mb-[7rem] sm:mb-[1rem]">
      {bookinghistory.map((data, index) => {
        return (
          <div
            key={index}
            className="shadow-md my-3 rounded-xl border-[1px] border-primarycolors-gray"
          >
            <div className="m-1">
              <h2 className="text-left text-[12px] px-3 py-2 pb-1 sm:text-sm">
                {data.travels_name}
              </h2>
              <div className="  gap-5 p-3 border-t-[1px] border-primarycolors-gray">
                <div className="flex items-center  justify-between pb-3">
                  <div className="flex items-center">
                    <div>
                      <BiBus className="text-primarycolors-red text-4xl md:text-4xl" />
                    </div>
                    <div className="flex flex-col items-start px-3">
                      <div>
                        {convertTo12HourFormat(data.boarding_time) +
                          " | " +
                          data.sourse}
                      </div>
                      <div className="arival_date">
                        {formatDate(data.boarding_date)}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 truncate">
                    <BiArrowBack className="font-light text-xl rotate-180" />
                  </div>
                  <div className="flex flex-col items-start px-4">
                    <div>
                      {convertTo12HourFormat(data.arrival_time) +
                        " | " +
                        data.destination}
                    </div>

                    <div className="arival_date">
                      {formatDate(data.arrival_date)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-5 sm:pr-5 p-1 border-t-[1px]  border-primarycolors-gray  ">
                <div className="StatusBooked">
                  <h1>Status:BOOKED</h1>
                </div>
                <div>
                  <p>{`Boarding Station: ${data.boading_points}`}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Upcoming;
