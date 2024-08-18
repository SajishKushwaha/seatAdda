import React, { useState } from "react";
import LoginModal from "./LoginModal";
import Navbar from "./Navigation";
import { useSelector } from "react-redux";

const PageMo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  return (
    <div>
      <Navbar />
      {!isLoggedIn&&
      <button onClick={handleOpenModal}>Open Modal</button>}

      {isModalOpen && <LoginModal onClose={handleCloseModal} />}
    </div>
  );
};

export default PageMo;
