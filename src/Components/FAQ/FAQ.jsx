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
            <Footer />
        </>
    );
};

export default FAQ;
