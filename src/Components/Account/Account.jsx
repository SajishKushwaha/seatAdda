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
  const [userData, setUserData] = useState({
    username: "",
    usermobile: "",
    useremail: "",
    userBirthDate: currentDate,
    gender: "male", // Default to male
  });
  const handleEdit = () => {
    setEdit(!edit);
    setSave(!save);
  };
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneNumberPattern = /^\d{10}$/;
  const handleSave = (updatedUserData) => {
    const email = updatedUserData.useremail;
    const phone = updatedUserData.usermobile;
    const isValidemail = emailPattern.test(email);
    const isValidphone = phoneNumberPattern.test(phone);
    if (isValidemail && isValidphone) {
      setUserData(updatedUserData);
      dispatch(edituser(updatedUserData));
      // localStorage.setItem("updatedUserData", JSON.stringify(updatedUserData)); // Save to localStorage
      alert("Data Saved Successfully");
      setEdit(!edit);
      setSave(!save);
    } else {
      alert("Enter Data in Proper Format");
    }
  };

  return (
    <div className="">
      <div className="hidden md:block ">
        <Navbar />
      </div>
      <div className="md:hidden block">
        <div className="fixed  shadow-xl border-b-[1px] border-primarycolors-gray overflow-y-hidden top-0   z-10 w-full  flex justify-between items-center gap-4  text-primarycolors-white py-3 px-2 bg-primarycolors-textcolor">
          <div className=" flex items-center  gap-4">
            <div className="text-3xl font-normal" onClick={handleBackward}>
              <BiArrowBack />
            </div>
            <div className=" px-0 text-left text-lg  mt-1    ">My Account</div>
          </div>
          {edit && (
            <button
              onClick={handleEdit}
              className="px-0 text-center pr-4 sm:pr-0  text-lg mt-1   "
            >
              Edit
            </button>
          )}
          {save && (
            <button
              onClick={() => handleSave(userData)}
              className="px-0 text-center pr-4 sm:pr-0  text-lg mt-1 "
            >
              Save
            </button>
          )}
        </div>
      </div>
      <div className="relative top-[3.7rem] md:top-0 mx-auto container">
        <div className="hidden md:flex mt-3 justify-end pr-6">
          {edit && (
            <button
              onClick={handleEdit}
              className=" bg-primarycolors-red px-4 py-2 text-primarycolors-white rounded-md text-center  text-xl mt-1  font-light  "
            >
              Edit
            </button>
          )}
          {save && (
            <button
              onClick={() => handleSave(userData)}
              className="bg-primarycolors-red text-primarycolors-white px-4 py-2 rounded-md text-center  text-xl mt-1  font-light  "
            >
              Save
            </button>
          )}
        </div>{" "}
        <div className="">
          <AccountSection
            isEditable={edit}
            userData={userData}
            setUserData={setUserData}
            onSave={handleSave}
          />
        </div>
      </div>

      <div>
        <FooterDesktop />
      </div>
    </div>
  );
};

export default Account;
