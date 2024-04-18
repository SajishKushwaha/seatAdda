import React, { useState } from 'react'
import Upcoming from './Upcoming';
import Past from './Past';
import Cancelled from './Cancelled';
import Unsuccessfull from './Unsuccessfull';

const BookingSection = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="my-4   container mx-auto">
      <h1 className='hidden md:block font-bold text-2xl my-2'>My Bookings</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4   gap-2  shadow-md mx-1  bg-primarycolors-white border-primarycolors-gray md:border-t-[1px] my-0">
        <button
          className={` rounded-lg  rounded-b-none walletbtn  p-2  ${activeTab === "upcoming" ? "border-primarycolors-red  text-primarycolors-red border-b-2" : ""
            }`}
          onClick={() => handleTabClick("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={` rounded-lg  rounded-b-none walletbtn p-2  ${activeTab === "past" ? "border-primarycolors-red text-primarycolors-red  border-b-2 " : ""
            }`}
          onClick={() => handleTabClick("past")}
        >
          Past
        </button>
        <button
          className={` rounded-lg  rounded-b-none walletbtn p-2 ${activeTab === "cancelled" ? "border-primarycolors-red text-primarycolors-red  border-b-2" : ""
            }`}
          onClick={() => handleTabClick("cancelled")}
        >
          Cancelled
        </button>
        <button
          className={` rounded-lg  rounded-b-none walletbtn p-2  ${activeTab === "unsuccessfull" ? "border-primarycolors-red text-primarycolors-red  border-b-2" : ""
            }`}
          onClick={() => handleTabClick("unsuccessfull")}
        >
          Unsuccessfull
        </button>
      </div>
      <div className="tab-content relative">
        {activeTab === "upcoming" && <Upcoming name='Upcoming' />}
        {activeTab === "past" && <Past name='Past' />}
        {activeTab === "cancelled" && <Cancelled name='Cancelled' />}
        {activeTab === "unsuccessfull" && <Unsuccessfull name='Unsuccessfull' />}

      </div>
    </div>
  )
}

export default BookingSection