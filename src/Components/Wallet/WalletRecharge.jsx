import React from "react";

import { useNavigate } from "react-router-dom";
const WalletRecharge = () => {
  const [moneyAddedd, setMoneyadded] = React.useState(null);
  const userId = localStorage.getItem("userData");
  const userIdString = JSON.parse(userId);

  const moneyAdded = (e) => {
    setMoneyadded(e.target.value);
  };

  const navigate = useNavigate();
  const formSubmit = async (e) => {
    e.preventDefault();
    const updateWallet = moneyAddedd;

    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      userIdString.access_token.split("Bearer")[1].trim() // Remove leading/trailing whitespaces
    );

    const formdata = new FormData();
    formdata.append("user_id", userIdString.user.user_id);
    formdata.append("amount", updateWallet);
    formdata.append("return_url", "/Walletrechargeresponse");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      "https://seatadda.co.in/auth/api/get-payment-link",
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse response body as JSON
    navigate(`/WalletAdded?iframe=${data.payment_link}`);
  };

  return (
    <div>
      <div className="mt-3">
        <div className="selection:bg-rose-500 selection:text-white">
          <div className=" bg-rose-100 flex justify-center items-center">
            <div className="p-2 flex-1">
              <div className="sm:w-[300px]   mx-auto overflow-hidden ">
                <div className="px-4 pt-4 pb-8 bg-white rounded-2xl shadow-sm  border-primarycolors-gray border-[1px]">
                  <form className="mt-2" onSubmit={formSubmit}>
                    <div class="mt-10 relative">
                      <input
                        id="amount"
                        type="number"
                        name="amount"
                        class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                        onChange={moneyAdded}
                      />
                      <label
                        for="amount"
                        class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Amount
                      </label>
                    </div>
                    <button
                      className="mt-2 px-4 py-2 rounded-full shadow-lg  text-primarycolors-white bg-primarycolors-red/80 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none  cursor-pointer"
                      type="submit"
                    >
                      Transfer
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletRecharge;
