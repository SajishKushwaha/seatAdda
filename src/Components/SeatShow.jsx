import React, { useEffect, useRef, useState } from "react";
import { FaPhoneVolume } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { IoIosMan } from "react-icons/io";
import Navbar from "./Navigation";
import { BiArrowBack } from "react-icons/bi";
import { IoWalletOutline } from "react-icons/io5";
import { IoIosWoman } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaBus } from "react-icons/fa";
import html2canvas from "html2canvas";
import { SlCalender } from "react-icons/sl";
import html2pdf from "html2pdf.js/dist/html2pdf.min";
import "./index.css";
const SeatShow = () => {
  const [seatDetails, setSeatDetails] = useState(null);

  function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(":").map((num) => parseInt(num));
    // Determine AM or PM
    const suffix = hours >= 12 ? "PM" : "AM";
    // Convert hours to 12-hour format
    const adjustedHours = hours % 12 || 12;
    // Return formatted time
    return `${adjustedHours}:${minutes < 10 ? "0" : ""}${minutes} ${suffix}`;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    const parts = formattedDate.split(" ");
    return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`;
  };
  const navigate = useNavigate();
  const handleBackward = () => {
    navigate("/");
  };
  const reportTemplateRef = useRef(null);

  // const handleGeneratePdf = async () => {
  //   const printElement = reportTemplateRef.current;
  //   console.log(printElement);

  //   html2pdf().from(printElement).save();
  // };
  // const handleGeneratePdf = () => {
  //   const element = document.getElementById("capture");
  //   html2canvas(element).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");

  //     // PDF banane ke liye ek instance banaye
  //     var pdf = new jsPDF("p", "mm", "a4");

  //     // Canvas ka width aur height lein
  //     var width = pdf.internal.pageSize.getWidth();
  //     var height = pdf.internal.pageSize.getHeight();

  //     // Image ko PDF me add karein
  //     pdf.addImage(imgData, "PNG", 0, 10, width, height);

  //     // PDF ko download karein
  //     pdf.save("booking.pdf");
  //   });
  // };
  const handleGeneratePdf = () => {
    const element = document.getElementById("capture");

    // Add the mobile-view class to simulate mobile view
    element.classList.add("mobile-view");

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Create a new jsPDF instance
      var pdf = new jsPDF("p", "mm", "a4");

      // Get the width and height of the canvas
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, width, height);

      // Remove the mobile-view class after capturing
      element.classList.remove("mobile-view");

      // Save the PDF
      pdf.save("booking.pdf");
    });
  };
  const handlePrint = () => {
    window.print();
  };
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const ticket_id = query.get("ticketid");
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
    formdata.append("ticket_id", ticket_id);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    const response = await fetch(
      "https://seatadda.co.in/auth/api/ticket-details",
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
    setSeatDetails(jsonData.data);
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        {" "}
        <div className="hidden md:block navbar">
          <Navbar />
        </div>
        <div className="md:hidden navbar block mb-20">
          <div className="fixed  border-b-[1px] border-primarycolors-gray  overflow-y-hidden top-0   z-10 w-full  flex items-center gap-4  text-primarycolors-white py-3 px-2 bg-primarycolors-textcolor">
            <div className="text-3xl font-normal" onClick={handleBackward}>
              <BiArrowBack className="font-light" />
            </div>
            <div className=" px-0 text-left text-xl mt-1 font-light ">
              Bookings
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* {seatDetails !== null && (
          <div className="mb-20">
            <div
              style={{
                textAlign: "end",
                margin: "20px",
                marginRight: "20px",
              }}
              className="navbar"
            >
              <button
                style={{
                  marginRight: "20px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  backgroundColor: "red",
                  color: "white",
                  width: "120px",
                  height: "40px",
                  borderRadius: "10px",
                }}
                onClick={handleGeneratePdf}
              >
                Download
              </button>
              <button
                style={{
                  marginLeft: "20px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  backgroundColor: "red",
                  color: "white",
                  width: "120px",
                  height: "40px",
                  borderRadius: "10px",
                }}
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
            <div ref={reportTemplateRef}>
              <div
                style={{
                  margin: "20px",
                }}
              >
                <div
                  style={{
                    borderStyle: "solid",
                    borderWidth: "3px",
                    borderColor: "lightgray",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/logo-icon.png"
                      alt="logo"
                      style={{ height: "50px" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconContext.Provider
                        value={{
                          color: "blue",
                          size: "30px", // Adjust size here
                        }}
                      >
                        <div>
                          <FaPhoneVolume />
                        </div>
                      </IconContext.Provider>

                      <div style={{ marginLeft: "10px" }}>
                        <span style={{ fontSize: "10px" }}>
                          SeatAdda Helpline
                        </span>
                        <hr />
                        <p style={{ fontSize: "10px" }}>78964433</p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "lightyellow",
                      marginTop: "20px",
                      height: "50px",
                      marginBottom: "40px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    <div>
                      <h1>{`${seatDetails[0].sourse} to ${seatDetails[0].destination}`}</h1>
                    </div>
                    <div>
                      <h1>{formatDate(seatDetails[0].arrival_date)}</h1>
                    </div>
                    <div>
                      <h1>{seatDetails[0].travels_name}</h1>
                    </div>
                  </div>
                  <hr />
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <div>
                      <h1 className="customer_seat">Passanger name</h1>
                      <hr />
                      <p className="customer_seat_value">
                        {seatDetails[0].passenger_name}
                      </p>
                    </div>
                    <div>
                      <h1 className="customer_seat">SeatAdda ticket#</h1>
                      <hr />
                      <p className="customer_seat_value">
                        {seatDetails[0].ticket_id}
                      </p>
                    </div>
                    <div>
                      <h1 className="customer_seat">Seat number(s)</h1>
                      <hr />
                      <p className="customer_seat_value">
                        {seatDetails[0].seat_number}
                      </p>
                    </div>
                    <div>
                      <h1 className="customer_seat">PNR #</h1>
                      <hr />
                      <p className="customer_seat_value">
                        {seatDetails[0].reg_no}
                      </p>
                    </div>
                    <div>
                      <h1 className="customer_seat">Trip</h1>
                      <hr />
                      <p className="customer_seat_value">
                        {seatDetails[0].destination}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div>
                        <h1 className="customer_seat">Bus type</h1>
                        <hr />
                        <p className="customer_seat_value">
                          {seatDetails[0].seat_types}
                        </p>
                      </div>
                      <div>
                        <h1 className="customer_seat">Total fare</h1>
                        <hr />
                        <p className="customer_seat_value">
                          {seatDetails[0].fare}
                        </p>
                      </div>
                    </div>
                    <div style={{ marginLeft: "24px" }}>
                      <div>
                        <h1 className="customer_seat">Reporting time</h1>
                        <hr />
                        <p className="customer_seat_value">
                          {convertTo12HourFormat(seatDetails[0].boarding_time)}
                        </p>
                      </div>
                      <div>
                        <h1 className="customer_seat">Departure time</h1>
                        <hr />
                        <p className="customer_seat_value">
                          {convertTo12HourFormat(seatDetails[0].boarding_time)}
                        </p>
                      </div>
                    </div>

                    <div style={{ marginRight: "2%" }}>
                      <h1 className="customer_seat">Boarding Point address</h1>
                      <hr />
                      <p className="customer_seat_value">
                        {seatDetails[0].boading_points}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  margin: "20px",
                }}
              >
                <h1
                  className="text-start underline"
                  style={{ fontSize: "10px" }}
                >
                  Terms and conditions
                </h1>

                <ol
                  className="text-start termAndCondition"
                  style={{
                    fontSize: "10px",
                    fontWeight: "500",
                    listStyleType: "roman",
                    marginLeft: "20px",
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "20px",
                  }}
                >
                  <li style={{ width: "50vw" }} className="termAndCondition">
                    seatAdda* is ONLY a bus ticket agent. It does not operate
                    bus services of its own. In order to provide a comprehensive
                    choice of bus operators, departure times and prices to
                    customers, it has tied up with many bus operators. redBus'
                    advice to customers is to choose bus operators they are
                    aware of and whose service they are comfortable with.
                    <br />
                    <span style={{ fontWeight: "800" }}>
                      seatAdda' responsibilities include:
                    </span>
                    <ol
                      style={{
                        fontSize: "10px",
                        fontWeight: "500",
                        listStyleType: "roman",
                        marginLeft: "20px",
                      }}
                    >
                      <li className="termAndCondition">
                        Issuing a valid ticket (a ticket that will be accepted
                        by the bus operator) for its' network of bus operators
                      </li>
                      <li className="termAndCondition">
                        Providing refund and support in the event of
                        cancellation
                      </li>
                      <li className="termAndCondition">
                        Providing customer support and information in case of
                        any delays / inconvenience
                      </li>
                    </ol>
                    <span style={{ fontWeight: "800" }}>
                      seatAdda' responsibilities do NOT include:
                    </span>
                    <ol
                      style={{
                        fontSize: "10px",
                        fontWeight: "500",
                        listStyleType: "roman",
                        marginLeft: "20px",
                      }}
                    >
                      <li className="termAndCondition">
                        The bus operator's bus not departing/reaching on time
                      </li>
                      <li className="termAndCondition">
                        The bus operator's employees being rude
                      </li>
                      <li className="termAndCondition">
                        The bus operator's bus seats etc not being up to the
                        customers's expectation
                      </li>
                      <li className="termAndCondition">
                        The bus operator canceling the trip due to unavoidable
                        reasons
                      </li>
                      <li className="termAndCondition">
                        The baggage of the customer getting lost / stolen /
                        damaged
                      </li>
                      <li className="termAndCondition">
                        The bus operator changing a customer's seat at the last
                        minute to accommodate a lady / child
                      </li>
                      <li className="termAndCondition">
                        The customer waiting at the wrong boarding point (please
                        call the bus operator to find out the exact boarding
                        point if you are not a regular traveler on that
                        particular bus)
                      </li>
                      <li className="termAndCondition">
                        The bus operator changing the boarding point and/or
                        using a pick- up vehicle at the boarding point to take
                        customers to the bus departure point
                      </li>
                    </ol>
                  </li>
                  <li
                    style={{
                      width: "50vw",
                      marginLeft: "30px",
                      listStyle: "none",
                    }}
                  >
                    <ol
                      start={2}
                      style={{
                        fontSize: "10px",
                        fontWeight: "500",
                        listStyleType: "roman",
                        marginLeft: "20px",
                      }}
                    >
                      <li className="termAndCondition">
                        The departure time mentioned on the ticket are only
                        tentative timings. However the bus will not leave the
                        source before the time that is mentioned on the ticket.
                      </li>
                      <li className="termAndCondition">
                        Passengers are required to furnish the following at the
                        time of boarding the bus:
                        <ol
                          style={{
                            fontSize: "10px",
                            fontWeight: "500",
                            listStyleType: "roman",
                            marginLeft: "20px",
                          }}
                        >
                          <li className="termAndCondition">
                            A copy of the ticket (A print out of the ticket or
                            the print out of the ticket e-mail).
                          </li>
                          <li className="termAndCondition">
                            A valid identity proof Failing to do so, they may
                            not be allowed to board the bus.
                          </li>
                        </ol>
                      </li>
                      <li className="termAndCondition">
                        Change of bus: In case the bus operator changes the type
                        of bus due to some reason, redBus will refund the
                        differential amount to the customer upon being intimated
                        by the customers in 24 hours of the journey.
                      </li>
                      <li className="termAndCondition">
                        Amenities for this bus as shown on redBus have been
                        configured and provided by the bus provider (bus
                        operator). These amenities will be provided unless there
                        are some exceptions on certain days. Please note that
                        redBus provides this information in good faith to help
                        passengers to make an informed decision. The liability
                        of the amenity not being made available lies with the
                        operator and not with redBus..
                      </li>
                      <li className="termAndCondition">
                        In case one needs the refund to be credited back to
                        his/her bank account, please write your cash coupon
                        details to support@redbus.in * The home delivery charges
                        (if any), will not be refunded in the event of ticket
                        cancellation
                      </li>
                      <li className="termAndCondition">
                        In case a booking confirmation e-mail and sms gets
                        delayed or fails because of technical reasons or as a
                        result of incorrect e-mail ID / phone number provided by
                        the user etc, a ticket will be considered 'booked' as
                        long as the ticket shows up on the confirmation page of
                        www.redBus.in
                      </li>
                      <li className="termAndCondition">
                        Grievances and claims related to the bus journey should
                        be reported to redBus support team within 10 days of
                        your travel date.
                      </li>
                    </ol>
                  </li>
                </ol>
                <div style={{ pageBreakAfter: "always" }}></div>

                <table>
                  <thead>
                    <tr>
                      <th>Cancellation time</th>
                      <th>Cancellation charges</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>After 12:30 PM on 5th Jun</td>
                      <td>Rs. 600</td>
                    </tr>
                    <tr>
                      <td>Between 08:30 PM on 4th Jun-12:30 PM on 5th Jun</td>
                      <td>Rs. 300</td>
                    </tr>
                    <tr>
                      <td>Between 08:30 PM on 3rd Jun-08:30 PM on 4th Jun</td>
                      <td>Rs. 150</td>
                    </tr>
                    <tr>
                      <td>Till 08:30 PM on 3rd Jun</td>
                      <td>Rs. 60</td>
                    </tr>
                  </tbody>
                </table>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderStyle: "solid",
                    borderWidth: "3px",
                    marginTop: "10px",
                    marginBottom: "20px",
                    borderColor: "GrayText",
                  }}
                >
                  <div className="text-start">
                    <h1>seatAdda contact details</h1>
                    <hr />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <h1>Ahmedabad: </h1>
                      <h1>9876543210</h1>
                    </div>
                  </div>
                  <hr />
                  <div className="text-start">
                    <h1>seatAdda contact details</h1>
                    <hr />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <h1>Ahmedabad: </h1>
                      <h1>9876543210</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <Footer />
            </div>
          </div>
        )} */}
      </div>
      <div className="container_">
        <div
          style={{
            textAlign: "end",
            margin: "20px",
            marginRight: "20px",
          }}
          className="navbar"
        >
          <button
            style={{
              marginRight: "20px",
              borderStyle: "solid",
              borderWidth: "1px",
              backgroundColor: "red",
              color: "white",
              width: "120px",
              height: "40px",
              borderRadius: "10px",
            }}
            onClick={handleGeneratePdf}
          >
            Download
          </button>
          <button
            style={{
              marginLeft: "20px",
              borderStyle: "solid",
              borderWidth: "1px",
              backgroundColor: "red",
              color: "white",
              width: "120px",
              height: "40px",
              borderRadius: "10px",
            }}
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
        <div id="capture">
          <div className="seataddda_Containercard">
            <div className="seataddda_Container">
              <img src="/logo-icon.png" alt="logo" style={{ height: "35px" }} />
              <div className="">
                <h1 className="seatAdda_ticket_heading_container">
                  seatAdda Ticket Information
                </h1>
                <p className="seatAdda_ticket_para_container">
                  Darbhanga-Siliguri on Sunday,June 11,2023
                </p>
              </div>
            </div>
            <hr style={{ color: "#B78588" }} />
            <h1 className="seatAdda_ticket_para_container mt-2">
              Ticket Number:TS7737904995 | PNR NO:126084
            </h1>
          </div>
          <h1 className="text-start">Hey Sayeed Ahmad</h1>
          <p className="text-start mt-3">
            Thank you for booking your bus ticket with redBus,Here are the
            ticket details for your upcoming trip from Darbhanga to Siliguri on
            Sunday,June 11,2023
          </p>
          <div className="ticketDetails_Card_container">
            <div
              style={{
                backgroundColor: "#A8A9AF",
                padding: "7px",
                fontWeight: "bold",
              }}
              className="text-start"
            >
              <h1>Ticket Details</h1>
            </div>
            <div className="font_small">
              <h1
                className="text-start ml-5 pb-2 pt-2"
                style={{ color: "gray", fontWeight: "bold" }}
              >
                Journey Date and Time
              </h1>
              <div className="dateContainer" style={{ alignItems: "center" }}>
                <SlCalender style={{ color: "red" }} />
                <p style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                  11/06/2023,12:30 AM
                </p>
              </div>
              <hr
                className="mt-3"
                style={{ borderStyle: "dotted", margin: "15px" }}
              />
            </div>

            <div className=" font_small">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h1
                    className="text-start ml-5 pb-2 pt-2"
                    style={{ color: "gray", fontWeight: "bold" }}
                  >
                    Travels
                  </h1>
                  <div className="dateContainer">
                    <FaBus style={{ color: "red" }} className="mt-1" />
                    <p
                      style={{ paddingLeft: "10px", fontWeight: "bold" }}
                      className="text-start"
                    >
                      Sri Krishna Rath
                      <br />
                      <span style={{ color: "gray" }}>
                        A/C Seater/Sleeper(2+2)
                      </span>
                      <br />
                      <span style={{ color: "blue" }}>7903832833</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h1
                    className="text-start ml-5 pb-2 pt-2"
                    style={{ color: "gray", fontWeight: "bold" }}
                  >
                    Ticket Price
                  </h1>
                  <div className="dateContainer">
                    <IoWalletOutline
                      style={{ color: "red", marginTop: "5px" }}
                    />
                    <p
                      style={{ paddingLeft: "10px", fontWeight: "bold" }}
                      className="text-start"
                    >
                      Rs. 3465.0
                      <br />
                      <span style={{ color: "gray" }}>
                        (inclusive of GST and service charge,if any)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <hr
                className="mt-3"
                style={{ borderStyle: "dotted", margin: "15px" }}
              />
            </div>
            {/* <div className=" md:block lg:hidden">
            <h1 className="text-start ml-5 pb-2 pt-2">Travels</h1>
            <div className="dateContainer">
              <FaBus style={{ color: "red" }} />
              <p
                style={{ paddingLeft: "10px", fontWeight: "bold" }}
                className="text-start"
              >
                Sri Krishna Rath
                <br />
                <span>A/C Seater/Sleeper(2+2)</span>
                <br />
                <span>7903832833</span>
              </p>
            </div>
            <hr
              className="mt-3"
              style={{ borderStyle: "dotted", margin: "15px" }}
            />
          </div>
          <div className=" md:block lg:hidden">
            <h1 className="text-start ml-5 pb-2 pt-2">Ticket Price</h1>
            <div className="dateContainer">
              <IoWalletOutline style={{ color: "red" }} />
              <p
                style={{ paddingLeft: "10px", fontWeight: "bold" }}
                className="text-start"
              >
                Rs. 3465.0
                <br />
                <span>(inclusive of GST and service charge,if any)</span>
              </p>
            </div>
            <hr
              className="mt-3"
              style={{ borderStyle: "dotted", margin: "15px" }}
            />
          </div> */}
            <div className="font_small">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h1
                    className="text-start ml-5 pb-2 pt-2"
                    style={{ color: "gray", fontWeight: "bold" }}
                  >
                    Boarding Point
                  </h1>
                  <div className="dateContainer">
                    <MdOutlineLocationOn
                      style={{ color: "red", height: "30px", width: "70px" }}
                    />
                    <p
                      style={{ paddingLeft: "10px", fontWeight: "bold" }}
                      className="text-start"
                    >
                      Dharbhanga
                      <br />
                      <span style={{ color: "gray" }}>
                        Booking No 54 65 77 88 99 delhi more BUS & DRIVER NO
                        WILL BE SENT BEFORE MINUTES OF DEPARTURE VIA
                        SMS,WHATSAPP AT 79 03 69 44 51,IF Found Any KIND OF
                        DIFFICULTY WHILE BOOKING{" "}
                      </span>
                      <br />
                      <span style={{ color: "gray" }}>Landmark:Darbhanga</span>
                      <br />
                      <span style={{ color: "blue" }}>9334114720</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h1
                    className="text-start ml-5 pb-2 pt-2"
                    style={{ color: "gray", fontWeight: "bold" }}
                  >
                    Dropping Point
                  </h1>
                  <div className="dateContainer">
                    <MdOutlineLocationOn
                      style={{ color: "red", height: "30px", width: "60px" }}
                    />
                    <p
                      style={{ paddingLeft: "10px", fontWeight: "bold" }}
                      className="text-start"
                    >
                      Siliguri
                      <br />
                      <span style={{ color: "gray" }}>
                        SILIGURII BUS STAND,FROM KISANGANJ ALTERNATE BUS WILL BE
                        ARRANGED TO SILIGURI
                      </span>
                      <br />
                      <span style={{ color: "gray" }}>
                        DROPPING DATE & TIME:
                      </span>
                      <br />
                      <span>11/06/2023,08:30 AM</span>
                    </p>
                  </div>
                </div>
              </div>
              <hr
                className="mt-3"
                style={{ borderStyle: "dotted", margin: "15px" }}
              />
            </div>
            {/* <div className=" md:block lg:hidden">
            <h1 className="text-start ml-5 pb-2 pt-2">Boarding Point</h1>
            <div className="dateContainer">
              <MdOutlineLocationOn
                style={{ color: "red", height: "30px", width: "165px" }}
              />
              <p
                style={{ paddingLeft: "10px", fontWeight: "bold" }}
                className="text-start"
              >
                Dharbhanga
                <br />
                <span>
                  Booking No 54 65 77 88 99 delhi more BUS & DRIVER NO WILL BE
                  SENT BEFORE #) MINUTES OF DEPARTURE VIA SMS,WHATSAPP AT 79 03
                  69 44 51,IF Found Any KIND OF DIFFICULTY WHILE BOOKING{" "}
                </span>
                <br />
                <span>Landmark:Darbhanga</span>
                <br />
                <span>9334114720</span>
              </p>
            </div>
            <hr
              className="mt-3"
              style={{ borderStyle: "dotted", margin: "15px" }}
            />
          </div>
          <div className=" md:block lg:hidden">
            <h1 className="text-start ml-5 pb-2 pt-2">Dropping Point</h1>
            <div className="dateContainer">
              <MdOutlineLocationOn
                style={{ color: "red", height: "30px", width: "103px" }}
              />
              <p
                style={{ paddingLeft: "10px", fontWeight: "bold" }}
                className="text-start"
              >
                Siliguri
                <br />
                <span>
                  SILIGURII BUS STAND,FROM KISANGANJ ALTERNATE BUS WILL BE
                  ARRANGED TO SILIGURI
                </span>
                <span>DROPPING DATE & TIME:</span>
                <br />
                <span>11/06/2023,08:30 AM</span>
              </p>
            </div>
            <hr
              className="mt-3"
              style={{ borderStyle: "dotted", margin: "15px" }}
            />
          </div> */}
            <div className="font_small">
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h1
                      className="text-start ml-5 pb-2 pt-2"
                      style={{ color: "gray", fontWeight: "bold" }}
                    >
                      Passenger Details
                    </h1>
                  </div>
                  <div className="mr-5">
                    <h1
                      className="text-start ml-5 pb-2 pt-2"
                      style={{ color: "gray", fontWeight: "bold" }}
                    >
                      Seat No
                    </h1>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="dateContainer">
                    <IoIosMan
                      style={{ color: "red", height: "30px", width: "45px" }}
                    />

                    <p
                      style={{ paddingLeft: "10px", fontWeight: "bold" }}
                      className="text-start"
                    >
                      Sayeed Ahmad
                      <br />
                      <span style={{ color: "gray" }}>40Yrs,MALE</span>
                    </p>
                  </div>
                  <div className="mr-8">
                    <h1 style={{ color: "red" }}>SL 6 </h1>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="dateContainer">
                    <IoIosWoman
                      style={{ color: "red", height: "30px", width: "45px" }}
                    />
                    <p
                      style={{ paddingLeft: "10px", fontWeight: "bold" }}
                      className="text-start"
                    >
                      Hena mojib
                      <br />
                      <span style={{ color: "gray" }} className="text-start">
                        38Yrs,FEMALE
                      </span>
                    </p>
                  </div>
                  <div className="mr-8" style={{ color: "red" }}>
                    <h1>SL 5</h1>
                  </div>
                </div>
              </div>
              <hr
                className="mt-3"
                style={{ borderStyle: "dotted", margin: "15px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatShow;
