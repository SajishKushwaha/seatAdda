import React, { useEffect, useState } from "react";
import { BiMapPin, BiMobile, BiUser } from "react-icons/bi";
import "./account.css";
import man from "../../assets/man.png";
import women from "../../assets/women.png";
import women1 from "../../assets/women1.png";
import women1_ from "../../assets/women1_.png";
import man1png from "../../assets/man1png.png";
import male from "../../assets/male.svg";
import maleselected from "../../assets/maleselected.svg";
import female from "../../assets/female.svg";
import femaleselected from "../../assets/femaleselected.svg";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
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
const AccountSection = ({ isEditable, userData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const phoneNumberPattern = /^\d{10}$/;
  // const isValidemail = emailPattern.test(email);
  // const isValidphone = phoneNumberPattern.test(phone);
  const [name, setName] = useState(userData[0].name);
  const [mobile, setMobile] = useState(userData[0].mobile);
  const [mobileError, setMobileError] = useState(false);
  const [email, setEmail] = useState(userData[0].email);
  const [dob, setDob] = useState(userData[0].dob);
  const [address, setAddress] = useState(userData[0].address);
  const [state, setState] = useState(userData[0].state);
  const [city, setCity] = useState(userData[0].city);
  const [pincode, setPinCode] = useState(userData[0].pin_code);
  const [gender, setGender] = useState(userData[0].gender);
  const [selectedGender, setSelectedGender] = React.useState(
    userData[0].gender
  );
  const handlePassGender = (gender) => {
    setGender(gender);
  };
  const userInputName = (e) => {
    setName(e.target.value);
  };
  console.log(`eoor ${mobileError}`);
  const userInputmobile = (e) => {
    const val = e.target.value;

    if (val === userData[0].mobile) {
      setMobileError(true);
      setMobile(e.target.value);
    } else {
      setMobileError(false);
      setMobile(e.target.value);
    }
  };
  const userInputemail = (e) => {
    setEmail(e.target.value);
  };
  const userInputdob = (e) => {
    setDob(e.target.value);
  };
  const userInputAddress = (e) => {
    setAddress(e.target.value);
  };
  const userInputState = (e) => {
    setState(e.target.value);
  };
  const userInputCity = (e) => {
    setCity(e.target.value);
  };
  const userInputPincode = (e) => {
    setPinCode(e.target.value);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    // console.log("Logged Out");
    Cookies.remove("jwt_token");
    toast.success("Logged Out");
    navigate("/");
  };
  const userId = localStorage.getItem("userData");
  const userIdString = JSON.parse(userId);
  const saveUserDetails = async (event) => {
    event.preventDefault();
    if (mobileError) {
      // Prevent form submission if the mobile number is a duplicate
      return toast.error("Please enter a different mobile number.");
    }
    if (userData[0].email === email) {
      // Prevent form submission if the mobile number is a duplicate
      return toast.error("Please enter a different email number.");
    }
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      userIdString.access_token.split("Bearer")[1]
    );
    const formdata = new FormData();
    formdata.append("user_id", userIdString.user.user_id);
    formdata.append("name", name);
    formdata.append("dob", dob);
    formdata.append("email", email);
    formdata.append("address", address);
    formdata.append("mobile", mobile);
    formdata.append("state", state);
    formdata.append("pincode", pincode);
    formdata.append("city", city);
    formdata.append("gender", gender);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    const response = await fetch(
      "https://seatadda.co.in/auth/api/update-basic-details",
      requestOptions
    );
    const data = await response.json();
    if (data.status === true) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/");
      });
    }
  };
  return (
    <div className="pb-[2rem]">
      <div className="border-[1px] rounded-lg m-2 border-primarycolors-gray mt-16 md:mt-0">
        <form className="accountform px-3 py-1" onSubmit={saveUserDetails}>
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
                value={name}
                onChange={userInputName}
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
                value={mobile}
                onChange={userInputmobile}
                readOnly={isEditable}
              />
              <label htmlFor="usermobile">Mobile</label>
              {/* {mobileError && (
                <p style={{ color: "red" }}>Mobile numbers are the same</p>
              )} */}
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
                // placeholder=""
                type="text"
                // required=""
                value={email}
                onChange={userInputemail}
                readOnly={isEditable}
                style={{
                  width: "100vw ",
                }}
                emailcss
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
                  value={dob}
                  onChange={userInputdob}
                  readOnly={isEditable}
                />
                <label htmlFor="userBirthDate">Birth Date</label>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 w-full">
              <div className="">
                {selectedGender == "male" ? (
                  <img
                    src={maleselected}
                    alt="Male"
                    className={`w-full rounded-full cursor-pointer `}
                    onClick={
                      isEditable
                        ? null
                        : (e) => {
                            handlePassGender("male");
                            setSelectedGender("male");
                          }
                    }
                    style={{ height: "40px", width: "40px" }}
                  />
                ) : (
                  <img
                    src={male}
                    alt="Male"
                    className={`w-full rounded-full cursor-pointer `}
                    onClick={
                      isEditable
                        ? null
                        : (e) => {
                            handlePassGender("male");
                            setSelectedGender("male");
                          }
                    }
                    style={{ height: "40px", width: "40px" }}
                  />
                )}
              </div>
              <div className="ml-3 ">
                {selectedGender == "female" ? (
                  <img
                    src={femaleselected}
                    alt="Female"
                    className={`w-full rounded-full cursor-pointer `}
                    onClick={
                      isEditable
                        ? null
                        : (e) => {
                            handlePassGender("female");
                            setSelectedGender("female");
                          }
                    }
                    style={{ height: "40px", width: "40px" }}
                  />
                ) : (
                  <img
                    src={female}
                    alt="Female"
                    className={`w-full rounded-full cursor-pointer`}
                    onClick={
                      isEditable
                        ? null
                        : (e) => {
                            handlePassGender("female");
                            setSelectedGender("female");
                          }
                    }
                    style={{ height: "40px", width: "40px" }}
                  />
                )}
              </div>
            </div>
          </div>
          <hr className="border-primarycolors-gray " />
          <div className="flex gap-0 mt-5">
            <div className="flex">
              <BiUser className="text-2xl text-primarycolors-red" />
            </div>
            <div className="group flex gap-3 items-center w-full">
              <input
                name="username"
                placeholder=""
                type="text"
                required=""
                value={address}
                onChange={userInputAddress}
                readOnly={isEditable}
                className="w-full"
              />
              <label htmlFor="username">Address</label>
            </div>
          </div>
          <hr className="border-primarycolors-gray " />
          <div className="flex gap-0 mt-5">
            <div className="flex">
              <BiUser className="text-2xl text-primarycolors-red" />
            </div>
            <div className="group flex gap-3 items-center">
              <input
                name="username"
                placeholder=""
                type="text"
                required=""
                value={state}
                onChange={userInputState}
                readOnly={isEditable}
              />
              <label htmlFor="username">State</label>
            </div>
          </div>
          <hr className="border-primarycolors-gray " />
          <div className="flex gap-0 mt-5">
            <div className="flex">
              <BiUser className="text-2xl text-primarycolors-red" />
            </div>
            <div className="group flex gap-3 items-center">
              <input
                name="username"
                placeholder=""
                type="text"
                required=""
                value={city}
                onChange={userInputCity}
                readOnly={isEditable}
              />
              <label htmlFor="username">City</label>
            </div>
          </div>
          <hr className="border-primarycolors-gray " />
          <div className="flex gap-0 mt-5">
            <div className="flex">
              <BiUser className="text-2xl text-primarycolors-red" />
            </div>
            <div className="group flex gap-3 items-center">
              <input
                name="username"
                placeholder=""
                type="text"
                required=""
                value={pincode}
                onChange={userInputPincode}
                readOnly={isEditable}
              />
              <label htmlFor="username">Pincode</label>
            </div>
          </div>
          {!isEditable && (
            <button
              type="submit"
              className="bg-primarycolors-red text-primarycolors-white px-4 py-2 rounded-md text-center  text-xl mt-1  font-light  "
            >
              Save
            </button>
          )}
        </form>
      </div>{" "}
      <div className="border-[1px] rounded-lg m-2 my-2 border-primarycolors-gray">
        <div className="flex justify-between items-center px-2 py-4 gap-0 cursor-pointer">
          <div className="flex  gap-3" onClick={() => navigate("/bookings")}>
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
        {/* <div className="flex justify-between items-center px-2 py-4 gap-0">
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
        <hr className="border-primarycolors-gray " /> */}
        {/* <div className="flex justify-between items-center px-2 py-4 gap-0">
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
        </div> */}
      </div>
      <div className="border-[1px] rounded-lg m-2 my-2 border-primarycolors-gray">
        <div
          onClick={handleLogout}
          className="flex justify-between items-center px-2 py-4 gap-0"
        >
          <div className="flex  gap-3 cursor-pointer">
            <div className="flex">
              <MdLogout className="text-2xl text-primarycolors-red" />
            </div>
            <div className="group text-primarycolors-textcolor ">Signout</div>
          </div>
          <div className="text-xl">
            {" "}
            <NavLink>
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
