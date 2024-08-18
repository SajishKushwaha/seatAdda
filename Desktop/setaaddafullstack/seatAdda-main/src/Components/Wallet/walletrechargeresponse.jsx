import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Walletrechargeresponse = () => {
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const navigate = useNavigate();
  const signature = query.get("signature");
  const order_id = query.get("order_id");
  const status = query.get("status");
  const signature_algorithm = query.get("signature_algorithm");
  const status_id = query.get("status_id");
  const userId = localStorage.getItem("userData");
  const userIdString = JSON.parse(userId);

  useEffect(() => {
    const paymentResponse = async () => {
      //   try {
      //     const myHeaders = new Headers();
      //     myHeaders.append(
      //       "Authorization",
      //       userIdString.access_token.split("Bearer")[1].trim()
      //     );
      //     const formdata = new FormData();
      //     formdata.append("user_id", userIdString.user.user_id);
      //     formdata.append("signature", signature);
      //     formdata.append("order_id", order_id);
      //     formdata.append("status", status);
      //     formdata.append("signature_algorithm", signature_algorithm);
      //     formdata.append("status_id", status_id);
      //     const requestOptions = {
      //       method: "POST",
      //       headers: myHeaders,
      //       body: formdata,
      //       redirect: "follow",
      //     };
      //     const response = await fetch(
      //       "https://seatadda.co.in/auth/api/verify-payment-response",
      //       requestOptions
      //     );
      //     if (!response.ok) {
      //       throw new Error(`HTTP error! Status: ${response.status}`);
      //     }
      //     const data = await response.json();
      //     console.log(response);
      //     // Handle response data as needed
      //   } catch (error) {
      //     console.error("Error:", error.message);
      //     // Handle error (e.g., display error message to the user)
      //   }
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        userIdString.access_token.split("Bearer")[1].trim()
      );
      myHeaders.append("Cookie", "ci_session=oim74bahl3aidj3bkkmem065ga7o1g70");

      const formdata = new FormData();
      formdata.append("user_id", userIdString.user.user_id);
      formdata.append("signature", signature);
      formdata.append("order_id", order_id);
      formdata.append("status", status);
      formdata.append("status_id", status_id);
      formdata.append("signature_algorithm", signature_algorithm);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        "https://seatadda.co.in/auth/api/verify-payment-response",
        requestOptions
      );
      const data = await response.json();

      if (data.status) {
        alert("wallet recharge successfull");
        navigate("/wallet");
      } else {
        alert(data.message);
      }
    };

    paymentResponse();
  }, [
    signature,
    order_id,
    status,
    signature_algorithm,
    status_id,
    userIdString,
  ]);

  return (
    <div>
      <h1>Waiting</h1>
    </div>
  );
};

export default Walletrechargeresponse;
