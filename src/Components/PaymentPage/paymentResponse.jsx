import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
const PaymentResponse = () => {
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const navigate = useNavigate();
  const signature = query.get("signature");
  const order_id = query.get("order_id");
  const status = query.get("status");
  const signature_algorithm = query.get("signature_algorithm");
  const status_id = query.get("status_id");
  const totalFare = JSON.parse(localStorage.getItem("totalFare"));
  const userId = localStorage.getItem("userData");
  const userIdString = JSON.parse(userId);

  console.log(totalFare);
  useEffect(() => {
    const paymentResponse = async () => {
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
        // console.log(updateWallet);
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          userIdString.access_token.split("Bearer")[1]
        );

        const formdata = new FormData();
        formdata.append("user_id", userIdString.user.user_id);
        formdata.append("transaction_id", uuidv4());
        formdata.append("transaction_type", "debit");
        formdata.append("amount", totalFare.fare);
        formdata.append("message", "update balance");

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        const response = await fetch(
          "https://seatadda.co.in/auth/api/update-user-wallet",
          requestOptions
        );
        const data = await response.json();
        if (data.status === true) {
          const myHeaders = new Headers();
          myHeaders.append(
            "Authorization",
            userIdString.access_token.split("Bearer")[1]
          );
          // const passengers = totalFare.passengers.map((seat, index) => ({
          //   seat_types: selectedTypes[index], // Index ke hisab se seat type ko assign karenge
          //   seat_number: selectedSeats[index], // Seat number ko assign karenge
          //   passenger_name: passDetails[index].name, // Passenger ka naam assign karenge (assume ki sirf ek passenger hai)
          //   age: passDetails[index].age, // Passenger ki umar assign karenge
          //   gender: passDetails[index].gender, // Passenger ka gender assign karenge
          // }));
          const formdata = new FormData();
          formdata.append("user_id", userIdString.user.user_id);
          formdata.append("bus_schedule_id", totalFare.bus_schedule_id);
          formdata.append("travels_name", totalFare.travels_name);
          formdata.append("service_name", totalFare.service_name);
          formdata.append("reg_no", totalFare.reg_no);
          formdata.append("fare", totalFare.fare);
          formdata.append("sourse", totalFare.sourse);
          formdata.append("destination", totalFare.destination);
          formdata.append("boading_points", totalFare.boading_points);
          formdata.append("bording_type", totalFare.bording_type);
          formdata.append("boarding_date", totalFare.boarding_date);
          formdata.append("boarding_time", totalFare.boarding_time);
          formdata.append("arrival_date", totalFare.arrival_date);
          formdata.append("arrival_time", totalFare.arrival_time);
          formdata.append("phone", totalFare.phone);
          formdata.append("address", totalFare.address);
          formdata.append("city", totalFare.city);
          formdata.append("pincode", totalFare.pincode);
          formdata.append("state", totalFare.state);
          formdata.append("insuranceSelected", totalFare.insuranceSelected);
          formdata.append("email", totalFare.email);
          totalFare.passengers.forEach((passenger, index) => {
            for (const key in passenger) {
              formdata.append(`${key}[${index}]`, passenger[key]); // Corrected formdata.append line
            }
          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
          };

          const response = await fetch(
            "https://seatadda.co.in/auth/api/bus-booking",
            requestOptions
          );

          const data = await response.json();

          if (data.status === true) {
            alert(data.message);
            navigate("/bookings");
          } else {
            alert(data.message);
          }
        }
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

export default PaymentResponse;
