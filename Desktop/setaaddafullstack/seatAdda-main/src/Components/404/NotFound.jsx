import React from "react";
import notfound from "../../assets/404.svg";
import { NavLink } from "react-router-dom";
const NotFound = () => {
  return (
    <div>
      <div className="">
        <img className=" w-screen" src={notfound} alt="" />
      </div>

      <div className=" hidden md:flex absolute  md:-bottom-8 right-0 sm:right-5 w-1/2 justify-center gap-5">
        <NavLink to="/">
          <button className=" p-1 md:py-2 px-3 md:px-10 bg-primarycolors-red hover:bg-primarycolors-white hover:border-primarycolors-red hover:border-[1px] hover:text-primarycolors-black font-bold text-primarycolors-white rounded-full w-fit ">
            Home
          </button>
        </NavLink>
        <NavLink to="/contact">
          <button className=" w-fit p-1 md:py-2 px-3 md:px-10 border-[1px] hover:bg-primarycolors-red hover:text-primarycolors-white border-primarycolors-red font-bold text-primarycolors-black rounded-full">
            Contact
          </button>
        </NavLink>
      </div>
      <div className=" flex md:hidden absolute top-[11rem] right-0 sm:right-5 w-1/2  mr-1 justify-between gap-1">
        <NavLink to="/">
          <button className=" p-1 md:py-2 px-3 md:px-10 bg-primarycolors-red hover:bg-primarycolors-white hover:border-primarycolors-red hover:border-[1px] hover:text-primarycolors-black font-bold text-primarycolors-white rounded-full w-fit ">
            Home
          </button>
        </NavLink>
        <NavLink to="/contact">
          <button className=" w-fit p-1 md:py-2 px-3 md:px-10 border-[1px] hover:bg-primarycolors-red hover:text-primarycolors-white border-primarycolors-red font-bold text-primarycolors-black rounded-full">
            Contact
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
