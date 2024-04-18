import React from "react";
import nobookings from "../../assets/error_trips.avif";
import { Navigate, useNavigate } from "react-router-dom";
const NoBookings = ({ name }) => {
    const navigate=useNavigate()
  return (
    <div>
      <div className="mx-auto">
        <h2 className="text-[14px] mb-2 font-semibold text-primarycolors-textcolor">
          You have no {name} Bookings
        </h2>
        <div className="flex justify-center items-center">
          <img
            className=" w-[150px] sm:w-[200px] md:w-[200px]"
            src={nobookings}
            alt=""
          />
        </div>
         <div className="my-3">
      <button onClick={()=>navigate('/')} class="button"> Book Now</button></div>
      </div>{" "}
    
   
      

      
    </div>
  );
};

export default NoBookings;
