import React, { useState, useEffect } from "react";
import { loginSuccess, logout } from "../Redux/auth/action";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "../Components/LoginModal";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(!isLoggedIn); // Open modal initially if not logged in
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let location = useLocation();
  const jwt_token = Cookies.get("jwt_token");
  if (!isLoggedIn) {
    return (
      <>
        <LoginModal
          setIsModalOpen={setIsModalOpen}
          onClose={handleCloseModal}
        />
      </>
    );
  }
  return children;
};

export default ProtectedRoute;
