import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiXCircle } from "react-icons/bi";
import { FaBus, FaHotel, FaAddressCard } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ContactSection = () => {
  const url = "https://seatadda.co.in/api/support";
  const [CONTACT_DATA, set_CONTACT_DATA] = useState([]);
  const [loading, setloading] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    message: "",
    email: "",
    mobile: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleFeedback = async () => {
    // console.log(formState);
    try {
      // Assuming you have an API endpoint for handling feedback
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("message", formState.message);
      formData.append("email", formState.email);
      formData.append("mobile", formState.mobile);

      // console.log(formData);
      const response = await axios.post(
        "https://seatadda.co.in/api/contact-form",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(response.data);
      if (response.data.status === true) {
        toast.success(response.data.message);
      } else {
        // console.log(response.data.message);
        toast.error(response.data.message);
      }
      setShowFeedbackModal(false);
      setFormState((prevFormState) => ({
        ...prevFormState,
        name: "",
        message: "",
        email: "",
        mobile: "",
      }));
    } catch (error) {
      setShowFeedbackModal(false);

      setFormState((prevFormState) => ({
        ...prevFormState,
        name: "",
        message: "",
        email: "",
        mobile: "",
      }));

      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const fetchInfo = async () => {
    setloading(true);
    return fetch(url)
      .then((res) => res.json())
      .then((d) => {
        set_CONTACT_DATA(d.date);
        setloading(false);
      });
  };
  // console.log(CONTACT_DATA);
  useEffect(() => {
    fetchInfo();
  }, []);

  const CONTACT = [
    {
      name: "BUS",
      icon: <FaBus className="text-2xl text-primarycolors-red" />,
      email: "bus@example.com",
      phone: "040-61656789",
    },
    {
      name: "BUS Rental",
      icon: <FaBus className="text-2xl text-primarycolors-red" />,
      email: "rental@example.com",
      phone: "040-61656789",
    },
  ];

  if (loading) {
    return (
      <div className="py-2.5 px-5 mr-2 text-sm font-medium text-primarycolors-textcolor  bg-primarycolors-white rounded  hover:bg-gray-100 hover:text-blue-700 flex items-center h-[70vh] justify-center">
        <svg
          aria-hidden="true"
          role="status"
          class="inline mr-2 w-8 h-8  text-primarycolors-textcolor animate-spin "
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          ></path>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          ></path>
        </svg>
      </div>
    );
  }
  return (
    <div className="my-3 pb-[4rem] sm:pb-0 min-h-[65vh]">
      <div className=" bg-primarycolors-btncolor/30 rounded-md p-3 mx-3 border-[0.3px] border-primarycolors-gray">
        <p className="text-sm">
          You Can reach out to us for any service related queries
        </p>

        <h1 className="text-2xl my-3 mb-2 font-semibold">Happy to Help!</h1>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {CONTACT_DATA.map((data, index) => {
          return (
            <div
              key={index}
              className=" bg-primarycolors-white shadow-md p-5 mx-3 my-2 sm:my-5 rounded-md border-[1px] border-primarycolors-gray"
            >
              <div className="flex items-center gap-3">
                <FaBus className="text-2xl text-primarycolors-red" />
                <h2 className="font-bold">Support</h2>
              </div>

              <div className="mt-2 text-sm">
                {/* <div className="flex items-center gap-1 p-1">
                  <p>Chat Support:</p>
                  <p className=" text-primarycolors-skyblue">
                    <NavLink to="/help">Click Here</NavLink>
                  </p>
                </div> */}
                <div className="flex items-center gap-1 p-1">
                  <p>Email:</p>
                  <p className=" text-primarycolors-skyblue">
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                  </p>
                </div>
                {data.mobile1 && (
                  <div className="flex items-center gap-1 p-1">
                    <p>Phone:</p>
                    <p className=" text-primarycolors-skyblue">
                      <a href={`tel:${data.mobile1}`}>{data.mobile1}</a>
                    </p>
                  </div>
                )}
                {data.mobile2 && (
                  <div className="flex items-center gap-1 p-1">
                    <p>Mobile:</p>
                    <p className=" text-primarycolors-skyblue">
                      <a href={`tel:${data.mobile2}`}>{data.mobile2}</a>
                    </p>
                  </div>
                )}

                {data.address && (
                  <div className="flex items-center gap-1 p-1">
                    <p>Address:</p>
                    <p className=" text-primarycolors-skyblue">
                      <p>{data.address}</p>
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/*  <div className=" bg-primarycolors-white shadow-md p-5 mx-3 my-2 sm:my-5 rounded-md border-[1px] border-primarycolors-gray">
        <div className="flex items-center gap-3">
          <FaAddressCard className="text-2xl text-primarycolors-red" />
          <h2 className="font-bold">OFFICE ADDRESS</h2>
        </div>

        <div className="mt-2 text-sm">
          <div className=" text-left gap-1 p-1">
            <p className="leading-normal">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis
              vitae pariatur quo amet voluptatibus porro delectus aperiam
              veritatis quidem sapiente?
            </p>
          </div>
          <div className="flex items-center gap-1 p-1">
            <p>Email:</p>
            <p className=" text-primarycolors-skyblue">
              <a href="mailto:someone@example.com">someone@example.com</a>
            </p>
          </div>
          <div className="flex items-center gap-1 p-1">
            <p>Phone:</p>
            <p className=" text-primarycolors-skyblue">
              <a href="tel:+4733378901">+4733378901</a>
            </p>
          </div>
        </div>
      </div> */}
      <button
        type="button"
        className="py-1 mb-5  mt-2 w-fit px-2 bg-primarycolors-red  mx-3 text-primarycolors-white text-lg  rounded-md"
        title="feeback"
        onClick={() => {
          setShowFeedbackModal(true);
        }}
      >
        Contact Team
      </button>

      {showFeedbackModal && (
        <div className="modal-container">
          <div className="modal-content flex items-center   justify-center  w-full  overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" sm:p-4 md:p-0   w-full max-w-[50rem]  ">
              <div className="m-2 sm:mt-10 bg-primarycolors-white rounded-lg relative ">
                <section class="flex flex-col justify-between h-full bg-gray-100 text-gray-600">
                  <div className="flex gap-4 items-center justify-between bg-primarycolors-red px-3 rounded-t-lg  ">
                    <h2 className="py-2 text-sm text-primarycolors-white font-bold text-left gap-1">
                      Contact Team
                    </h2>
                    <button
                      type="button"
                      className="text-primarycolors-white rounded-lg text-xl pointer  ml-auto inline-flex items-center hover:text-gray-200"
                      title="Close"
                      onClick={() => {
                        setShowFeedbackModal(false);
                      }}
                    >
                      <BiXCircle size={20} />
                    </button>
                  </div>
                  <div className=" my-2 ">
                    <div className="text-center text-primarycolors-black">
                      <h1 className="  text-md font-bold">Need Help?</h1>
                      <p className="text-xs px-3 ">
                        Fill the below form and Team will Contact you within 3-5
                        working days
                      </p>{" "}
                    </div>
                    <div className="my-5 flex flex-col gap-2">
                      {/* Name Input */}
                      <div className="w-[95%] flex items-center gap-2">
                        <label
                          htmlFor="name"
                          className="w-1/4 mb-2 flex justify-end text-[12px] font-medium text-gray-900"
                        >
                          Name:
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="name"
                          placeholder="john doe"
                          value={formState.name}
                          onChange={handleInputChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.75rem] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>

                      {/* Email Input */}
                      <div className="w-[95%] flex items-center gap-2">
                        <label
                          htmlFor="email"
                          className="w-1/4 mb-2 flex justify-end text-[12px] font-medium text-gray-900"
                        >
                          Email:
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formState.email}
                          onChange={handleInputChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.75rem] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>

                      {/* Mobile Input */}
                      <div className="w-[95%] flex items-center gap-2">
                        <label
                          htmlFor="mobile"
                          className="w-1/4 mb-2 flex justify-end text-[12px] font-medium text-gray-900"
                        >
                          Mobile:
                        </label>
                        <input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          placeholder="+91 9126567432"
                          value={formState.mobile}
                          onChange={handleInputChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.75rem] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                      {/* Feedback Textarea */}
                      <div className="w-[95%] flex items-center gap-2">
                        <label
                          htmlFor="message"
                          className="w-1/4 mb-2 flex justify-end text-[12px] font-medium text-gray-900"
                        >
                          Message:
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="3"
                          className="my-2 text-[0.75rem] w-3/4 p-2 border-[1px] rounded-md"
                          placeholder="Enter your feedback here..."
                          value={formState.message}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" flex justify-center">
                    <button
                      type="button"
                      className="py-1 mb-5   w-fit px-2 bg-primarycolors-red  mx-3 text-primarycolors-white text-md  rounded-md"
                      title="feeback"
                      onClick={handleFeedback}
                    >
                      Send Message
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSection;
