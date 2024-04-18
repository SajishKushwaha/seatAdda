import React, { useState } from "react";
import { BiMoney } from "react-icons/bi";
import money from "../../assets/money.png";

import History from "./History";
import Redeem from "./Redeem";
import Transfer from "./Transfer";

const WalletSection = () => {
  const [activeTab, setActiveTab] = useState("history");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="my-4  container mx-auto">
      <div className="grid grid-cols-2 shadow-lg border-b-[0.3px]  bg-primarycolors-white  border-primarycolors-gray mx-1  ">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-4 p-2">
          <img
            className="w-[60px] sm:w-[75px] md:w-[100px]"
            src={money}
            alt=""
          />
          <h2 className="text-xl md:text-2xl font-semibold">
            <span>&#8377;</span>100
          </h2>
        </div>
        <div className="flex flex-col justify-center border-l-[1px] border-primarycolors-gray  px-4 py-2  ">
          <div className="flex flex-col sm:flex-row text-left md:gap-3 mb-1 sm:my-2">
            <h2 className="text-[12px] sm:text-base">Promotional Balance: </h2>
            <h2 className="text-base font-semibold">
              <span>&#8377;</span>100
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row text-left md:gap-3 sm:my-2">
            <h2 className="text-[12px] sm:text-base">
              Non-Promotional Balance:{" "}
            </h2>
            <h2 className="text-base font-semibold">
              <span>&#8377;</span>0
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 shadow-md mx-1  rounded-lg bg-primarycolors-white border-primarycolors-textcolor my-0">
        <button
          className={` rounded-lg rounded-b-none walletbtn  p-2  ${
            activeTab === "history" ? "border-primarycolors-red  text-primarycolors-red border-b-2" : ""
          }`}
          onClick={() => handleTabClick("history")}
        >
          History
        </button>
        <button
          className={` rounded-lg rounded-b-none walletbtn p-2  ${
            activeTab === "redeem" ? "border-primarycolors-red text-primarycolors-red  border-b-2 " : ""
          }`}
          onClick={() => handleTabClick("redeem")}
        >
          Redeem
        </button>
        <button
          className={` rounded-lg rounded-b-none walletbtn p-2 ${
            activeTab === "transfer" ? "border-primarycolors-red text-primarycolors-red  border-b-2" : ""
          }`}
          onClick={() => handleTabClick("transfer")}
        >
          Transfer
        </button>
      </div>
      <div className="tab-content relative">
        {activeTab === "history" && <History />}
        {activeTab === "redeem" && <Redeem />}
        {activeTab === "transfer" && <Transfer />}
      </div>
    </div>
  );
};

export default WalletSection;
