import React from "react";
import Navbar from "../Navigation";
import FooterDesktop from "../FooterDesktop";
import { useLocation } from "react-router-dom";
function WalletAdded() {
  let { search } = useLocation();

  const query = new URLSearchParams(search);
  const iframe = query.get("iframe");

  return (
    <div>
      <Navbar />
      <iframe
        src={iframe}
        title="Payment Page"
        width="100%"
        height="500px"
      ></iframe>
      <FooterDesktop />
    </div>
  );
}

export default WalletAdded;
