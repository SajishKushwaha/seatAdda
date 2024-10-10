import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Navbar from "../Navigation";
const FeedbackForm = () => {
  const [rating, setRatting] = useState(1);
  const [feedback, setFeedback] = useState("");
  const user = JSON.parse(localStorage.getItem("userData"));
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const ticket_id = query.get("ticketid");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userId, setUserId] = useState(user.user.user_id);
  const [ticketId, setTicketId] = useState(ticket_id);
  const ratings = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // setIsSubmitted(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", user.access_token.split("Bearer")[1]);
    const formdata = new FormData();
    formdata.append("user_id", userId);
    formdata.append("ride_id", ticketId);
    formdata.append("feedback", feedback);
    formdata.append("rating", rating);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };
    const response = await fetch(
      "https://seatadda.co.in/auth/api/submit-bus-ride-feedback",
      requestOptions
    );

    const data = await response.json();
    navigate("/");
    console.log(data);
  };

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  const handleTicket = (e) => {
    setTicketId(e.target.value);
  };
  const handleRatingChange = (rate) => {
    setRatting(rate);
  };
  const handleFeedback = (e) => {
    setFeedback(e.target.value);
  };
  const handleBackward = () => {
    navigate("/bookings");
  };
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:hidden block">
        <div className="fixed  border-b-[1px] border-primarycolors-gray  overflow-y-hidden top-0   z-10 w-full  flex items-center gap-4  text-primarycolors-white py-3 px-2 bg-primarycolors-textcolor">
          <div className="text-3xl font-normal" onClick={handleBackward}>
            <BiArrowBack className="font-light" />
          </div>
          <div className=" px-0 text-left text-xl mt-1 font-light ">
            Feedback Form
          </div>
        </div>
      </div>
      <div className="max-w-md mx-auto p-4 md:p-6 lg:p-8 bg-white rounded shadow-md">
        <h2
          className="text-lg font-bold mb-4 text-start"
          style={{ fontSize: "20px" }}
        >
          Feedback Form
        </h2>
        {isSubmitted ? (
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">
              Thank you for your feedback!
            </h3>
            <p className="mb-4">
              We appreciate your time and will review your feedback.
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsSubmitted(false)}
            >
              Submit Another Feedback
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-start"
                htmlFor="name"
              >
                UserId:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={userId}
                onChange={handleChange}
                required // Ensures the field is filled out before submission
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-start"
                htmlFor="email"
              >
                TicketId:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                name="ticket_id"
                value={ticketId}
                onChange={handleTicket}
                required // Ensures the field is filled out before submission
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-start"
                htmlFor="rating"
              >
                Rating:
              </label>
              <div className="flex">
                {ratings.map((rate) => (
                  <button
                    key={rate}
                    type="button" // Prevents the form from submitting
                    className={`mr-2 py-2 px-4 rounded transition-colors duration-300`}
                    style={{
                      backgroundColor: rating === rate ? "#3b82f6" : "#e5e7eb",
                      color: rating === rate ? "white" : "#374151",
                    }}
                    onClick={() => handleRatingChange(rate)} // Update rating state
                  >
                    {rate}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-start"
                htmlFor="comment"
              >
                Comment:
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="comment"
                name="comment"
                value={feedback}
                onChange={handleFeedback}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              style={{ background: "#3b82f6", color: "white" }}
              type="submit"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-10">
        <Footer />
      </div>
    </>
  );
};

export default FeedbackForm;
