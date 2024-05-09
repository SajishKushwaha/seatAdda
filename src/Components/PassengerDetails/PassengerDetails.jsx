import React, { useEffect } from "react";
import { BiSolidUserAccount } from "react-icons/bi";
import { MdAccountCircle, MdFamilyRestroom, MdPhone } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { updateBookingDetails } from "../../Redux/BookBus/action";
import "./index.css";
import Drawer from "react-modern-drawer";
import parse from "html-react-parser";
//import styles 👇
import "react-modern-drawer/dist/index.css";
const PassengerDetails = ({ storePassenger, storeInsurance }) => {
  const selectedSeats = useSelector(
    (state) => state.busDetailsReducer.selectedSeats
  );
  const no_of_travel_insurance = selectedSeats.length;
  var passengerArray = [];
  for (var ele = 0; ele < selectedSeats.length; ele++) {
    passengerArray.push({
      name: "",
      age: "",
      gender: "",
    });
  }
  const From = useSelector((state) => state.busDetailsReducer.From);
  let dispatch = useDispatch();
  const [passDetails, setPassDetails] = React.useState(passengerArray);
  const [passEmail, setPassEmail] = React.useState("");
  const [passPhNo, setPassPhNo] = React.useState("");
  const [insurancevalue, setInsurancevalue] = React.useState(null);
  const [insurance, setInsurance] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState(From);
  const [pincode, setPinCode] = React.useState("");
  const [state, setState] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
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

  const handlePassGender = (e, indexNo) => {
    const newArr = [...passDetails];
    newArr[indexNo]["gender"] = e.target.value;
    setPassDetails(newArr);
  };

  const Passenger = () => {
    storePassenger(
      passDetails,
      passEmail,
      passPhNo,
      address,
      city,
      pincode,
      state
    );
  };
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

  return (
    <div className="shadow-md rounded-md border-[1px] border-primarycolors-black p-2 sm:p-5">
      <h1 className="font-semibold text-base sm:text-xl   text-left   text-primarycolors-black ">
        Passenger Details:{" "}
      </h1>
      {/* Contact Details */}
      <div className=" p-3 my-3 border-[1px] border-primarycolors-textcolor/50 rounded-md text-left    ">
        <div className="flex items-center">
          {" "}
          <MdPhone className="text-base sm:text-xl  mr-2 text-primarycolors-red" />{" "}
          <h1 className="font-semibold text-base sm:text-xl text-left   text-primarycolors-textcolor ">
            Enter Contact Details:{" "}
          </h1>
        </div>
        <div className="sm:flex justify-start p-2 pl-0 ">
          <div className="m-3 ml-0   md:w-1/3">
            <input
              className="py-1 px-3 text-sm w-full input"
              type="email"
              name="Email"
              value={passEmail}
              onChange={(e) => setPassEmail(e.target.value)}
              id=""
              placeholder="Enter Your Email"
            />
          </div>
          <div className=" m-3 ml-0 sm:ml-3  md:w-1/3">
            <input
              className="py-1 px-3 text-sm w-full input"
              type="tel"
              name="Mobile"
              value={passPhNo}
              onChange={(e) => setPassPhNo(e.target.value)}
              id=""
              placeholder="Enter Your Mobile Number"
            />
          </div>
        </div>
      </div>
      {/* Passenger Details */}
      <div className=" p-3 my-3 border-[1px] border-primarycolors-textcolor/50 rounded-md text-left   ">
        <div className="flex items-center mt-2 ">
          {" "}
          <BiSolidUserAccount className="text-primarycolors-red mr-2 text-base sm:text-xl" />{" "}
          <h1 className="font-semibold text-base sm:text-xl  text-left   text-primarycolors-textcolor ">
            Enter Passenger Details:{" "}
          </h1>
        </div>
        <div className="flex justify-start  pl-0 ">
          <div className="p-2  w-full">
            {selectedSeats.map((seatNo, index) => {
              return (
                <div className="w-full p-0 my-1 border-b-[1px] pb-3 border-primarycolors-gray">
                  {/* <div className="flex items-center ">
                    <MdAccountCircle className="text-base  text-primarycolors-red" />
                    <span
                      className="font-semibold text-sm"
                      style={{ marginLeft: "10px", marginTop: "2px" }}
                    >
                      Passenger Information
                    </span>
                  </div> */}
                  <div className="flex text-sm justify-start items-center py-3">
                    <span className=" font-semibold">
                      Passenger {index + 1}
                    </span>
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

                  <div className="sm:flex flex-wrap gap-4 ">
                    {" "}
                    <div className="my-2 sm:m-2 sm:ml-0 sm:w-1/3 text-left ">
                      <input
                        className="py-1 px-3 text-sm w-full input"
                        placeholder="Enter Passenger Name"
                        type="text"
                        name="name"
                        value={passDetails[index]["name"]}
                        onChange={(e) => handlePassName(e, index)}
                      />
                    </div>
                    <div className="w-[70px] sm:m-2 my-2 ">
                      <input
                        className="w-full text-sm py-1 px-3 input"
                        placeholder="Age"
                        type="text"
                        name="age"
                        value={passDetails[index]["age"]}
                        onChange={(e) => handlePassAge(e, index)}
                      />
                    </div>{" "}
                    <div
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
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Travel Insurance */}
      <div className=" p-3 my-3 border-[1px] border-primarycolors-textcolor/50 rounded-md  text-left   ">
        <div className="flex items-center">
          {" "}
          <MdFamilyRestroom className="text-base sm:text-xl text-primarycolors-red mr-2" />{" "}
          <h2 className="text-base sm:text-xl  my-2 text-primarycolors-textcolor font-semibold ">
            Travel Insurance
          </h2>
        </div>
        <p className="text-sm sm:text-base">
          Secure your Trip with Travel Insurance for just ₹ 10 per person
        </p>
        {insurancevalue !== null && (
          <h1>{`Insurance Company -${insurancevalue[0].insurance_company}`}</h1>
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
        <button onClick={toggleDrawer}>
          <span>Know More</span>
        </button>
        {insurancevalue !== null && (
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="right"
            className="bla bla bla"
            size={600}
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
      <div className=" p-3 my-3 border-[1px] border-primarycolors-textcolor/50 rounded-md  text-left">
        <h1 className="font-bold">Billing address</h1>
        <p>{`${address} ${city} ${state} ${pincode}`}</p>
        <div className="sm:flex flex-wrap gap-4 ">
          <div className="my-2 sm:m-2 sm:ml-0 sm:w-1/2 text-left ">
            <input
              className="py-1 px-5 text-sm w-full input"
              placeholder="Address"
              type="text"
              name="name"
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
              onChange={stateInput}
            />
          </div>
          <div className="my-2 sm:m-2 sm:ml-0 sm:w-1/4 text-left ">
            <input
              className="py-1 px-3 text-sm w-full input"
              placeholder="PIN Code"
              type="text"
              name="name"
              onChange={pincodeInput}
            />
          </div>
        </div>
      </div>
      <div className="flex text-sm items-center my-2 py-2 ">
        {" "}
        <input
          type="checkbox"
          className="mr-2 "
          id="insurancebox"
          name="insurancebox"
          value="true"
          onClick={Passenger}
        />
        <label className="" for="insurancebox">
          Yes and I accept the terms and conditions
        </label>
      </div>
    </div>
  );
};

export default PassengerDetails;
