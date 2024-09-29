import React, { useState, useEffect } from "react";
import Upcoming from "./Upcoming";
import Past from "./Past";
import Cancelled from "./Cancelled";
import Unsuccessfull from "./Unsuccessfull";

const BookingSection = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookinghistory, setBookingHistory] = useState([]);
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  console.log(bookinghistory);
  const userId = localStorage.getItem("userData");
  const userIdString = JSON.parse(userId);
  const fetchData = async () => {
    // Make the API call
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      userIdString.access_token.split("Bearer")[1]
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
      "https://seatadda.co.in/auth/api/bus-booking-history",
      requestOptions
    );
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    // Parse the JSON response
    const jsonData = await response.json();
    // Update the state with the fetched data
    // console.log(jsonData.data);
    setBookingHistory(jsonData.data);
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filterDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // Adjust month to 0-based index
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight

  const upcomingBookings = bookinghistory.filter(
    (booking) => filterDate(booking.arrival_date) >= today
  );
  const pastBookings = bookinghistory.filter(
    (booking) => filterDate(booking.arrival_date) < today
  );
  return (
    <div className="my-4   container mx-auto">
      <h1 className="hidden md:block font-bold text-2xl my-2">My Bookings</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4   gap-2  shadow-md mx-1  bg-primarycolors-white border-primarycolors-gray md:border-t-[1px] my-0">
        <button
          className={` rounded-lg  rounded-b-none walletbtn  p-2  ${
            activeTab === "upcoming"
              ? "border-primarycolors-red  text-primarycolors-red border-b-2"
              : ""
          }`}
          onClick={() => handleTabClick("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={` rounded-lg  rounded-b-none walletbtn p-2  ${
            activeTab === "past"
              ? "border-primarycolors-red text-primarycolors-red  border-b-2 "
              : ""
          }`}
          onClick={() => handleTabClick("past")}
        >
          Past
        </button>
        <button
          className={` rounded-lg  rounded-b-none walletbtn p-2 ${
            activeTab === "cancelled"
              ? "border-primarycolors-red text-primarycolors-red  border-b-2"
              : ""
          }`}
          onClick={() => handleTabClick("cancelled")}
        >
          Cancelled
        </button>
        <button
          className={` rounded-lg  rounded-b-none walletbtn p-2  ${
            activeTab === "unsuccessfull"
              ? "border-primarycolors-red text-primarycolors-red  border-b-2"
              : ""
          }`}
          onClick={() => handleTabClick("unsuccessfull")}
        >
          Unsuccessfull
        </button>
      </div>
      <div className="tab-content relative">
        {activeTab === "upcoming" && bookinghistory !== null && (
          <Upcoming name="Upcoming" bookinghistory={upcomingBookings} />
        )}
        {activeTab === "past" && bookinghistory !== null && (
          <Past name="Past" bookinghistory={pastBookings} />
        )}
        {activeTab === "cancelled" && <Cancelled name="Cancelled" />}
        {activeTab === "unsuccessfull" && (
          <Unsuccessfull name="Unsuccessfull" />
        )}
      </div>
    </div>
  );
};

export default BookingSection;
