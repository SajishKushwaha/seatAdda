import React, { useEffect, useState } from "react";
import logo from "../assets/logo2.png";
// import logo from "../assets/logo1.svg"
import AppImg from "../assets/Bus Stop-pana.svg";
import MobImg from "../assets/msg-mobile.avif";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// To decode the JWT token to extract user info

import Cookies from "js-cookie";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import "../App.css";
import {
  BiUserCircle,
  BiCaretDown,
  BiXCircle,
  BiLogoGoogle,
  BiLogoFacebook,
  BiMenu,
  BiX,
  BiLogOut,
} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout, loginFailure } from "../Redux/auth/action";
import { Toaster, toast } from "react-hot-toast";
const Navbar = () => {
  const [modal, setModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [referalCode, setReferalCode] = useState("");
  const [google, setGoogle] = useState(null);
  const [otp, setOtp] = useState("");
  const [verify, setVerify] = useState(false);
  const [googlelogin, setGoogleLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [user, setUser] = useState(null);
  const path = pathname.split("/");
  const url = "https://seatadda.co.in/general-settings";
  const [DATA, set_DATA] = useState([]);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const fetchInfo = async () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => set_DATA(d.date));
  };
  // console.log(DATA);
  useEffect(() => {
    fetchInfo();
  }, []);

  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const currentCustomer = useSelector(
    (state) => state.authReducer.currentCustomer
  );

  const handleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Function to handle clicking on a link in the mobile menu
  const handleLinkClick = () => {
    // Close the mobile menu when clicking on a link
    setMobileMenuOpen(false);
  };
  useEffect(() => {
    // Handle token from URL on initial load
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // Set user data
        // You might want to store token and user info in state, localStorage, or cookies here.
      } catch (error) {
        console.error("Token decoding failed", error);
      }
    }
  }, [user]);

  // const handleSuccess = (credentialResponse) => {
  //   const decoded = jwtDecode(credentialResponse.credential);
  //   console.log("Decoded User Info:", decoded);
  //   setUser(credentialResponse.credential); // You can now access user's email and profile info
  // };

  const handleSuccess = async (response) => {
    const token = response.credential;
    console.log(token);
    const formdata = new FormData();
    formdata.append("credential", token);
    setGoogle(token);
    try {
      // Send the token to your backend
      const response = await fetch(
        "https://seatadda.co.in/auth/api/google-login-verify",
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          body: formdata,
        }
      );

      // const data = await res.json();
      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.access_token.replace("Bearer ", "");
        Cookies.set("jwt_token", jwtToken, {
          expires: data.expires_in / 86400,
          // path: "/",
        });
        localStorage.setItem("authToken", data.access_token);
        localStorage.setItem("userData", JSON.stringify(data));

        // Store the token
        dispatch(loginSuccess(data));
        // console.log(data);
        handleCloseModal();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Successfully Login",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const data = await response.json();
        toast.error(data.message);
        console.error(
          "API request failed:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Authentication failed", error);
    }
  };
  const handleError = () => {
    console.log("Login Failed");
  };
  // console.log(google);
  // const user_details = async () => {
  //   const formdata = new FormData();
  //   formdata.append("access_token", google);

  //   const requestOptions = {
  //     method: "POST",

  //     body: formdata,
  //   };

  //   const response = await fetch(
  //     "https://seatadda.co.in/auth/api/google-login-verify",
  //     requestOptions
  //   );
  //   const data = await response;
  //   console.log(data);
  // };
  // useEffect(() => {
  //   user_details();
  // }, [user]);

  // Load Google Sign-In button when the component is mounted

  const handleOpenModal = () => {
    setMobileMenuOpen(false);

    setModal(true);
    document.body.classList.add("modal-open");
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setPhoneNumber("");
    setVerify(false);
    setModal(false);

    document.body.classList.remove("modal-open");
  };

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handlereferralChange = (event) => {
    setReferalCode(event.target.value);
  };
  const handleInputOtp = (event) => {
    setOtp(event.target.value);
  };
  const phoneNumberPattern = /^\d{10}$/;
  const handleLogin = async () => {
    const isValidphone = phoneNumberPattern.test(phoneNumber);
    if (isValidphone) {
      const formData = new FormData();
      formData.append("phone", phoneNumber);
      formData.append("referal_code", referalCode);
      try {
        const response = await fetch("https://seatadda.co.in/auth/api/login", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          toast.success("OTP Sent to Mobile Number");
          setOtp("");
          setVerify(true);
        } else {
          console.error(
            "API request failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error while making API request:", error);
      }
    } else {
      alert("Enter Valid Phone Number");
    }
  };
  const jwt_token = Cookies.get("jwt_token");
  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log(userData.expires_in);
  const handleVerify = async () => {
    // console.log(otp);
    const isValidphone = phoneNumberPattern.test(phoneNumber);
    if (isValidphone && otp !== "") {
      const formData = new FormData();
      formData.append("phone", phoneNumber);
      formData.append("otp", otp);

      try {
        const response = await fetch("https://seatadda.co.in/auth/verify-otp", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const jwtToken = data.access_token.replace("Bearer ", "");
          Cookies.set("jwt_token", jwtToken, {
            expires: data.expires_in / 86400,
            // path: "/",
          });
          localStorage.setItem("authToken", data.access_token);
          localStorage.setItem("userData", JSON.stringify(data));

          // Store the token
          dispatch(loginSuccess(data));
          // console.log(data);
          handleCloseModal();
          toast.success("Logged in");
        } else {
          const data = await response.json();
          toast.error(data.message);
          console.error(
            "API request failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        toast.error("Error Occured");
        console.error("Error while making API request:", error);
      }
    } else {
      alert("Enter Valid OTP");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    // console.log("Logged Out");
    localStorage.removeItem("Edit");
    Cookies.remove("jwt_token");
    toast.success("Logged Out");
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Successfully Logout",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/");
    });
  };

  const handleProfile = () => {
    navigate("/account");
  };

  return (
    <>
      {/* <Toaster /> */}
      {/* Mobile navigation */}
      <div
        style={{ position: "sticky" }}
        className=" z-10 top-0 shadow-xl  bg-primarycolors-white md:hidden px-2 sm:px-8 py-2"
      >
        <header className="container flex items-center justify-between">
          {/* Logo */}
          <div>
            <NavLink to="/">
              <img
                className=""
                src={`https://seatadda.in/admin/Settings/${DATA.brand_logo}`}
                alt=""
                srcSet=""
              />
            </NavLink>
          </div>

          {/* Hamburger icon */}

          <div className="flex justify-between gap-3 items-center md:hidden">
            {jwt_token && userData ? (
              <>
                {" "}
                <NavLink to="/account">
                  <BiUserCircle
                    className="text-center text-primarycolors-red"
                    size={30}
                  />
                </NavLink>
              </>
            ) : (
              <>
                <button onClick={handleMobileMenu}>
                  <span className="block text-primarycolors-red">
                    {!mobileMenuOpen ? <BiMenu size={35} /> : <BiX size={35} />}
                  </span>
                </button>
              </>
            )}

            {/* <button onClick={handleMobileMenu}>
              <span className="block text-primarycolors-red">
                {!mobileMenuOpen ? <BiMenu size={35} /> : <BiX size={35} />}
                
              </span>
            </button> */}
          </div>
        </header>
      </div>

      {/* Desktop navigation */}
      <div className="hidden sticky z-10 top-0 shadow-md bg-primarycolors-white md:flex justify-center px-8 py-1">
        <header className="container flex items-center justify-between">
          {/* Logo */}
          <div>
            <NavLink to="/">
              <img
                className=""
                src={`https://seatadda.in/admin/Settings/${DATA.brand_logo}`}
                alt=""
                srcSet=""
              />
            </NavLink>
          </div>

          {/* Navigation */}
          <nav className="nav text-primarycolors-textcolor text-l">
            <ul className="flex items-center justify-between">
              {/*  <li
                className={`p-2 hover:text-primarycolors-red cursor-pointer ${path[1] === "offers"
                  ? "text-primarycolors-red font-semibold"
                  : ""
                  }`}
              >
                <NavLink to="/offers">Offers</NavLink>
              </li>
              <li
                className={`p-2 hover:text-primarycolors-red cursor-pointer ${path[1] === "free-rides"
                  ? "text-primarycolors-red font-semibold"
                  : ""
                  }`}
              >
                <NavLink to="/free-rides">Get Free Rides</NavLink>
              </li> */}
              <li
                className={`p-2 hover:text-primarycolors-red cursor-pointer ${
                  path[1] === "faq"
                    ? "text-primarycolors-red font-semibold"
                    : ""
                }`}
              >
                <NavLink to="/faq">FAQ</NavLink>
              </li>
              {/*  <li className="p-4 hover:text-primarycolors-red cursor-pointer dropdown">
                <NavLink className="dropbtn">
                  <div className="sub">
                    <div className="listimg">
                      <span className="lable">My Bookings</span>
                    </div>
                    <BiCaretDown className="text-primarycolors-red" size={24} />
                  </div>
                </NavLink>

                <div
                  className="dropdown-content "
                  style={{ marginLeft: "-2px", marginTop: "10px" }}
                >
                  <ul className="flex flex-col text-left">
                    <li className="cursor-pointer">
                      <NavLink to="/bookings">Print Booking</NavLink>
                    </li>
                    <hr className="text-primarycolors-textcolor" />
                    <li className="cursor-pointer">
                      <NavLink to="/bookings">Cancel Booking</NavLink>
                    </li>
                  </ul>
                </div>
              </li> */}

              {jwt_token && userData ? (
                // <li className="p-4 text-primarycolors-red cursor-pointer dropdown">
                //   <NavLink className="dropbtn">
                //     <div className="sub">
                //       <div className="listimg">
                //         <BiUserCircle className="text-center" size={24} />
                //         <span className="lable">{userData.user.user_id}</span>
                //       </div>
                //       <BiCaretDown
                //         className="text-primarycolors-red"
                //         size={24}
                //       />
                //     </div>
                //   </NavLink>

                //   <div
                //     className="dropdown-content "
                //     style={{ marginLeft: "0", marginTop: "10px" }}
                //   >
                //     <ul className="flex flex-col items-center justify-center  text-left">
                //       <li className="cursor-pointer w-full">
                //         <NavLink to="/account">Edit Profile</NavLink>
                //       </li>
                //       <li className="cursor-pointer w-full">
                //         <NavLink to="/bookings">Booking History</NavLink>
                //       </li>
                //       <li className="cursor-pointer w-full">
                //         <NavLink to="/ReferAndEarn">Refer And Earn</NavLink>
                //       </li>
                //       <li className="cursor-pointer w-full">
                //         <NavLink to="/wallet">Wallet</NavLink>
                //       </li>
                //       <li className="cursor-pointer w-full">
                //         <NavLink onClick={handleLogout}>Logout</NavLink>
                //       </li>
                //     </ul>
                //   </div>
                // </li>
                <li className="p-4 text-primarycolors-red cursor-pointer dropdown relative">
                  <div className="dropbtn">
                    <div className="sub flex items-center">
                      <div className="listimg flex items-center">
                        <BiUserCircle className="text-center" size={24} />
                        <span className="lable">{userData.user.user_id}</span>
                      </div>
                      <BiCaretDown
                        className="text-primarycolors-red ml-2"
                        size={24}
                      />
                    </div>
                  </div>

                  <div className="dropdown-content absolute left-0 mt-2 bg-white shadow-md rounded-md w-48 hidden group-hover:block">
                    <ul className="flex flex-col items-center justify-center text-left">
                      <li className="cursor-pointer w-full px-4 py-2 hover:bg-gray-100">
                        <NavLink to="/account">Edit Profile</NavLink>
                      </li>
                      <li className="cursor-pointer w-full px-4 py-2 hover:bg-gray-100">
                        <NavLink to="/bookings">Booking History</NavLink>
                      </li>
                      <li className="cursor-pointer w-full px-4 py-2 hover:bg-gray-100">
                        <NavLink to="/ReferAndEarn">Refer And Earn</NavLink>
                      </li>
                      <li className="cursor-pointer w-full px-4 py-2 hover:bg-gray-100">
                        <NavLink to="/wallet">Wallet</NavLink>
                      </li>
                      <li className="cursor-pointer w-full px-4 py-2 ">
                        <button className=" ml-3" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li className="p-4 hover:text-primarycolors-red cursor-pointer">
                  <NavLink className="" to="#" onClick={handleOpenModal}>
                    <div className="sub">
                      <div className="listimg">
                        <BiUserCircle className="text-center" size={24} />
                        <span className="lable">Login/Register</span>
                      </div>
                      <BiCaretDown
                        className="text-primarycolors-red"
                        size={24}
                      />
                    </div>
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </header>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <div className="md:hidden  z-10 text-left shadow-md border-t-[1px]  bg-primarycolors-white w-full fixed  left-0 py-4 px-2">
          <nav className="nav text-primarycolors-textcolor text-l">
            <ul className="flex flex-col">
              {/* <li className="p-2 hover:text-primarycolors-red cursor-pointer">
                <NavLink onClick={handleLinkClick} to="/offers">
                  Offers
                </NavLink>
              </li>

              <li className="p-2 hover:text-primarycolors-red cursor-pointer">
                <NavLink to="/ReferAndEarn">Refer And Earn</NavLink>
              </li> */}

              {/*  <li className="p-2 hover:text-primarycolors-red cursor-pointer">
                <NavLink onClick={handleLinkClick} to="/free-rides">
                  Get Free Rides
                </NavLink>
              </li> */}
              {/* <li className="p-2 hover:text-primarycolors-red cursor-pointer dropdown">
                <NavLink className="dropbtn" to="#">
                  <div className="sub-mob">
                    <div className="listimg">
                      <span className="lable">My Bookings</span>
                    </div>
                    <BiCaretDown className="text-primarycolors-red" size={24} />
                  </div>
                </NavLink>

                <div className="dropdown-content">
                  <ul className="flex flex-col text-left">
                    <li className="cursor-pointer">
                      <NavLink href="" onClick={handleLinkClick}>Print Booking</NavLink>
                    </li>
                    <hr className="text-primarycolors-textcolor" />
                    <li className="cursor-pointer">
                      <NavLink href="" onClick={handleLinkClick}>Cancel Booking</NavLink>
                    </li>
                  </ul>
                </div>
              </li> */}
              <li className="p-2 hover:text-primarycolors-red cursor-pointer">
                {isLoggedIn && currentCustomer ? (
                  <NavLink onClick={handleLogout}>
                    <div className="flex  gap-2 ">
                      <BiLogOut className="text-center" size={24} />
                      <span className="lable">Logout</span>
                    </div>
                  </NavLink>
                ) : (
                  <NavLink className="" to="#" onClick={handleOpenModal}>
                    <div className="sub-mob ">
                      <div className="listimg ">
                        <BiUserCircle className="text-center" size={24} />
                        <span className="lable">Login/Register</span>
                      </div>
                      <BiCaretDown
                        className="text-primarycolors-red"
                        size={24}
                      />
                    </div>
                  </NavLink>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}

      {modal && (
        <>
          {/* The overlay div that will blur the background */}
          <div className="modal-container">
            <div className="modal-content flex items-center  justify-center  w-full  overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
              <div className=" sm:p-4 md:p-0 rounded-xl w-full max-w-2xl  h-full   ">
                {/* <Toaster /> */}
                <div className="p-5 sm:p-2 h-full">
                  {" "}
                  <div className="mt-5 sm:mt-10 bg-primarycolors-textcolor rounded-xl relative ">
                    <div className="flex items-center justify-between px-3 border-b rounded-t dark:border-gray-800 ">
                      <h2 className="p-2 text-l text-primarycolors-white">
                        Login/Signup with OTP
                      </h2>
                      <button
                        type="button"
                        className="text-primarycolors-white rounded-lg text-xl pointer  ml-auto inline-flex items-center hover:text-gray-200"
                        title="Close"
                        // data-modal-toggle="default-modal"
                        onClick={handleCloseModal}
                      >
                        <BiXCircle size={25} />
                      </button>
                    </div>{" "}
                    <div className=" rounded-l-xl ">
                      <div
                        className="bg-primarycolors-white rounded-b-xl text-gray-500  w-full overflow-hidden "
                        // style={{ height: "50vh" }}
                      >
                        {
                          verify ? (
                            <div className="sm:flex w-full ">
                              {" "}
                              <div
                                className="w-3/4 sm:w-1/2 flex items-center sm:bg-primarycolors-gray/80 md:block mx-auto sm:mx-0  bg-indigo-500 py-10 px-10"
                                // style={{ height: "50vh" }}
                              >
                                <img src={MobImg} alt="" />
                              </div>
                              <div className="w-full sm:w-1/2 md:w-3/5 mx-auto sm:mx-0  ">
                                <div className="flex flex-col sm:h-[350px] p-3 sm:p-0 justify-start  sm:justify-around gap-4 ">
                                  <div className="flex flex-col justify-start">
                                    <div className=" text-primarycolors-blue">
                                      We have sent verfication Code to <br />
                                      <div className="my-2">
                                        <p className=" text-primarycolors-blue">
                                          +91-{phoneNumber}
                                        </p>
                                        <button
                                          onClick={() => setVerify(false)}
                                          className=" text-primarycolors-red"
                                        >
                                          Edit
                                        </button>
                                      </div>
                                    </div>
                                    <div className="mx-5 mb-3">
                                      <input
                                        className="w-full text-center text-sm p-3 px-4 focus:outline-none border-[1px] border-primarycolors-textcolor"
                                        type="tel"
                                        placeholder="Enter OTP Code"
                                        name="otp"
                                        value={otp}
                                        onChange={handleInputOtp}
                                      />
                                    </div>
                                    <div className="sm:m-0">
                                      <button
                                        onClick={handleVerify}
                                        className="p-2  px-4 text-primarycolors-white  bg-primarycolors-red"
                                      >
                                        Verify OTP
                                      </button>
                                    </div>
                                  </div>

                                  <div>
                                    <p className="my-3 text-[12px]">
                                      Did not Receive OTP Code?
                                    </p>

                                    <div className="flex justify-between px-2 ">
                                      <button className=" text-primarycolors-red">
                                        Resend OTP
                                      </button>
                                      <button className=" text-primarycolors-red">
                                        Get OTP on Call
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>{" "}
                            </div>
                          ) : (
                            googlelogin && (
                              <div className="sm:flex w-full ">
                                {" "}
                                <div
                                  className=" sm:w-3/4   sm:bg-primarycolors-gray/80 md:block mx-auto sm:mx-0  bg-indigo-500 py-5 px-5 md:h-[50vh]"
                                  // style={{ height: "50vh" }}
                                >
                                  <img className="" src={AppImg} alt="" />
                                </div>
                                <div className="w-full sm:w-1/2 md:w-3/5 mx-auto sm:mx-0  ">
                                  <div className="flex flex-col sm:h-[350px] p-3 sm:p-0 justify-start  sm:justify-around ">
                                    <div>
                                      {" "}
                                      <div className="mx-5 mb-3 mt-5">
                                        <input
                                          className="w-full text-center text-sm p-3 px-4 focus:outline-none border-[1px] border-primarycolors-textcolor"
                                          type="tel"
                                          placeholder="Enter Mobile Number"
                                          name="phoneNumber"
                                          value={phoneNumber}
                                          onChange={handleInputChange}
                                        />
                                      </div>
                                      <div className="mx-5 mb-3">
                                        <input
                                          className="w-full text-center text-sm p-3 px-4 focus:outline-none border-[1px] border-primarycolors-textcolor"
                                          type="tel"
                                          placeholder="Enter Referral Code if Available"
                                          name="referalCode"
                                          value={referalCode}
                                          onChange={handlereferralChange}
                                        />
                                      </div>
                                      <div>
                                        <input
                                          className="text-xl "
                                          type="checkbox"
                                        />{" "}
                                        <span className="text-primarycolors-textcolor">
                                          Get First Free Ride
                                        </span>
                                      </div>
                                      <div className="sm:m-3">
                                        <button
                                          onClick={handleLogin}
                                          className="p-2 rounded-md px-4 text-primarycolors-white m-2 bg-primarycolors-red"
                                        >
                                          Login/Signup with OTP
                                        </button>
                                      </div>
                                    </div>

                                    <div className="mx-auto mb-0">
                                      <p className="m-5 mb-2 text-sm text-primarycolors-textcolor">
                                        or login with
                                      </p>
                                      <div className="flex flex-row">
                                        <button
                                          className="p-2 mb-0 rounded-md px-4 flex items-center justify-center text-primarycolors-white m-2   "
                                          onClick={() =>
                                            setGoogleLogin(!googlelogin)
                                          }
                                        >
                                          {/* <BiLogoGoogle className="text-xl mr-1" /> */}

                                          <GoogleOAuthProvider clientId="891592173312-j5771oc29p9aghr9r2fv7hnr45k4nbql.apps.googleusercontent.com">
                                            {!user ? (
                                              <GoogleLogin
                                                onSuccess={handleSuccess}
                                                onError={handleError}
                                              />
                                            ) : (
                                              <div>
                                                <h2>Welcome, {user.name}</h2>
                                                <p>Email: {user.email}</p>
                                              </div>
                                            )}
                                          </GoogleOAuthProvider>
                                        </button>
                                        {/* <button className="p-2 rounded-md mb-0 px-4 flex items-center justify-center text-primarycolors-white m-2 bg-primarycolors-btncolor">
                                      <BiLogoFacebook className="text-xl mr-1" />
                                      <span></span> Facebook
                                    </button> */}
                                      </div>
                                      <div
                                        style={{
                                          color: "grey",
                                          fontSize: "13px",
                                        }}
                                      >
                                        <p>
                                          By logging in, I understand & agree to
                                          SeatAdda
                                        </p>
                                        <span>
                                          <NavLink
                                            to="/terms"
                                            style={{
                                              color: "black",
                                              textDecoration: "underline",
                                            }}
                                          >
                                            Terms of Use
                                          </NavLink>
                                          &nbsp; & &nbsp;
                                          <NavLink
                                            to="/privacy"
                                            style={{
                                              color: "black",
                                              textDecoration: "underline",
                                            }}
                                          >
                                            Privacy Policy
                                          </NavLink>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          )
                          //: (
                          //   <div className="sm:flex w-full ">
                          //     <GoogleOAuthProvider clientId="891592173312-j5771oc29p9aghr9r2fv7hnr45k4nbql.apps.googleusercontent.com">
                          //       {!user ? (
                          //         <GoogleLogin
                          //           onSuccess={handleSuccess}
                          //           onError={handleError}
                          //         />
                          //       ) : (
                          //         <div>
                          //           <h2>Welcome, {user.name}</h2>
                          //           <p>Email: {user.email}</p>
                          //         </div>
                          //       )}
                          //     </GoogleOAuthProvider>
                          //   </div>
                          // )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
