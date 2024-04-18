import React from "react";
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
const PassengerDetailsMobile = () => {
  const selectedSeats = useSelector(
    (state) => state.busDetailsReducer.selectedSeats
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

  const navigate = useNavigate();

  const handlePay = () => {
    navigate("/payment");
  };

  return (
    <div className="m-3 my-5 mb-[7rem]">
      <div className="shadow-md border-[0.2px] rounded-md p-4  border-primarycolors-gray">
        <div className="flex gap-2 justify-between">
          <div className="text-left justify-start flex flex-col">
            <h2 className="text-base font-bold">Jaipur</h2>
            <p className="text-sm text-primarycolors-textcolor">
              MI Road Sindhi Camp
            </p>
            <p className="text-xs  text-primarycolors-textcolor">
              23:10 22 Aug 2023
            </p>
          </div>

          <div className="px-3">
            <div className="text-xl rotate-180  font-normal">
              <BiArrowBack />
            </div>
          </div>
          <div className=" text-right flex flex-col">
            <h2 className="text-base font-bold">Jaipur</h2>
            <p className="text-sm text-primarycolors-textcolor">
              MI Road Sindhi Camp
            </p>
            <p className="text-xs  text-primarycolors-textcolor">
              23:10 22 Aug 2023
            </p>
          </div>
        </div>
      </div>
      <div className="my-6">
        <h2 className="text-left my-2">Your ticket info will be sent here</h2>
        <div className="shadow-md border-[1px] rounded-md py-4  p-2 border-primarycolors-gray">
          <div className="">
            <input
              type="email"
              name="text"
              className="input"
              placeholder="Email Address"
            />
          </div>
          <div className="mt-3 flex items-center gap-4">
            <div className="w-[80%]">
              <input
                type="tel"
                name="text"
                class="input"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <div class="checkbox-wrapper">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6">
        <h2 className="text-left my-2">Passenger Details</h2>
        <div className="shadow-md border-[1px] rounded-md py-1 p-2 border-primarycolors-gray">
          {selectedSeats.map((seatNo, index) => {
            return (
              <div key={index} className="grid gap-2 grid-cols-5 my-5 mx-auto">
                <div className="col-span-3">
                  <input
                    type="text"
                    name="text"
                    class="input"
                    placeholder="Full Name"
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    name="text"
                    class="input"
                    placeholder="Age"
                  />
                </div>
                <div className="flex flex-col items-center justify-center    -mt-1 ">
                  <div className="flex  items-center  justify-center  gap-1 w-full">
                    <div className="flex w-1/2">
                      <img
                        src={man}
                        alt="Male"
                        className={`w-full rounded-full   cursor-pointer`}
                      />
                    </div>
                    <div className="flex w-1/2">
                      <img
                        src={women}
                        alt="Female"
                        className={` w-full rounded-full   cursor-pointer`}
                      />
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
        <input type="checkbox" /> I agree to all the{" "}
        <span className=" text-primarycolors-skyblue">
          Terms and Conditions
        </span>
      </div>
   
    </div>
  );
};

export default PassengerDetailsMobile;
