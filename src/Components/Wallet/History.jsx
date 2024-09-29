import React from "react";
import { BiPlus } from "react-icons/bi";
import { FiMinus } from "react-icons/fi";
const History = ({ wallet }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      //   weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    const parts = formattedDate.split(" ");
    return ` ${parts[1]} ${parts[0]} ${parts[2]}`;
  };

  function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(":").map((num) => parseInt(num));
    const suffix = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${minutes < 10 ? "0" : ""}${minutes} ${suffix}`;
  }

  return (
    <div className="m-3 overflow-y-scroll childscroll  sm:h-[600px] pb-[2rem] ">
      {wallet.map((each, index) => {
        const amount_Color =
          each.transaction_type !== "debit"
            ? "text-primarycolors-green"
            : "text-primarycolors-red";
        const id = each.transaction_id.substring(0, 8);
        const message = each.message.substring(0, 14);
        const message1 = each.message.substring(14).replace(",", "-");

        return (
          <div
            key={index}
            className="shadow-md my-3  rounded-md border-[1px] border-primarycolors-gray"
          >
            <div className="p-2 px-2 border-b-[1px] border-primarycolors-gray flex flex-row justify-between items-center">
              <div>
                <p className="text-[12px] sm:text-base font-semibold text-left">
                  {formatDate(each.date) +
                    " " +
                    convertTo12HourFormat(each.time)}
                </p>
              </div>
              <div>
                <p>{each.transaction_id}</p>
              </div>
            </div>
            <div className="p-3 sm:p-5  grid grid-cols-4">
              <div className="col-span-3 flex flex-col text-left">
                <h2
                  className={`text-[15px] font-bold sm:text-base ${amount_Color}`}
                >
                  {each.transaction_type.charAt(0).toUpperCase() +
                    each.transaction_type.slice(1).toLowerCase()}
                </h2>
                <h2 className=" text-[15px] font-bold sm:text-base">
                  {message}
                </h2>
                <h2 className=" text-[15px] font-bold sm:text-base">
                  {message1}
                </h2>
                {/* <p className=" text-[12px] sm:text-base">
                  Registration Bonus by Web <br /> Expires on 11-10-2023
                </p>
                <p className=" text-[12px] sm:text-base">
                  Reference: <span className="font-bold">REGBONUS</span>
                </p>
                <div className="flex items-center flex-row gap-[0.5px] sm:gap-2 ">
                  <p className=" text-[12px] sm:text-base">
                    Promotional:{" "}
                    <span className="font-bold">
                      <span>&#8377;</span>100
                    </span>
                  </p>
                  <span>|</span>{" "}
                  <p className=" text-[12px] sm:text-base">
                    Non-Promotional:{" "}
                    <span className="font-bold">
                      <span>&#8377;</span>100
                    </span>
                  </p>
                </div> */}
              </div>
              <div className="flex flex-col sm:justify-center sm:items-center">
                <div
                  className={`flex items-center sm:justify-center ${amount_Color} gap-1`}
                >
                  {each.transaction_type === "debit" ? <FiMinus /> : <BiPlus />}
                  <h2 className="text-xl md:text-2xl font-semibold ">
                    <span>&#8377;</span>
                    {each.amount}
                  </h2>
                </div>
                <div>
                  <p className="text-[12px] sm:text-base font-light ">
                    Success
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;
