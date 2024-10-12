import React, { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import "./index.css";
import Drawer from "react-modern-drawer";
import { NavLink } from "react-router-dom";
import parse from "html-react-parser";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import man from "../../assets/man.png";
import women from "../../assets/women.png";
import women1 from "../../assets/women1.png";
import women1_ from "../../assets/women1_.png";
import man1png from "../../assets/man1png.png";
import male from "../../assets/male.svg";
import maleselected from "../../assets/maleselected.svg";
import female from "../../assets/female.svg";
import femaleselected from "../../assets/femaleselected.svg";

import { useNavigate } from "react-router-dom";
import {
  AiFillInfoCircle,
  AiFillInsurance,
  AiOutlineInfoCircle,
  AiOutlineInsurance,
} from "react-icons/ai";
const PassengerDetailsMobile = ({
  storePassenger,
  storeInsurance,
  termAndCondition,
  wallet,
  walletBalance,
}) => {
  const selectedSeats = useSelector(
    (state) => state.busDetailsReducer.selectedSeats
  );
  const userData = JSON.parse(localStorage.getItem("userData"));
  const account = JSON.parse(localStorage.getItem("Edit"));
  const From = useSelector((state) => state.busDetailsReducer.From);
  const To = useSelector((state) => state.busDetailsReducer.To);
  const boardPoint = useSelector((state) => state.busDetailsReducer.boardPoint);
  const dropPoint = useSelector((state) => state.busDetailsReducer.dropPoint);
  const [insurancevalue, setInsurancevalue] = React.useState(null);
  const [insurance, setInsurance] = React.useState(false);
  const [address, setAddress] = React.useState(account[0].address);
  const [city, setCity] = React.useState(account[0].city);
  const [pincode, setPinCode] = React.useState(account[0].pin_code);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [state, setState] = React.useState(account[0].state);
  // const [isEditable, setIsEditable] = React.useState(true);
  const routeDetails = useSelector(
    (state) => state.busDetailsReducer.routeDetails
  );
  let arrival = routeDetails.find((item) => item.boading_points === dropPoint);
  let foundObject = routeDetails.find(
    (item) => item.boading_points === boardPoint
  );

  var passengerArray = [];
  for (var ele = 0; ele < selectedSeats.length; ele++) {
    passengerArray.push({
      name: account[0].name,
      age: "",
      gender: account[0].gender,
    });
  }
  const no_of_travel_insurance = selectedSeats.length;
  const [passDetails, setPassDetails] = React.useState(passengerArray);
  const [passEmail, setPassEmail] = React.useState(userData.user.email);
  const [coupon, setCoupon] = React.useState("");
  const [couponData, setCouponData] = React.useState(null);
  const [passPhNo, setPassPhNo] = React.useState(userData.user.phone);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedGender, setSelectedGender] = React.useState(account[0].gender);
  const [check, setcheck] = React.useState(true);
  const [deductionMade, setDeductionMade] = React.useState(false);
  const handlePassName = (e, indexNo) => {
    const newArr = [...passDetails];
    newArr[indexNo]["name"] = e.target.value;
    setPassDetails(newArr);
  };

  const handlePassAge = (e, indexNo) => {
    const newArr = [...passDetails];
    newArr[indexNo]["age"] = e.target.value;
    setPassDetails(newArr);
  };

  // const handlePassGender = (e, indexNo) => {
  //   const newArr = [...passDetails];
  //   newArr[indexNo]["gender"] = e.target.value;
  //   setPassDetails(newArr);
  // };
  const handlePassGender = (indexNo, gender) => {
    const newArr = [...passDetails];
    newArr[indexNo]["gender"] = gender;
    setPassDetails(newArr);
    const newSelectedGender = [...selectedGender];
    newSelectedGender[indexNo] = gender;
    setSelectedGender(newSelectedGender);
  };
  // const Passenger = () => {
  //   console.log("helloclick");
  //   storePassenger(passDetails, passEmail, passPhNo);
  // };

  if (
    passDetails.length === selectedSeats.length &&
    passDetails.every(
      (passenger) =>
        passenger.name !== "" && passenger.age !== "" && passenger.gender !== ""
    ) &&
    passEmail !== "" &&
    passPhNo !== ""
  ) {
    storePassenger(passDetails, passEmail, passPhNo);
  }

  const navigate = useNavigate();

  // const handlePay = () => {
  //   navigate("/payment");
  // };
  const travelInsurance = () => {
    if (insurancevalue !== null) {
      const newInsuranceValue = insurance
        ? 0
        : no_of_travel_insurance * parseInt(insurancevalue[0].insurance_amount);

      // Update the insurance state and value
      setInsurance(!insurance);
      // setInsurancevalue(newInsuranceValue);

      // Pass the updated value to storeInsurance using a callback
      storeInsurance(newInsuranceValue);
    }
  };
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const addressInput = (e) => {
    setAddress(e.target.value);
  };
  const cityInput = (e) => {
    setCity(e.target.value);
  };
  const pincodeInput = (e) => {
    setPinCode(e.target.value);
  };
  const stateInput = (e) => {
    setState(e.target.value);
  };
  useEffect(() => {
    if (routeDetails.length === 0) {
      navigate("/select-bus");
    }
  }, [routeDetails]);
  useEffect(() => {
    const insurance = async () => {
      const response = await fetch(
        "https://seatadda.co.in/api/travel-insurance"
      );
      const data = await response.json();
      setInsurancevalue(data.data);
      console.log(data);
    };
    insurance();
  }, []);
  const userId = localStorage.getItem("userData");
  const userIdString = JSON.parse(userId);
  const ApplyCoupon = async () => {
    if (!coupon) {
      alert("coupon cant be empty");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      userIdString.access_token.split("Bearer")[1]
    );
    const formdata = new FormData();
    formdata.append("coupon_code", coupon);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    const response = await fetch(
      "https://seatadda.co.in/auth/api/coupon-code-verification",
      requestOptions
    );
    const data = await response.json();
    if (data.status === true) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    setCouponData(data);
    console.log(couponData);
  };
  const Passenger = () => {
    setcheck(!check);
    const checking = check;
    console.log(checking);
    termAndCondition(checking);
  };
  const wallet1 = () => {
    walletBalance();
  };
  return (
    <div className="m-3 my-5 mb-[7rem]">
      <div className="shadow-md border-[0.2px] rounded-md p-4  border-primarycolors-gray">
        {routeDetails.length !== 0 && (
          <div className="flex gap-2 justify-between">
            <div className="text-left justify-start flex flex-col">
              <h2 className="text-base font-bold">{From}</h2>
              <p className="text-sm text-primarycolors-textcolor">
                {foundObject.boading_points}
              </p>
              <p className="text-xs  text-primarycolors-textcolor">
                {foundObject.time + " " + foundObject.date}
              </p>
            </div>

            <div className="px-3">
              <div className="text-xl rotate-180  font-normal">
                <BiArrowBack />
              </div>
            </div>
            <div className=" text-right flex flex-col">
              <h2 className="text-base font-bold">{To}</h2>
              <p className="text-sm text-primarycolors-textcolor">
                {arrival.boading_points}
              </p>
              <p className="text-xs  text-primarycolors-textcolor">
                {arrival.time + " " + arrival.date}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="my-6">
        <h2 className="text-left my-2">Your ticket info will be sent here</h2>
        <div className="shadow-md border-[1px] rounded-md py-4  p-2 border-primarycolors-gray">
          <div className="">
            <input
              type="email"
              name="text"
              className="input"
              value={passEmail}
              placeholder="Email Address"
              onChange={(e) => setPassEmail(e.target.value)}
            />
          </div>
          <div className="mt-3 flex items-center gap-4">
            <div className="w-[100%]">
              <input
                type="tel"
                name="text"
                class="input"
                placeholder="Phone Number"
                value={passPhNo}
                onChange={(e) => setPassPhNo(e.target.value)}
              />
            </div>
            <div>
              {/* <div class="checkbox-wrapper">
                <input id="terms-checkbox-37" name="checkbox" type="checkbox" />
                <label class="terms-label" for="terms-checkbox-37">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 200 200"
                    class="checkbox-svg"
                  >
                    <mask fill="white" id="path-1-inside-1_476_5-37">
                      <rect height="200" width="200"></rect>
                    </mask>
                    <rect
                      mask="url(#path-1-inside-1_476_5-37)"
                      stroke-width="40"
                      class="checkbox-box"
                      height="200"
                      width="200"
                    ></rect>
                    <path
                      stroke-width="15"
                      d="M52 111.018L76.9867 136L149 64"
                      class="checkbox-tick"
                    ></path>
                  </svg>
                  <span class="label-text ">Send me Details</span>
                </label>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="my-6">
        <h2 className="text-left my-2">Passenger Details</h2>
        <div className="shadow-md border-[1px] rounded-md py-1 p-2 border-primarycolors-gray">
          {selectedSeats.map((seatNo, index) => {
            return (
              <div key={index}>
                <div className="flex text-sm justify-start items-center py-3">
                  <span className=" font-semibold">Passenger {index + 1}</span>
                  <div
                    className="mx-2"
                    style={{
                      height: "20px",
                      backgroundColor: "silver",
                      width: "2px",
                    }}
                  ></div>
                  <span className="font-semibold">Seat {seatNo}</span>
                </div>

                <div
                  key={index}
                  className="grid gap-2 grid-cols-5 my-5 mx-auto"
                >
                  <div className="col-span-3">
                    <input
                      type="text"
                      name="text"
                      class="input"
                      placeholder="Full Name"
                      value={passDetails[index]["name"]}
                      onChange={(e) => handlePassName(e, index)}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="age"
                      class="input"
                      placeholder="Age"
                      value={passDetails[index]["age"]}
                      onChange={(e) => handlePassAge(e, index)}
                    />
                  </div>
                  {/* <div className="flex flex-col items-center justify-center -mt-1"></div> */}
                  {/* <div
                    className="sm:w-1/3 sm:m-2 my-2  flex items-center justify-start"
                    onChange={(e) => handlePassGender(e, index)}
                  >
                    <div className="mr-3 flex">
                      <input
                        className="py-1 text-sm px-3 border-[1px]"
                        type="radio"
                        name={"gender" + index}
                        value="Male"
                      />
                      <span className="ml-2">Male</span>
                    </div>
                    <div className="mx-3 flex">
                      <input
                        className="py-1 text-sm px-3 border-[1px]"
                        type="radio"
                        name={"gender" + index}
                        value="Female"
                      />
                      <span className="ml-2">Female</span>
                    </div>
                  </div> */}
                  {/* <div className="flex flex-col items-center justify-center -mt-1">
                    <div className="flex items-center justify-center gap-1 w-full">
                      <div className="flex w-1/2">
                        <img
                          src={man}
                          alt="Male"
                          // className={`w-full rounded-full cursor-pointer ${
                          //   selectedGender[index] === "male" ? "selected" : ""
                          // }`}
                          style={{
                            backgroundColor:
                              selectedGender[index] === "male"
                                ? "red"
                                : "initial",
                          }}
                          // className={`w-full rounded-full cursor-pointer `}
                          onClick={() => {
                            handlePassGender(index, "male");
                          }} // Assuming indexNo is defined
                        />
                      </div>
                      <div className="flex w-1/2">
                        <img
                          src={women}
                          alt="Female"
                          // className={`w-full rounded-full cursor-pointer ${
                          //   selectedGender[index] === "female" ? "selected" : ""
                          // }`}
                          style={{
                            backgroundColor:
                              selectedGender[index] === "female"
                                ? "red"
                                : "initial",
                          }}
                          onClick={() => {
                            handlePassGender(index, "female");
                          }} // Assuming indexNo is defined
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="flex items-center justify-center gap-1 w-full">
                    <div className="">
                      {selectedGender == "male" ? (
                        <img
                          src={maleselected}
                          alt="Male"
                          className={`w-full rounded-full cursor-pointer `}
                          onClick={() => {
                            handlePassGender(index, "male");
                          }}
                          style={{ height: "40px", width: "40px" }}
                        />
                      ) : (
                        <img
                          src={male}
                          alt="Male"
                          className={`w-full rounded-full cursor-pointer `}
                          onClick={() => {
                            handlePassGender(index, "male");
                          }}
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
                          onClick={() => {
                            handlePassGender(index, "female");
                          }}
                          style={{ height: "40px", width: "40px" }}
                        />
                      ) : (
                        <img
                          src={female}
                          alt="Female"
                          className={`w-full rounded-full cursor-pointer`}
                          onClick={() => {
                            handlePassGender(index, "female");
                          }}
                          style={{ height: "40px", width: "40px" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="my-6">
        <div className="shadow-md border-[1px] rounded-md py-1 p-2 border-primarycolors-gray">
          <div className="">
            <div className="text-start">
              {" "}
              {/* <MdFamilyRestroom className="text-base sm:text-xl text-primarycolors-red mr-2" />{" "} */}
              <h2 className="text-start sm:text-xl  my-2 text-primarycolors-textcolor font-semibold ">
                Travel Insurance
              </h2>
            </div>
            <p className="text-start sm:text-base">
              Secure your Trip with Travel Insurance for just ₹ 10 per person
            </p>
            {insurancevalue !== null && (
              <h1 className="text-start">{`Insurance Company -${insurancevalue[0].insurance_company}`}</h1>
            )}
            {insurancevalue !== null && (
              <div className="flex text-sm items-center my-2 py-2 ">
                <input
                  type="checkbox"
                  className="mr-2 "
                  id="insurancebox"
                  name="insurancebox"
                  onClick={travelInsurance}
                />
                <label className="" htmlFor="insurancebox">
                  <img
                    // src="https://static.abhibus.com/img/insurance//ic_insurance_acko.png"

                    src={`https://mybusmyseat.com/backind/admin/public/bus/insurance/${insurancevalue[0].logo_img}`}
                    alt="travellogo"
                    className="px-1 py-1"
                    style={{ height: "40px", width: "80px" }}
                  />
                </label>
              </div>
            )}
            <button
              style={{ textAlign: "start", fontWeight: "bold", color: "red" }}
              onClick={toggleDrawer}
            >
              Know More
            </button>
            {insurancevalue !== null && (
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="right"
                className="bla bla bla"
                size={300}
                style={{ borderRadius: "20px" }}
              >
                <div className="px-10 py-5">
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={`https://mybusmyseat.com/backind/admin/public/bus/insurance/${insurancevalue[0].logo_img}`}
                      alt="travellogo"
                      className="px-1 py-1 centered-image"
                      style={{
                        height: "70px",
                        width: "200px",
                        display: "inline-block",
                      }}
                    />
                  </div>
                  {typeof insurancevalue[0].insurance_details === "string"
                    ? parse(insurancevalue[0].insurance_details)
                    : null}
                </div>
              </Drawer>
            )}
          </div>
        </div>
      </div>
      <div className=" p-3 my-6 border-[1px] border-primarycolors-textcolor/50 rounded-md  text-left">
        <h1 className="font-bold">Billing address</h1>
        <p>{`${address} ${city} ${state} ${pincode}`}</p>
        <div className="sm:flex flex-wrap gap-4 ">
          <div className="my-2 sm:m-2 sm:ml-0 sm:w-1/2 text-left ">
            <input
              className="py-1 px-5 text-sm w-full input"
              placeholder="Address"
              type="text"
              name="name"
              value={address}
              onChange={addressInput}
            />
          </div>
          <div className="my-2 sm:m-2 sm:ml-0 sm:w-1/4 text-left ">
            <input
              className="py-1 px-3 text-sm w-full input"
              placeholder="City"
              type="text"
              name="name"
              value={city}
              onChange={cityInput}
            />
          </div>
          <div className="my-2 sm:m-2 sm:ml-0 sm:w-1/4 text-left ">
            <input
              className="py-1 px-3 text-sm w-full input"
              placeholder="State"
              type="text"
              name="name"
              value={city}
              onChange={stateInput}
            />
          </div>
          <div className="my-2 sm:m-2 sm:ml-0 sm:w-1/4 text-left ">
            <input
              className="py-1 px-3 text-sm w-full input"
              placeholder="PIN Code"
              type="text"
              name="name"
              value={pincode}
              onChange={pincodeInput}
            />
          </div>
        </div>
      </div>
      <div className="my-6">
        <div className="shadow-md border-[1px] rounded-md py-1 p-2 border-primarycolors-gray">
          <div className="">
            <div className="text-start">
              {" "}
              {/* <MdFamilyRestroom className="text-base sm:text-xl text-primarycolors-red mr-2" />{" "} */}
              <h2 className="text-start sm:text-xl  my-2 text-primarycolors-textcolor font-semibold ">
                Have coupon?
              </h2>
            </div>
            <div className="flex  sm:flex-col items-start sm:items-center mt-2">
              <input
                type="text"
                style={{
                  borderWidth: "1px", // Add border width
                  borderStyle: "solid", // Ensure border style is set to "solid"
                  borderColor: "red !important",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  width: "100%",
                }}
                className="flex-grow w-full p-2 sm:p-3 "
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />

              <button
                className=" sm:w-auto p-0 sm:p-4 bg-red-600 text-white"
                onClick={ApplyCoupon}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  height: "42px",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                  width: "120px",
                }}
              >
                Apply
              </button>
            </div>
            {isSuccess && (
              <p
                className="mt-2 text-sm animate-fadeIn"
                style={{ color: "green" }}
              >
                ✔️ Coupon applied successfully!
              </p>
            )}
            {!isSuccess && (
              <p
                className="mt-2 text-sm animate-fadeIn"
                style={{ color: "red" }}
              >
                Coupon code is not valid
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="my-6">
        <div className="shadow-md border-[1px] rounded-md py-1 p-2 border-primarycolors-gray">
          <div className="">
            <div className="text-start">
              {" "}
              {/* <MdFamilyRestroom className="text-base sm:text-xl text-primarycolors-red mr-2" />{" "} */}
              <h2 className="text-start sm:text-xl  my-2 text-primarycolors-textcolor font-semibold ">
                Wallet
              </h2>
            </div>
            <div className="flex  sm:flex-col items-start sm:items-center mt-2 ">
              <div>
                <input type="checkbox" id="wallet" onClick={wallet1} />
                {wallet !== null && (
                  <label htmlFor="wallet" style={{ marginLeft: "10px" }}>
                    {wallet.balance_amount}
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" ">
        <input
          type="checkbox"
          className="mr-2 "
          id="insurancebox"
          name="insurancebox"
          value="true"
          onClick={Passenger}
          // onChange={() => Passenger()}
        />
        I agree to all the{" "}
        <NavLink to="/terms">
          <span className=" text-primarycolors-skyblue">
            Terms and Conditions
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default PassengerDetailsMobile;
