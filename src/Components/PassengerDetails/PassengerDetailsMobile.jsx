import React, { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import "./index.css";

import man from "../../assets/man.png";
import women from "../../assets/women.png";
import { useNavigate } from "react-router-dom";
import {
  AiFillInfoCircle,
  AiFillInsurance,
  AiOutlineInfoCircle,
  AiOutlineInsurance,
} from "react-icons/ai";
const PassengerDetailsMobile = ({ storePassenger }) => {
  const selectedSeats = useSelector(
    (state) => state.busDetailsReducer.selectedSeats
  );
  const boardPoint = useSelector((state) => state.busDetailsReducer.boardPoint);
  const dropPoint = useSelector((state) => state.busDetailsReducer.dropPoint);

  const From = useSelector((state) => state.busDetailsReducer.From);
  const To = useSelector((state) => state.busDetailsReducer.To);
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
      name: "",
      age: "",
      gender: "",
    });
  }
  const [passDetails, setPassDetails] = React.useState(passengerArray);
  const [passEmail, setPassEmail] = React.useState("");
  const [passPhNo, setPassPhNo] = React.useState("");

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
    storePassenger(passDetails, passEmail, passPhNo);
  };

  const navigate = useNavigate();

  // const handlePay = () => {
  //   navigate("/payment");
  // };
  useEffect(() => {
    if (routeDetails.length === 0) {
      navigate("/");
    }
  }, [routeDetails]);

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
              <div>
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
                  <div className="flex flex-col items-center justify-center -mt-1"></div>
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

      <div className="my-6">
        <div className="shadow-md border-[1px] rounded-md py-1 p-2 border-primarycolors-gray">
          <div className="flex gap-3 justify-between items-center">
            <div className="w-fit border-[1px] border-primarycolors-gray rounded-md p-1">
              <AiFillInsurance className="text-xl" />
            </div>
            <div className="text-left flex-grow">
              <p className="text-[8px]">
                Secure your trip by paying just Rs.10 per person
              </p>
              <h1 className="font-semibold text-sm">
                ACKO Genral Travel Insurance
              </h1>
              <AiOutlineInfoCircle className="-mt-2 text-primarycolors-red" />
            </div>
            <div className="w-fit ">
              <input type="checkbox" className="text-xl" />
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
        />{" "}
        I agree to all the{" "}
        <span className=" text-primarycolors-skyblue">
          Terms and Conditions
        </span>
      </div>
    </div>
  );
};

export default PassengerDetailsMobile;
