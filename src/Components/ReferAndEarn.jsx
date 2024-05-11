import React, { useState } from "react";
import "./index.css";
import { MdContentCopy } from "react-icons/md";

export default function ReferAndEarn() {
  const [copySuccess, setCopySuccess] = useState("");

  const copyText = () => {
    const copyText = document.getElementById("myInput");
    copyText.select();
    document.execCommand("copy");
    setCopySuccess("Copied!");
  };

  return (
    <>
      <div className="referalContainer">
        <div>
          <div>
            <img
              src="https://t3.ftcdn.net/jpg/03/43/43/70/360_F_343437025_tjD7L9Ee6ekMfkg69DtJFQm84qa2nMNW.jpg"
              alt="referal"
              className="logo"
            />
          </div>

          <div>
            <h1 className="m-3">
              Share your personal referral code to get Discount for you and your
              friend
            </h1>
          </div>
          <div className="copyContainer">
            <input
              type="text"
              value="FGHEUIWQ"
              id="myInput"
              className="copyText"
            />

            <button onClick={copyText} className="copyButton">
              <MdContentCopy />
            </button>
          </div>
          <div className="">
            <i class="fa-brands fa-whatsapp shareContainer watsapp"></i>
            <i class="fa-brands fa-facebook shareContainer facebook"></i>
            <i class="fa-brands fa-square-twitter shareContainer twitter"></i>
            <i class="fa-solid fa-share-nodes shareContainer share"></i>
          </div>
          <div className="text-start successContainer">
            <div>
              <h1>Successful Referrals</h1>
            </div>
            <div>
              <p>0</p>
            </div>
          </div>
        </div>
        <div className="ml-3">
          <div>
            <h1 className="text-start ml-3 works">How it works:</h1>
            <div className="howWorksContainer">
              <i class="fa-solid fa-share-nodes shareContainer share share1"></i>
              <div className="text-start ml-3 text">
                Share your unique referral code with your friends and family to
                earn referral benefits. The more you share,the more benefits you
                get!
              </div>
            </div>
            <div className="howWorksContainer">
              <i class="fa-solid fa-mobile-screen-button shareContainer share mobile"></i>
              <div className="text-start ml-3 text">
                Your friend must install the AbhiBus app and enter your unique
                code while signing up
              </div>
            </div>
            <div className="howWorksContainer">
              <img src="/get-money.png" alt="logo" className="share ruppee" />
              {/* <i class="fa-solid fa-share-nodes shareContainer share share1"></i> */}
              <div className="text-start ml-3 text">
                Once they successfully sign up,they will receive a voucher of Rs
                250 cashback that can be availed on their first ever booking
              </div>
            </div>
            <div className="howWorksContainer">
              <i class="fa-solid fa-person-walking-luggage shareContainer share travel"></i>
              {/* <i class="fa-solid fa-share-nodes "></i> */}
              <div className="text-start ml-3 text">
                After the completion oftheir first travel you will recieve a
                discount voucher worth Rs 150.
              </div>
            </div>
          </div>
          <div className="text-start ml-3 text">
            <h1>
              Ensure to read all the Terms & Conditions of our referral Program.
            </h1>
            <h1>Happy referring & travelling with with seat Adda</h1>
          </div>
          <div className="text-center successContainer1">
            <h1>FAQ | Terms & Conditions</h1>
          </div>
        </div>
      </div>
    </>
  );
}
