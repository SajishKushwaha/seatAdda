import React from "react";
import { BiSolidShieldPlus, BiSortUp } from "react-icons/bi";

const SortingBar = () => {
  const handleSortProperty = (value) => {};
  return (
    <div className="hidden md:block">
      <div className=" md:flex text-primarycolors-textcolor items-center justify-center p-3">
        <BiSolidShieldPlus size={20} />
        <div> All bus ratings include safety as a major factor</div>
      </div>
      <hr className="" />
     {/*  <div className="flex flex-wrap md:justify-between items-start   bg-primarycolors-gray/60 p-3">
        <div className="font-bold">SORT BY :</div>

        <div
          className="flex justify-center items-center"
          onClick={() => handleSortProperty("departure")}
        >
          <div className="mx-2">Departure Time</div>
          <BiSortUp size={20} />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => handleSortProperty("duration")}
        >
          <div className="mx-2">Duration</div>
          <BiSortUp size={20} />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => handleSortProperty("arrivals")}
        >
          <div className="mx-2">Arrival time</div>
          <BiSortUp size={20} />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => handleSortProperty("ratings")}
        >
          <div className="mx-2">Ratings</div>
          {<BiSortUp size={20}/>}
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => handleSortProperty("fare")}
        >
          <div className="mx-2">Fare</div>
          <BiSortUp size={20} />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => handleSortProperty("seatsAvailable")}
        >
          <div className="mx-2">Seats Available</div>
          <BiSortUp size={20} />
        </div>
      </div>  */}
    </div>
  );
};

export default SortingBar;
