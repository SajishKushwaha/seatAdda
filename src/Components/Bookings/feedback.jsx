import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaStar } from "react-icons/fa"; // Install react-icons with 'npm install react-icons'
import Swal from "sweetalert2";
import Navbar from "../Navigation";
const FeedbackForm = () => {
  // const [rating, setRatting] = useState(1);
  const [feedback, setFeedback] = useState("");
  const user = JSON.parse(localStorage.getItem("userData"));
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const ticket_id = query.get("ticketid");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userId, setUserId] = useState(user.user.user_id);
  const [ticketId, setTicketId] = useState(ticket_id);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const Dull = () => (
    <svg
      className="rating-0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="32"
      height="32"
    >
      <circle cx="256" cy="256" r="256" fill="#ffd93b" />
      <path
        d="M512 256c0 141.44-114.64 256-256 256-80.48 0-152.32-37.12-199.28-95.28 43.92 35.52 99.84 56.72 160.72 56.72 141.36 0 256-114.56 256-256 0-60.88-21.2-116.8-56.72-160.72C474.8 103.68 512 175.52 512 256z"
        fill="#f4c534"
      />
      <ellipse
        transform="scale(-1) rotate(31.21 715.433 -595.455)"
        cx="166.318"
        cy="199.829"
        rx="56.146"
        ry="56.13"
        fill="#fff"
      />
      <ellipse
        transform="rotate(-148.804 180.87 175.82)"
        cx="180.871"
        cy="175.822"
        rx="28.048"
        ry="28.08"
        fill="#3e4347"
      />
      <ellipse
        transform="rotate(-113.778 194.434 165.995)"
        cx="194.433"
        cy="165.993"
        rx="8.016"
        ry="5.296"
        fill="#5a5f63"
      />
      <ellipse
        transform="scale(-1) rotate(31.21 715.397 -1237.664)"
        cx="345.695"
        cy="199.819"
        rx="56.146"
        ry="56.13"
        fill="#fff"
      />
      <ellipse
        transform="rotate(-148.804 360.25 175.837)"
        cx="360.252"
        cy="175.84"
        rx="28.048"
        ry="28.08"
        fill="#3e4347"
      />
      <ellipse
        transform="scale(-1) rotate(66.227 254.508 -573.138)"
        cx="373.794"
        cy="165.987"
        rx="8.016"
        ry="5.296"
        fill="#5a5f63"
      />
      <path
        d="M370.56 344.4c0 7.696-6.224 13.92-13.92 13.92H155.36c-7.616 0-13.92-6.224-13.92-13.92s6.304-13.92 13.92-13.92h201.296c7.696.016 13.904 6.224 13.904 13.92z"
        fill="#3e4347"
      />
    </svg>
  );
  const SadFace = () => (
    <svg
      className="w-64 h-64"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
  const NeutralFace = () => (
    <svg
      className="w-64 h-64"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="40" fill="#F7DC6F" />
      <circle cx="35" cy="40" r="5" fill="#8BC34A" />
      <circle cx="65" cy="40" r="5" fill="#8BC34A" />
      <path d="M 50,60 L 50,70" stroke="#8BC34A" strokeWidth="5" />
    </svg>
  );
  const SlightlyHappyFace = () => (
    <svg
      className="w-64 h-64"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="#F7DC6F"
        stroke="#F2C464"
        strokeWidth="4"
      />
      <circle
        cx="35"
        cy="40"
        r="5"
        fill="#8BC34A"
        stroke="#3E8E41"
        strokeWidth="2"
      />
      <circle
        cx="65"
        cy="40"
        r="5"
        fill="#8BC34A"
        stroke="#3E8E41"
        strokeWidth="2"
      />
      <path
        d="M 50,60 Q 55,70 60,60"
        stroke="#F2C464"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
  const HappyFace = () => (
    <svg
      className="w-64 h-64"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="#F7DC6F"
        stroke="#F2C464"
        strokeWidth="4"
      />
      <circle
        cx="35"
        cy="40"
        r="5"
        fill="#8BC34A"
        stroke="#3E8E41"
        strokeWidth="2"
      />
      <circle
        cx="65"
        cy="40"
        r="5"
        fill="#8BC34A"
        stroke="#3E8E41"
        strokeWidth="2"
      />
      <path d="M 50,60 Q 60,70 70,60" stroke="#F2C464" strokeWidth="4" />
    </svg>
  );
  const LovedFace = () => (
    <svg
      className="w-64 h-64"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="25" cy="25" r="20" fill="yellow" /> {/* Face */}
      <circle cx="17" cy="20" r="2" fill="black" /> {/* Left Eye */}
      <circle cx="33" cy="20" r="2" fill="black" /> {/* Right Eye */}
      <path
        d="M15 30 Q25 40, 35 30" // Smiling Mouth
        stroke="black"
        strokeWidth="2"
        fill="none"
      />
      {/* Heart Eyes */}
      <path
        d="M16 22 C15 18, 20 15, 20 20 C20 25, 15 22, 16 22 Z" // Left Heart Eye
        fill="red"
      />
      <path
        d="M32 22 C31 18, 26 15, 26 20 C26 25, 31 22, 32 22 Z" // Right Heart Eye
        fill="red"
      />
    </svg>
  );

  const ratings = [
    // { rating: 0, emoji: <Dull /> },
    { rating: 1, emoji: <SadFace /> },
    { rating: 2, emoji: <NeutralFace /> },
    { rating: 3, emoji: <SlightlyHappyFace /> },
    { rating: 4, emoji: <HappyFace /> },
    { rating: 5, emoji: <LovedFace /> },
  ];

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // setIsSubmitted(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", user.access_token.split("Bearer")[1]);
    const formdata = new FormData();
    formdata.append("user_id", user.user.user_id);
    formdata.append("ride_id", ticket_id);
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
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Thanks!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/");
    });
  };

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  const handleTicket = (e) => {
    setTicketId(e.target.value);
  };
  // const handleRatingChange = (rate) => {
  //   setRatting(rate);
  // };
  const handleRatingChange = (rate) => {
    setRating(rate);
  };
  const handleFeedback = (e) => {
    setFeedback(e.target.value);
  };
  const handleBackward = () => {
    navigate("/bookings");
  };
  console.log(rating);
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
            {/* <div className="mb-4 ">
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
            </div> */}
            {/* <div className="mb-4">
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
            </div> */}
            <div className="mb-4">
              {/* <label
                className="block text-gray-700 text-sm font-bold mb-2 text-start"
                htmlFor="rating"
              >
                Rating:
              </label> */}
              {/* <div className="flex">
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
              </div> */}
              {/* <div className="flex flex-col items-start">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="rating"
                >
                  Rating:
                </label>
                <div className="flex">
                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;

                    return (
                      <label key={ratingValue}>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                          className="hidden"
                        />
                        <FaStar
                          size={30}
                          className="cursor-pointer transition-colors duration-300"
                          color={
                            ratingValue <= (hover || rating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
                <p className="mt-2 text-gray-700">
                  Your Rating: {rating ? rating : "None"}
                </p>
              </div> */}
              <div className="flex flex-col space-y-2">
                {/* Emoji Row */}
                <div className="flex justify-center">
                  {ratings
                    .filter((item) => item.rating === rating) // Filter for the current rating
                    .map((item) => (
                      <div key={item.rating}>
                        {item.emoji} {/* Render the corresponding emoji */}
                      </div>
                    ))}
                </div>

                {/* Star Rating Row */}
                <div className="flex justify-center space-x-2">
                  {ratings.map((item, index) => (
                    <div
                      key={item.rating}
                      className={`text-3xl cursor-pointer ${
                        hoverRating >= item.rating || rating >= item.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => setRating(item.rating)}
                      onMouseEnter={() => setHoverRating(item.rating)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      {index < rating ? "⭐️" : "☆"}
                    </div>
                  ))}
                </div>
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
