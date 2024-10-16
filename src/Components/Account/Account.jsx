import React, { useEffect, useState } from "react";

import AccountSection from "./AccountSection";
import { BiArrowBack } from "react-icons/bi";
import Navbar from "../Navigation";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import FooterDesktop from "../FooterDesktop";

import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { edituser } from "../../Redux/auth/action";

const Account = () => {
  const navigate = useNavigate();
  const handleBackward = () => {
    if (save) {
      const confirmed = window.confirm(
        "Are you sure you want to go back?\nYour Data is Not Saved"
      );
      if (confirmed) {
        navigate(-1);
      }
    } else navigate(-1);
  };

  const [edit, setEdit] = useState(true);
  const [save, setSave] = useState(false);
  const currentDate = new Date().toISOString().slice(0, 10);
  // console.log(currentDate);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const currentCustomer = useSelector(
    (state) => state.authReducer.currentCustomer
  );

  // console.log(currentCustomer)
  /*  let storedUserData = localStorage.getItem("userData");
  console.log(JSON.parse(storedUserData).user.user_id);
  storedUserData = JSON.parse(storedUserData); */
  const [userData, setUserData] = useState(null);

  const handleEdit = () => {
    setEdit(!edit);
    // setSave(!save);
  };
  // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const phoneNumberPattern = /^\d{10}$/;
  const handleSave = () => {
    setEdit(!edit);
    setSave(!save);
  };
  const userId = localStorage.getItem("userData");
  const userIdString = JSON.parse(userId);
  const user_details = async () => {
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
      "https://seatadda.co.in/auth/api/user-details",
      requestOptions
    );
    const data = await response.json();
    setUserData(data.data);
    localStorage.setItem("Edit", JSON.stringify(data.data));
    console.log(data.data);
  };
  useEffect(() => {
    user_details();
  }, []);
  return (
    // <div className="">
    //   <div className="hidden md:block ">
    //     <Navbar />
    //   </div>
    //   <div className="md:hidden block">
    //     <div className="fixed  shadow-xl border-b-[1px] border-primarycolors-gray overflow-y-hidden top-0   z-10 w-full  flex justify-between items-center gap-4  text-primarycolors-white py-3 px-2 bg-primarycolors-textcolor ">
    //       <div className=" flex items-center  gap-4">
    //         <div className="text-3xl font-normal" onClick={handleBackward}>
    //           <BiArrowBack />
    //         </div>
    //         <div className=" px-0 text-left text-lg  mt-0    ">My Account</div>
    //       </div>
    //     </div>
    //     <div className=" mt-3 flex justify-end pr-6">
    //       {edit && (
    //         <button
    //           onClick={handleEdit}
    //           className="px-0 text-center pr-4 sm:pr-0  text-lg mt-1   "
    //         >
    //           Edit
    //         </button>
    //       )}
    //       {save && (
    //         <button
    //           onClick={() => handleSave(userData)}
    //           className="px-0 text-center pr-4 sm:pr-0  text-lg mt-1 "
    //           style={{ marginTop: "80px" }}
    //         >
    //           Save
    //         </button>
    //       )}
    //     </div>
    //   </div>
    //   <div className="relative top-[0.5rem] md:top-0 mx-auto container">
    //     <div className="hidden md:flex mt-3 justify-end pr-6">
    //       {edit && (
    //         <button
    //           onClick={handleEdit}
    //           className=" bg-primarycolors-red px-4 py-2 text-primarycolors-white rounded-md text-center  text-xl mt-1  font-light  "
    //         >
    //           Edit
    //         </button>
    //       )}
    //       {save && (
    //         <button
    //           onClick={() => handleSave(userData)}
    //           className="bg-primarycolors-red text-primarycolors-white px-4 py-2 rounded-md text-center  text-xl mt-1  font-light  "
    //         >
    //           Save
    //         </button>
    //       )}
    //     </div>{" "}
    //     <div className="">
    //       {userData !== null && (
    //         <AccountSection
    //           isEditable={edit}
    //           userData={userData}
    //           // setUserData={setUserData}
    //           // handleSave={handleSave}
    //         />
    //       )}
    //     </div>
    //   </div>

    //   <div>
    //     <FooterDesktop />
    //   </div>
    // </div>
    <div className="overflow-x-hidden">
      <div className="hidden md:block">
        <Navbar />
      </div>

      <div className="md:hidden block">
        <div className="fixed shadow-xl border-b-[1px] border-primarycolors-gray overflow-y-hidden top-0 z-10 w-full flex justify-between items-center gap-4 text-primarycolors-white py-3 px-2 bg-primarycolors-textcolor">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-normal" onClick={handleBackward}>
              <BiArrowBack />
            </div>
            <div className="text-left text-lg mt-0">My Account</div>
          </div>
          <div className=" flex justify-center pr-6">
            {edit && (
              <button
                onClick={handleEdit}
                className="text-center pr-4 sm:pr-2 text-lg mt-1"
              >
                Edit
              </button>
            )}
            {save && (
              <button
                onClick={() => handleSave(userData)}
                className="text-center pr-4 sm:pr-2 text-lg mt-1"
                style={{ marginTop: "80px" }}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative top-[0.5rem] md:top-0 mx-auto container w-full">
        <div className="hidden md:flex mt-3 justify-end pr-6">
          {edit && (
            <button
              onClick={handleEdit}
              className="bg-primarycolors-red px-4 py-2 text-primarycolors-white rounded-md text-center text-xl mt-1 font-light"
            >
              Edit
            </button>
          )}
          {save && (
            <button
              onClick={() => handleSave(userData)}
              className="bg-primarycolors-red text-primarycolors-white px-4 py-2 rounded-md text-center text-xl mt-1 font-light"
            >
              Save
            </button>
          )}
        </div>

        <div className="mt-5">
          {userData !== null && (
            <AccountSection isEditable={edit} userData={userData} />
          )}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Account;
