import React, { useEffect, useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { MdContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navigation";
import FooterDesktop from "./FooterDesktop";
import { BiArrowBack } from "react-icons/bi";
import Footer from "./Footer";
export default function ReferAndEarn() {
  const [copySuccess, setCopySuccess] = useState("");
  const [referal, setRefferal] = useState(null);
  const copyText = () => {
    const copyText = document.getElementById("myInput");
    copyText.select();
    document.execCommand("copy");
    setCopySuccess("Copied!");
  };
  const userId = localStorage.getItem("userData");
  const userIdString = JSON.parse(userId);
  const navigate = useNavigate();
  const handleBackward = () => {
    navigate("/");
  };
  const jwtToken = Cookies.get("jwt_token");
  useEffect(() => {
    if (userId !== null) {
      const referalCode = async () => {
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          userIdString.access_token.split("Bearer")[1].trim()
        );
        const formdata = new FormData();
        formdata.append("user_id", userIdString.user.user_id);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
        };
        const response = await fetch(
          "https://seatadda.co.in/auth/api/get-referral-details",
          requestOptions
        );
        const data = await response.json();
        setRefferal(data.data);
      };
      if (jwtToken === undefined) {
        navigate("/");
      } else {
        referalCode();
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div>
        {" "}
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="md:hidden block">
          <div className="fixed  border-b-[1px] border-primarycolors-gray  overflow-y-hidden top-0   z-10 w-full  flex items-center gap-4  text-primarycolors-white py-3 px-2 bg-primarycolors-textcolor">
            <div className="text-3xl font-normal" onClick={handleBackward}>
              <BiArrowBack className="font-light" />
            </div>
            <div className=" px-0 text-left text-xl mt-1 font-light ">
              Bookings
            </div>
          </div>
        </div>
      </div>
      {referal !== null && (
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
                  Share your personal referral code to get{" "}
                  <span>{referal[1].referral_amount}</span> for you and your
                  friend
                </h1>
              </div>
              <div className="copyContainer">
                <input
                  type="text"
                  value={referal[0].referral_code}
                  id="myInput"
                  className="copyText"
                />

                <button onClick={copyText} className="copyButton">
                  <MdContentCopy />
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <a
                  href={`whatsapp://send?text=https://seatadda.com?referall_code=${referal[0].referral_code}`}
                  target="__blank"
                >
                  <i class="fa-brands fa-whatsapp shareContainer watsapp"></i>
                </a>
                <div>
                  <div id="fb-root"></div>
                  <script
                    async
                    defer
                    crossorigin="anonymous"
                    src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v19.0"
                    nonce="ymOshR7H"
                  ></script>
                  <div
                    className="fb-share-button"
                    data-href={`https://seatadda.com?referall_code=${referal[0].referral_code}`}
                    data-layout=""
                    data-size=""
                  >
                    <a
                      target="_blank"
                      href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fseatadda.com%2F&amp;src=sdkpreparse"
                      className="fb-xfbml-parse-ignore"
                    >
                      <i class="fa-brands fa-facebook shareContainer facebook"></i>
                    </a>
                  </div>
                </div>
                <a
                  href={`https://twitter.com/share?url=https://seatadda.com?referall_code=${referal[0].referral_code}&amp;text=Check%20out%20this%20awesome%20website&amp;hashtags=seatadda`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fa-brands fa-square-twitter shareContainer twitter"></i>
                </a>
                <a
                  href={`https://instagram.com/share?url=https://seatadda.com?referall_code=${referal[0].referral_code}&amp;text=Check%20out%20this%20awesome%20website&amp;hashtags=seatadda`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fa-brands fa-instagram shareContainer instagram"></i>
                </a>
              </div>
              <div className="text-start successContainer">
                <div>
                  <h1>Successful Referrals</h1>
                </div>
                <div>
                  <p>{referal[2].referral_count}</p>
                </div>
              </div>
            </div>
            <div className="ml-3">
              <div>
                <h1 className="text-start ml-3 works">How it works:</h1>
                <div className="howWorksContainer">
                  <i class="fa-solid fa-share-nodes shareContainer share share1"></i>
                  <div className="text-start ml-3 text">
                    Share your unique referral code with your friends and family
                    to earn referral benefits. The more you share,the more
                    benefits you get!
                  </div>
                </div>
                <div className="howWorksContainer">
                  <i class="fa-solid fa-mobile-screen-button shareContainer share mobile"></i>
                  <div className="text-start ml-3 text">
                    Your friend must install the seadAdda app and enter your
                    unique code while signing up
                  </div>
                </div>
                <div className="howWorksContainer">
                  <img
                    src="/get-money.png"
                    alt="logo"
                    className="share ruppee"
                  />
                  {/* <i class="fa-solid fa-share-nodes shareContainer share share1"></i> */}
                  <div className="text-start ml-3 text">
                    Once they successfully sign up,they will receive a voucher
                    of Rs <span>{referal[1].referral_amount}</span> cashback
                    that can be availed on their first ever booking
                  </div>
                </div>
                <div className="howWorksContainer">
                  <i class="fa-solid fa-person-walking-luggage shareContainer share travel"></i>
                  {/* <i class="fa-solid fa-share-nodes "></i> */}
                  <div className="text-start ml-3 text">
                    After the completion oftheir first travel you will recieve a
                    discount voucher worth Rs{" "}
                    <span>{referal[1].referral_amount}</span>.
                  </div>
                </div>
              </div>
              <div className="text-start ml-3 text">
                <h1>
                  Ensure to read all the Terms & Conditions of our referral
                  Program.
                </h1>
                <h1>Happy referring & travelling with with seat Adda</h1>
              </div>
              <div className="text-center successContainer1">
                <h1>FAQ | Terms & Conditions</h1>
              </div>
            </div>
          </div>
          <div className="">
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
