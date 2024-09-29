import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import Navbar from "../Navigation";
import PassengerDetails from "./PassengerDetails";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import FooterDesktop from "../FooterDesktop";
import { BiArrowBack } from "react-icons/bi";
import WalletSection from "../Wallet/WalletSection";
import PassengerDetailsMobile from "./PassengerDetailsMobile";
import "./index.css";
const Passenger = () => {
  const isLoading = useSelector((state) => state.busDetailsReducer.isLoading);
  const selectedSeats = useSelector(
    (state) => state.busDetailsReducer.selectedSeats
  );
  const totalFare = useSelector((state) => state.busDetailsReducer.totalFare);
  const From = useSelector((state) => state.busDetailsReducer.From);
  const To = useSelector((state) => state.busDetailsReducer.To);
  const date = useSelector((state) => state.busDetailsReducer.date);
  const boardPoint = useSelector((state) => state.busDetailsReducer.boardPoint);

  const dropPoint = useSelector((state) => state.busDetailsReducer.dropPoint);
  const busData = useSelector((state) => state.busDetailsReducer.busData);
  const routeDetails = useSelector(
    (state) => state.busDetailsReducer.routeDetails
  );
  let foundObject = routeDetails.find(
    (item) => item.boading_points === boardPoint
  );
  let arrival = routeDetails.find((item) => item.boading_points === dropPoint);
  // const userId=useSelector((state)=>state.authReducer.currentCustomer.user_id);
  const userId = localStorage.getItem("userData");
  const userIdString = JSON.parse(userId);
  // console.log(userIdString.access_token.split("Bearer")[1]);
  // console.log(`${userIdString.user.user_id}`)
  const selectedTypes = useSelector(
    (state) => state.busDetailsReducer.selectedTypes
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (routeDetails.length === 0) {
      navigate("/");
    }
  }, [routeDetails]);
  const [passDetails, setPassDetails] = React.useState([]);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [coupon, setCoupon] = React.useState("");
  const [couponData, setCouponData] = React.useState(null);
  const [totalfare, setTotalFare] = React.useState(totalFare);
  const [passEmail, setPassEmail] = React.useState("");
  const [isdisable, setIsDisable] = React.useState(false);
  const [checkedi, setChecked] = React.useState(false);
  const [passPhNo, setPassPhNo] = React.useState("");
  const [wallet, setWallet] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [pincode, setPincode] = React.useState(null);
  const [state, setState] = React.useState(null);
  const [insuranceId, setInsuranceId] = React.useState(null);
  const [insurance, setInsurance] = React.useState(0);
  // const [userWallet, setUserWallet] = React.useState("");
  const [deductionMade, setDeductionMade] = React.useState(false);
  const insuranceSelected = insurance !== 0 ? 1 : 0;
  // Function to handle deduction from wallet balance
  // const walletBalance = () => {
  //   if (!deductionMade) {
  //     if (wallet >= totalFare) {
  //       setWallet(wallet - totalFare - 180);
  //     } else if (wallet === 0) {
  //       setWallet(totalFare - wallet);
  //     }
  //     // Set the deduction state to true
  //     setDeductionMade(true);
  //   } else {
  //     // Return the deducted amount to the wallet
  //     setWallet(wallet + totalFare + 180);
  //     // Set the deduction state to false
  //     setDeductionMade(false);
  //   }
  // };
  let fare = totalFare;
  let discount;
  if (couponData != null) {
    if (couponData.date.discount_type === "percentage") {
      fare = fare - (fare * couponData.date.discount) / 100;
    } else if (couponData.date.discount_type === "number") {
      fare = fare - couponData.date.discount;
      // console.log(`fff${fare - couponData.discount}`);
    }
    discount = (totalFare * couponData.date.discount) / 100;
  }

  const walletBalance = () => {
    setDeductionMade(!deductionMade);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          userIdString.access_token.split("Bearer")[1].trim() // Remove leading/trailing whitespaces
        );

        const formdata = new FormData();
        formdata.append("user_id", userIdString.user.user_id);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        const response = await fetch(
          "https://seatadda.co.in/auth/api/user-wallet-details",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse response body as JSON
        setWallet(data);
        // console.log(data);
        // Log the response data
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();

    // Check conditions to determine if button should be disabled
    // console.log(`insu ${insurance}`);
    if (passEmail !== "" && passPhNo != "" && insurance !== 0 && checkedi) {
      setIsDisable(false); // Disable the button
    } else {
      setIsDisable(true); // Enable the button
    }
  }, [passEmail, passPhNo, insurance, checkedi]); // Dependency array includes variables passDetails, passEmail, and passPhNo
  // const uui = uuidv4().substring(0, 8);
  function generateRandomId() {
    const randomDigits = Math.floor(
      100000000000 + Math.random() * 900000000000
    ); // Generates a random 12-digit number
    const randomId = `TRA_${randomDigits}`;
    return randomId;
  }

  const id = generateRandomId();
  const handlePay = async () => {
    if (deductionMade) {
      if (wallet.balance_amount >= totalFare) {
        const updateWallet = fare;
        // console.log(updateWallet);
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          userIdString.access_token.split("Bearer")[1]
        );
        const formdata = new FormData();
        formdata.append("user_id", userIdString.user.user_id);
        formdata.append("transaction_id", id);
        formdata.append("transaction_type", "debit");
        formdata.append("amount", updateWallet);
        formdata.append("message", `Ticket Booked ${From},${To}`);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };
        const response = await fetch(
          "https://seatadda.co.in/auth/api/update-user-wallet",
          requestOptions
        );
        const data = await response.json();
        if (data.status === true) {
          const myHeaders = new Headers();
          myHeaders.append(
            "Authorization",
            userIdString.access_token.split("Bearer")[1]
          );
          const passengers = selectedSeats.map((seat, index) => ({
            seat_types: selectedTypes[index], // Index ke hisab se seat type ko assign karenge
            seat_number: selectedSeats[index], // Seat number ko assign karenge
            passenger_name: passDetails[index].name, // Passenger ka naam assign karenge (assume ki sirf ek passenger hai)
            age: passDetails[index].age, // Passenger ki umar assign karenge
            gender: passDetails[index].gender, // Passenger ka gender assign karenge
          }));
          const formdata = new FormData();
          formdata.append("user_id", userIdString.user.user_id);
          formdata.append("bus_schedule_id", busData.bus_schedule_id);
          formdata.append("travels_name", busData.travels_name);
          formdata.append("service_name", busData.service_name);
          formdata.append("reg_no", busData.reg_no);
          formdata.append("fare", totalFare);
          formdata.append("sourse", From);
          formdata.append("destination", To);
          formdata.append("boading_points", foundObject.boading_points);
          formdata.append("bording_type", foundObject.bording_type);
          formdata.append("boarding_date", foundObject.date);
          formdata.append("boarding_time", foundObject.time);
          formdata.append("arrival_date", arrival.date);
          formdata.append("arrival_time", arrival.time);
          // formdata.append("seat_types", selectedTypes[0]);
          // formdata.append("seat_number", selectedSeats[0]);
          // for (let i = 0; i < passDetails.length; i++) {
          //     formdata.append("passenger_name",passDetails[i].name);
          //   }
          // for (let i = 0; i < passDetails.length; i++) {
          // formdata.append("age", passDetails[i].age);
          // }
          // for (let i = 0; i < passDetails.length; i++) {
          //     formdata.append("gender", passDetails[i].gender);
          //   }
          formdata.append("phone", passPhNo);
          formdata.append("address", address);
          formdata.append("city", city);
          formdata.append("pincode", pincode);
          formdata.append("state", state);
          formdata.append("insuranceSelected", insuranceSelected);
          formdata.append("insurance_id", insuranceId);
          formdata.append("email", passEmail);
          passengers.forEach((passenger, index) => {
            for (const key in passenger) {
              formdata.append(`${key}[${index}]`, passenger[key]); // Corrected formdata.append line
            }
          });
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
          };
          const response = await fetch(
            "https://seatadda.co.in/auth/api/bus-booking",
            requestOptions
          );
          //   .then((response) => response.text())
          //   .then((result) => if(result.status=='false'){
          //   })
          //   .catch((error) => console.error(error));
          const data = await response.json();
          if (data.status === true) {
            alert(data.message);
            navigate("/bookings");
          } else {
            alert(data.message);
          }
        } else {
          alert(data.message);
        }
      }
    } else {
      const passengers = selectedSeats.map((seat, index) => ({
        seat_types: selectedTypes[index], // Index ke hisab se seat type ko assign karenge
        seat_number: selectedSeats[index], // Seat number ko assign karenge
        passenger_name: passDetails[index].name, // Passenger ka naam assign karenge (assume ki sirf ek passenger hai)
        age: passDetails[index].age, // Passenger ki umar assign karenge
        gender: passDetails[index].gender, // Passenger ka gender assign karenge
      }));
      const formdata = {
        user_id: userIdString.user.user_id,
        bus_schedule_id: busData.bus_schedule_id,
        travels_name: busData.travels_name,
        service_name: busData.service_name,
        reg_no: busData.reg_no,
        fare: totalFare,
        sourse: From,
        destination: To,
        boading_points: foundObject.boading_points,
        bording_type: foundObject.bording_type,
        boarding_date: foundObject.date,
        boarding_time: foundObject.time,
        arrival_date: arrival.date,
        arrival_time: arrival.time,
        phone: passPhNo,
        address: address,
        city: city,
        pincode: pincode,
        state: state,
        insuranceSelected: insuranceSelected,
        email: passEmail,
        passengers: passengers,
        insurance_id: insuranceId,
      };
      localStorage.setItem("totalFare", JSON.stringify(formdata));
      navigate(`/payment?total=${totalFare}`);
    }
  };

  const handleBackward = () => {
    navigate("/");
  };
  const storePassenger = (
    passDetails,
    passEmail,
    passPhNo,
    address,
    city,
    pincode,
    state,
    insuranceId
  ) => {
    console.log(passDetails);
    setPassDetails(passDetails);
    setPassEmail(passEmail);
    setPassPhNo(passPhNo);
    setAddress(address);
    setCity(city);
    setPincode(pincode);
    setState(state);
    setInsuranceId(insuranceId);
  };
  const storeInsurance = (insurancevalue) => {
    console.log(insurancevalue);
    setInsurance(insurancevalue);
  };
  const termAndCondition = (termAndCondition) => {
    setChecked(termAndCondition);
  };
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
  return (
    <div>
      <div className="hidden md:block">
        <Navbar />
        <div className="container mx-auto ">
          <div className="grid md:grid-cols-4 p-2 sm:p-5 gap-4">
            <div className="md:col-span-3">
              <PassengerDetails
                storePassenger={storePassenger}
                storeInsurance={storeInsurance}
                termAndCondition={termAndCondition}
              />
            </div>
            <div className="flex flex-col gap-[1rem]">
              <div className="border-[1px] border-dashed  px-4  text-left h-fit  shadow-2xl  flex flex-col justify-between ">
                <div className="my-5">
                  <h1 className="font-bold  uppercase text-center text-primarycolors-red ">
                    Journey Details:{" "}
                  </h1>
                  <div className="mb-2 p-3 text-sm">
                    {" "}
                    <p className="m-2 flex justify-between">
                      From: <span className="font-bold uppercase">{From}</span>{" "}
                    </p>
                    <p className="m-2 flex justify-between">
                      {" "}
                      To: <span className="font-bold uppercase">{To}</span>
                    </p>
                    <p className="m-2 flex justify-between">
                      Date: <span className="font-bold uppercase">{date}</span>{" "}
                    </p>{" "}
                    <p className="m-2 flex justify-between">
                      Boarding Point:{" "}
                      <span className="font-bold uppercase">{boardPoint}</span>{" "}
                    </p>{" "}
                    <p className="m-2 flex justify-between">
                      Dropping Point:{" "}
                      <span className="font-bold uppercase">{dropPoint}</span>{" "}
                    </p>{" "}
                    <div className="m-2 flex  justify-between">
                      <p className="w-fit">Selected Seats:</p>

                      <div>
                        {selectedSeats.map((seat) => (
                          <span className="font-bold" key={seat}>
                            {" "}
                            {seat},
                          </span>
                        ))}
                      </div>
                    </div>
                    {insurance !== 0 && (
                      <div className="m-2 flex  justify-between">
                        <p className="w-fit">Travel Insurance:</p>
                        <div className="font-bold">
                          <p>{insurance}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <hr className="my-2 border-dashed" />
                  <div className="p-3">
                    <h1 className="font-bold mb-5  uppercase text-center text-primarycolors-red ">
                      Fare Details:{" "}
                    </h1>
                    <p className="m-2 flex justify-between">
                      Basic Fare (for {selectedSeats.length} Seat) :{" "}
                      <span className="font-bold uppercase">
                        <span className="">&#8377;</span>
                        {totalFare}
                      </span>{" "}
                    </p>{" "}
                    {couponData.status ? (
                      <p className="m-2 flex justify-between">
                        Discount Fare:
                        <span className="font-bold uppercase">
                          <span>&#8377;</span>
                          {discount !== undefined ? discount : 0}{" "}
                        </span>
                      </p>
                    ) : (
                      <p className="m-2 flex justify-between">
                        Discount Fare:
                        <span className="font-bold uppercase">
                          <span>&#8377;</span>0
                        </span>
                      </p>
                    )}
                  </div>
                  <hr className="my-2 border-dashed" />
                  <div className="mb-6">
                    <label className="font-bold mb-5  uppercase text-center text-primarycolors-red ">
                      Have coupon?
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2">
                      <input
                        type="text"
                        style={{
                          borderWidth: "1px", // Add border width
                          borderStyle: "solid", // Ensure border style is set to "solid"
                          borderColor: "red !important",
                          borderTopLeftRadius: "5px",
                          borderBottomLeftRadius: "5px",
                        }}
                        className="flex-grow w-full p-2 sm:p-3 "
                        placeholder="Coupon code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                      />
                      <span className="sm:mt-0  w-full sm:w-auto">
                        <button
                          className="w-full sm:w-auto p-0 sm:p-4 bg-red-600 text-white"
                          onClick={ApplyCoupon}
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            height: "51px",
                            borderTopRightRadius: "5px",
                            borderBottomRightRadius: "5px",
                          }}
                        >
                          Apply
                        </button>
                      </span>
                    </div>
                    {/* {isSuccess && (
                      <span className="absolute right-2 top-2 text-green-500 animate-bounce">
                        ✔️ hhhhhhhhh
                      </span>
                    )} */}
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

                  <hr className="my-2 border-dashed" />
                  <div className="p-3 mt-5 py-2 bg-primarycolors-textcolor/40 flex justify-between p-2 sm:p-3">
                    <h1 className="font-bold text-center text-primarycolors-black ">
                      Net Payable:
                    </h1>

                    <span className="font-bold uppercase">
                      <span>&#8377;</span>
                      {fare !== undefined ? fare : 0}{" "}
                    </span>
                  </div>
                  <hr className="my-2 border-dashed" />
                  <div>
                    <h1 className="font-bold mb-2  uppercase  text-primarycolors-red">
                      Wallet
                    </h1>
                    <input
                      type="checkbox"
                      id="wallet"
                      onClick={walletBalance}
                    />
                    {wallet !== null && (
                      <label htmlFor="wallet" style={{ marginLeft: "10px" }}>
                        {wallet.balance_amount}
                      </label>
                    )}
                  </div>
                </div>{" "}
              </div>{" "}
              <div className="mx-1">
                <button
                  disabled={isdisable}
                  onClick={handlePay}
                  className={`w-full p-2 rounded-md ${
                    isdisable
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-primarycolors-red/90 hover:bg-primarycolors-red"
                  } text-primarycolors-white`}
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <FooterDesktop />
        </div>
      </div>
      <div className="block md:hidden ">
        <div className="fixed shadow-xl border-b-[1px] border-primarycolors-gray overflow-y-hidden top-0   z-10 w-full  flex items-center gap-4  text-primarycolors-white py-3 px-2 bg-primarycolors-textcolor">
          <div className="text-2xl   font-normal" onClick={handleBackward}>
            <BiArrowBack />
          </div>
          <div className=" px-0   text-[16px]  mt-1  font-bold  ">
            Passengers Details
          </div>
        </div>
        <div className="relative top-[3rem]">
          <div className="">
            <PassengerDetailsMobile
              storePassenger={storePassenger}
              storeInsurance={storeInsurance}
              termAndCondition={termAndCondition}
            />
          </div>

          <div className="fixed  bg-primarycolors-white shadow-inner w-[98%] ml-1 -bottom-1 flex justify-center py-2">
            <button
              disabled={isdisable}
              onClick={handlePay}
              className={`w-full p-2 rounded-md ${
                isdisable
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primarycolors-red/90 hover:bg-primarycolors-red"
              } text-primarycolors-white`}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Passenger;
