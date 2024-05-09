import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navigation";
import Footer from "../Footer";
import PassengerDetails from "../PassengerDetails/PassengerDetails";
import PaymentForm from "./PaymentForm";
import FooterDesktop from "../FooterDesktop";
import { useLocation } from "react-router-dom";
const Payment = () => {
  const isLoading = useSelector((state) => state.busDetailsReducer.isLoading);
  const selectedSeats = useSelector(
    (state) => state.busDetailsReducer.selectedSeats
  );
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const total = query.get("total");
  const totalFare = useSelector((state) => state.busDetailsReducer.totalFare);
  const From = useSelector((state) => state.busDetailsReducer.From);
  const To = useSelector((state) => state.busDetailsReducer.To);
  const date = useSelector((state) => state.busDetailsReducer.date);
  const boardPoint = useSelector((state) => state.busDetailsReducer.boardPoint);

  const dropPoint = useSelector((state) => state.busDetailsReducer.dropPoint);
  const [paymentLink, setPaymentLink] = useState(null);
  const userId = localStorage.getItem("userData");
  const userIdString = JSON.parse(userId);
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
        formdata.append("amount", total);
        formdata.append("return_url", "/PaymentResponse");

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        const response = await fetch(
          "https://seatadda.co.in/auth/api/get-payment-link",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse response body as JSON
        setPaymentLink(data.payment_link);
        // console.log(data.payment_link);
        // Log the response data
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();

    // Check conditions to determine if button should be disabled
  }, []); // Dependency array includes variables passDetails, passEmail, and passPhNo

  return (
    <div>
      <Navbar />
      <div className="container mx-auto ">
        <div className="md:grid md:grid-cols-4 p-2 sm:p-5 gap-4">
          <div className="col-span-3">
            {/* <PaymentForm /> */}
            {paymentLink !== null ? (
              <iframe
                src={paymentLink}
                title="Payment Page"
                width="100%"
                height="500px"
              ></iframe>
            ) : (
              ""
            )}
          </div>
          <div className="my-5 md:my-0 border-[1px] border-dashed  px-4  text-left h-fit  shadow-2xl  flex flex-col justify-between ">
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
                <p className="m-2 flex justify-between">
                  Bus Partner GST:{" "}
                  <span className="font-bold uppercase">
                    <span className="">&#8377;</span>180
                  </span>{" "}
                </p>{" "}
                <p className="m-2 flex justify-between">
                  Total Amount:{" "}
                  <span className="font-bold">
                    <span className="">&#8377;</span>
                    {totalFare + 180}
                  </span>{" "}
                </p>
                <p className="m-2 flex justify-between">
                  Discount:{" "}
                  <span className="font-bold">
                    <span className="">&#8377;</span>
                    50
                  </span>{" "}
                </p>
              </div>

              <hr className="my-2 border-dashed" />
              <div className="p-3 mt-5 py-2 bg-primarycolors-textcolor/40 flex justify-between">
                <h1 className="font-bold text-center text-primarycolors-black ">
                  Net Payable:{" "}
                </h1>
                <p>
                  <span className="font-bold">
                    <span className="">&#8377;</span>
                    {totalFare + 180 - 50}
                  </span>{" "}
                </p>
              </div>
            </div>{" "}
          </div>
          <div></div>
        </div>
        <div></div>
      </div>
      <div></div>
      <FooterDesktop />
    </div>
  );
};

export default Payment;
