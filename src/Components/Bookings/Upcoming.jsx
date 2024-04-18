import React from 'react'
import { BiArrowBack, BiBus } from 'react-icons/bi';

const Upcoming = () => {
    const BOOKING_DATA = [
        {
            departure: "Jaipur( Rajasthan,31240005 ) ",
            arrival: "Surat ( Gujarat,31240005 )",
            status: "Successfully Booked",
            time: "22:45 10-Aug-2023",
        },
        {
            departure: "Chittorgrah ( Rajasthan,31240005 )",
            arrival: "Ahmdabaad ( Gujarat,31240005 )",
            status: "Successfully Booked",
            time: "22:15 12-Aug-2023",
        },
        {
            departure: "Mumbai ( Rajasthan,31240005 )",
            arrival: "Delhi ( Rajasthan,31240005 )",
            status: "Successfully Booked",
            time: "20:45 13-Aug-2023",
        },
        {
            departure: "Kolkata ( Rajasthan,31240005 )",
            arrival: "Delhi ( Rajasthan,31240005 )",
            status: "Successfully Booked",
            time: "12:05 15-Aug-2023",
        },
        {
            departure: "Chittorgrah ( Rajasthan,31240005 )",
            arrival: "Ahmdabaad ( Gujarat,31240005 )",
            status: "Successfully Booked",
            time: "22:15 12-Aug-2023",
        },
    ];
    return (
        <div className="m-3 childscroll overflow-y-scroll h-[550px] md:h-[800px] mb-[7rem] sm:mb-[1rem]">
        {BOOKING_DATA.map((data, index) => {
          return (
            <div
              key={index}
              className="shadow-md my-3 rounded-xl border-[1px] border-primarycolors-gray"
            >
             <div className="m-1">
                <h2 className="text-left text-[12px] px-2 py-2 pb-1 sm:text-sm">Bus Booking</h2>
                <div className="flex items-center pb-3 px-3  ">
                    <div className="text-left w-1/3 truncate">{data.departure}</div>
                    <div className="w-1/3 truncate"><BiArrowBack className="font-light text-xl rotate-180" /></div>
                    <div className="w-1/3 truncate text-left sm:text-right">{data.arrival}</div>

                </div>
                <div className="flex items-center justify-start gap-5 p-3 border-t-[1px]  border-primarycolors-gray  ">
                   <div className="">
                    <BiBus className=" text-primarycolors-red text-4xl md:text-4xl"/>
                   </div>

                   <div className="text-left">
                    <div>
                       <p className="my-1 text-[13px] sm:text-base "> <span>Status: </span> <span className=" text-primarycolors-skyblue  font-bold font-serif">{data.status}</span></p>
                    </div>
                    <div>
                       <p className="my-1 text-[13px] sm:text-base"> <span>Time: </span> <span className=" font-bold">{data.time}</span></p>
                    </div>
                   </div>

                </div>
                <div className="flex items-center justify-end gap-5 sm:pr-5 p-1 border-t-[1px]  border-primarycolors-gray  ">
                   <div className="">
                    <button className=" text-primarycolors-red">View</button>
                   </div>

                 

                </div>
             </div>
            </div>
          );
        })}
      </div>
    )
}

export default Upcoming