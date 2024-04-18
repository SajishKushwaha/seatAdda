import React, { useState } from "react";
import { BiMapPin, BiMobile, BiUser } from "react-icons/bi";
import "./account.css";
import man from "../../assets/man.png";
import women from "../../assets/women.png";
import {
  MdArrowForwardIos,
  MdCardTravel,
  MdCreditCard,
  MdLogout,
  MdMailOutline,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { FaGooglePay } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/auth/action";
const AccountSection = ({ isEditable, userData, setUserData, onSave }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGenderChange = (gender) => {
    setUserData((prevData) => ({
      ...prevData,
      gender: gender,
    }));
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    // console.log("Logged Out");
    toast.success("Logged Out");
    navigate("/");
  };

  return (
    <div className="pb-[2rem]">
      <div className="border-[1px] rounded-lg m-2 border-primarycolors-gray">
        <form className="accountform px-3 py-1">
          <div className="flex gap-0">
            <div className="flex">
              <BiUser className="text-2xl text-primarycolors-red" />
            </div>
            <div className="group flex gap-3 items-center">
              <input
                name="username"
                placeholder=""
                type="text"
                required=""
                value={userData.username}
                onChange={handleInputChange}
                readOnly={isEditable}
              />
              <label htmlFor="username">Name</label>
            </div>
          </div>
          <hr className="border-primarycolors-gray " />
          <div className="flex gap-0 mt-5">
            <div className="flex">
              <BiMobile className="text-2xl text-primarycolors-red" />
            </div>
            <div className="group flex gap-3 items-center">
              <input
                name="usermobile"
                placeholder=""
                type="tel"
                required=""
                value={userData.usermobile}
                onChange={handleInputChange}
                readOnly={isEditable}
              />
              <label htmlFor="usermobile">Mobile</label>
            </div>
          </div>
          <hr className="border-primarycolors-gray " />
          <div className="flex gap-0 mt-5">
            <div className="flex">
              <MdMailOutline className="text-2xl text-primarycolors-red" />
            </div>
            <div className="group flex gap-3 items-center">
              <input
                name="useremail"
                placeholder=""
                type="text"
                required=""
                value={userData.useremail}
                onChange={handleInputChange}
                readOnly={isEditable}
              />
              <label htmlFor="useremail">Email</label>
            </div>
          </div>

          <hr className="border-primarycolors-gray " />
          <div className="grid grid-cols-2 gap-0 mt-5">
            <div className="flex   ">
              <div className="flex">
                <MdOutlineCalendarMonth className="text-2xl text-primarycolors-red" />
              </div>
              <div className="group  flex flex-grow gap-3 items-center">
                <input
                  className="w-fit"
                  name="userBirthDate"
                  placeholder=""
                  type="date"
                  required=""
                  value={userData.userBirthDate}
                  onChange={handleInputChange}
                  readOnly={isEditable}
                />
                <label htmlFor="userBirthDate">Birth Date</label>
              </div>
            </div>
            <div className="flex items-start -mt-1 justify-end pr-3  gap-3">
              <div className="flex">
                <img
                  src={man}
                  alt="Male"
                  className={`gendericon rounded-full  ${
                    userData.gender === "male"
                      ? "bg-primarycolors-red border-[1px]"
                      : ""
                  } cursor-pointer`}
                  onClick={() => handleGenderChange("male")}
                />
              </div>
              <div className="flex">
                <img
                  src={women}
                  alt="Female"
                  className={` gendericon rounded-full  ${
                    userData.gender === "female"
                      ? "bg-primarycolors-red border-[1px]"
                      : ""
                  } cursor-pointer`}
                  onClick={() => handleGenderChange("female")}
                />
              </div>
            </div>
          </div>
        </form>
      </div>{" "}
      <div className="border-[1px] rounded-lg m-2 my-2 border-primarycolors-gray">
        <div className="flex justify-between items-center px-2 py-4 gap-0">
          <div className="flex  gap-3">
            <div className="flex">
              <MdCardTravel className="text-2xl text-primarycolors-red" />
            </div>
            <div className="group text-primarycolors-textcolor">
              Traveller Details
            </div>
          </div>
          <div className="text-xl">
            {" "}
            <NavLink to="/account">
              {" "}
              <MdArrowForwardIos />
            </NavLink>
          </div>
        </div>
        <hr className="border-primarycolors-gray " />
        <div className="flex justify-between items-center px-2 py-4 gap-0">
          <div className="flex  gap-3">
            <div className="flex">
              <MdCreditCard className="text-2xl text-primarycolors-red" />
            </div>
            <div className="group text-primarycolors-textcolor ">
              Saved Cards
            </div>
          </div>
          <div className="text-xl">
            {" "}
            <NavLink to="/account">
              {" "}
              <MdArrowForwardIos />
            </NavLink>
          </div>
        </div>
        <hr className="border-primarycolors-gray " />
        <div className="flex justify-between items-center px-2 py-4 gap-0">
          <div className="flex  gap-3">
            <div className="flex">
              <BiMapPin className="text-2xl text-primarycolors-red" />
            </div>
            <div className="group flex gap-3 text-primarycolors-textcolor items-center">
              Billing Address
            </div>
          </div>
          <div className="text-xl">
            {" "}
            <NavLink to="/account">
              {" "}
              <MdArrowForwardIos />
            </NavLink>
          </div>
        </div>
        <hr className="border-primarycolors-gray " />
        <div className="flex justify-between items-center px-2 py-4 gap-0">
          <div className="flex  gap-2">
            <div className="flex">
              <FaGooglePay className="text-3xl text-primarycolors-red" />
            </div>
            <div className="group flex gap-3 text-primarycolors-textcolor  items-center">
              UPI Payment / Instant Refund
            </div>
          </div>
          <div className="text-xl">
            {" "}
            <NavLink to="/account">
              {" "}
              <MdArrowForwardIos />
            </NavLink>
          </div>
        </div>
      </div>
      <div className="border-[1px] rounded-lg m-2 my-2 border-primarycolors-gray">
        <div onClick={handleLogout} className="flex justify-between items-center px-2 py-4 gap-0">
          <div  className="flex  gap-3">
            <div  className="flex">
              <MdLogout className="text-2xl text-primarycolors-red" />
            </div>
            <div className="group text-primarycolors-textcolor ">Signout</div>
          </div>
          <div className="text-xl">
            {" "}
            <NavLink >
              {" "}
              <MdArrowForwardIos />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSection;
