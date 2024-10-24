import React, { useState } from "react";
import FAQ_Item from "./FAQ_Item";
import Navbar from "../Navigation";
import Footer from "../Footer";
import { NavLink } from "react-router-dom";
import ChatUs from "../ChatUS";
import FooterDesktop from "../FooterDesktop";

const FAQ = () => {
  return (
    <>
      <ChatUs />
      <Navbar />

      <FAQ_Item />
      <div className="p-9">&nbsp;</div>
      <div className="fixed bottom-0 left-0 w-full">
        <Footer />
      </div>
    </>
  );
};

export default FAQ;
