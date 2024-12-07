import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Navbar from "../Navigation";
import PassengerDetails from "./PassengerDetails";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import FooterDesktop from "../FooterDesktop";
import { BiArrowBack } from "react-icons/bi";
import WalletSection from "../Wallet/WalletSection";
import PassengerDetailsMobile from "./PassengerDetailsMobile";
import "./index.css";
const Passenger = () => {
  const isLoading = useSelector((state) => state.busDetailsReducer.isLoading);
  const selectedSeats = useSelector(
    (state) => state.busDetailsReducer.selectedSeats
  );
  const totalFare = useSelector((state) => state.busDetailsReducer.totalFare);
  // const totalFare = 317;
  const From = useSelector((state) => state.busDetailsReducer.From);
  const To = useSelector((state) => state.busDetailsReducer.To);
  const date = useSelector((state) => state.busDetailsReducer.date);
  const boardPoint = useSelector((state) => state.busDetailsReducer.boardPoint);

  const dropPoint = useSelector((state) => state.busDetailsReducer.dropPoint);
  const busData = useSelector((state) => state.busDetailsReducer.busData);
  const routeDetails = useSelector(
    (state) => state.busDetailsReducer.routeDetails
  );
  let foundObject = routeDetails.find(
    (item) => item.boading_points === boardPoint
  );
  let arrival = routeDetails.find((item) => item.boading_points === dropPoint);
  // const userId=useSelector((state)=>state.authReducer.currentCustomer.user_id);
  const userId = localStorage.getItem("userData");
  const userIdString = JSON.parse(userId);
  // console.log(userIdString.access_token.split("Bearer")[1]);
  // console.log(`${userIdString.user.user_id}`)
  const selectedTypes = useSelector(
    (state) => state.busDetailsReducer.selectedTypes
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (routeDetails.length === 0) {
      navigate("/");
    }
  }, [routeDetails]);
  const [passDetails, setPassDetails] = React.useState([]);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [coupon, setCoupon] = React.useState("");
  const [couponData, setCouponData] = React.useState(null);
  const [totalfare, setTotalFare] = React.useState(totalFare);
  const [passEmail, setPassEmail] = React.useState("");
  const [isdisable, setIsDisable] = React.useState(false);
  const [checkedi, setChecked] = React.useState(false);
  const [passPhNo, setPassPhNo] = React.useState("");
  const [wallet, setWallet] = React.useState(null);
  const [Cupon, setCuppon] = React.useState([]);
  const [address, setAddress] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [pincode, setPincode] = React.useState(null);
  const [state, setState] = React.useState(null);
  const [GSTIN, setGSTIN] = React.useState(null);
  const [businessName, setBusinessName] = React.useState(null);
  const [businessAddress, setBusinessAddress] = React.useState(null);
  const [businessEmail, setBusinessEmail] = React.useState(null);
  const [insuranceId, setInsuranceId] = React.useState(null);
  const [insurance, setInsurance] = React.useState(0);
  const [user, setUserData] = React.useState(null);
  // const [userWallet, setUserWallet] = React.useState("");
  const [deductionMade, setDeductionMade] = React.useState(false);
  const insuranceSelected = insurance !== 0 ? 1 : 0;
  // Function to handle deduction from wallet balance
  // const walletBalance = () => {
  //   if (!deductionMade) {
  //     if (wallet >= totalFare) {
  //       setWallet(wallet - totalFare - 180);
  //     } else if (wallet === 0) {
  //       setWallet(totalFare - wallet);
  //     }
  //     // Set the deduction state to true
  //     setDeductionMade(true);
  //   } else {
  //     // Return the deducted amount to the wallet
  //     setWallet(wallet + totalFare + 180);
  //     // Set the deduction state to false
  //     setDeductionMade(false);
  //   }
  // };
  let fare = totalFare;
  let discount;
  // console.log(totalFare.toFixed(2));
  const user_details = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      userIdString.access_token.split("Bearer")[1]
    );
    const formdata = new FormData();
    formdata.append("user_id", userIdString.user.user_id);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      "https://seatadda.co.in/auth/api/user-details",
      requestOptions
    );
    const data = await response.json();
    setUserData(data.data);
    localStorage.setItem("Edit", JSON.stringify(data.data));
    // console.log(data.data);
  };

  useEffect(() => {
    user_details();
  }, [user]);
  if (couponData != null) {
    if (couponData.date.discount_type === "percentage") {
      fare = fare - (fare * couponData.date.discount) / 100;
      discount = (totalFare * couponData.date.discount) / 100;
    } else if (couponData.date.discount_type === "number") {
      fare = fare - couponData.date.discount;
      discount = fare - couponData.date.discount;
      // console.log(`fff${fare - couponData.discount}`);
    }
  }
  if (insurance) {
    fare = fare + insurance;
  }
  const walletBalance = () => {
    setDeductionMade(!deductionMade);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          userIdString.access_token.split("Bearer")[1].trim() // Remove leading/trailing whitespaces
        );

        const formdata = new FormData();
        formdata.append("user_id", userIdString.user.user_id);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        const response = await fetch(
          "https://seatadda.co.in/auth/api/user-wallet-details",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse response body as JSON
        setWallet(data);
        // console.log(data);
        // Log the response data
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();

    // Check conditions to determine if button should be disabled
    // console.log(`insu ${insurance}`);
    if (passEmail !== "" && passPhNo != "" && checkedi) {
      setIsDisable(false); // Disable the button
    } else {
      setIsDisable(true); // Enable the button
    }
  }, [passEmail, passPhNo, insurance, checkedi]); // Dependency array includes variables passDetails, passEmail, and passPhNo
  // const uui = uuidv4().substring(0, 8);
  function generateRandomId() {
    const randomDigits = Math.floor(
      100000000000 + Math.random() * 900000000000
    ); // Generates a random 12-digit number
    const randomId = `TRA_${randomDigits}`;
    return randomId;
  }

  const id = generateRandomId();
  const handlePay = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (deductionMade) {
          if (wallet.balance_amount >= totalFare) {
            const updateWallet = fare;
            // console.log(updateWallet);
            const myHeaders = new Headers();
            myHeaders.append(
              "Authorization",
              userIdString.access_token.split("Bearer")[1]
            );
            const formdata = new FormData();
            formdata.append("user_id", userIdString.user.user_id);
            formdata.append("transaction_id", id);
            formdata.append("transaction_type", "debit");
            formdata.append("amount", updateWallet);
            formdata.append("message", `Ticket Booked ${From},${To}`);

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
              const passengers = selectedSeats.map((seat, index) => ({
                seat_types: selectedTypes[index], // Index ke hisab se seat type ko assign karenge
                seat_number: selectedSeats[index], // Seat number ko assign karenge
                passenger_name: passDetails[index].name, // Passenger ka naam assign karenge (assume ki sirf ek passenger hai)
                age: passDetails[index].age, // Passenger ki umar assign karenge
                gender: passDetails[index].gender, // Passenger ka gender assign karenge
              }));
              const formdata = new FormData();
              formdata.append("user_id", userIdString.user.user_id);
              formdata.append("bus_schedule_id", busData.bus_schedule_id);
              formdata.append("travels_name", busData.travels_name);
              formdata.append("service_name", busData.service_name);
              formdata.append("reg_no", busData.reg_no);
              formdata.append("fare", totalFare);
              formdata.append("sourse", From);
              formdata.append("destination", To);
              formdata.append("boading_points", foundObject.boading_points);
              formdata.append("bording_type", foundObject.bording_type);
              formdata.append("boarding_date", foundObject.date);
              formdata.append("boarding_time", foundObject.time);
              formdata.append("arrival_date", arrival.date);
              formdata.append("arrival_time", arrival.time);
              // formdata.append("seat_types", selectedTypes[0]);
              // formdata.append("seat_number", selectedSeats[0]);
              // for (let i = 0; i < passDetails.length; i++) {
              //     formdata.append("passenger_name",passDetails[i].name);
              //   }
              // for (let i = 0; i < passDetails.length; i++) {
              // formdata.append("age", passDetails[i].age);
              // }
              // for (let i = 0; i < passDetails.length; i++) {
              //     formdata.append("gender", passDetails[i].gender);
              //   }
              formdata.append("phone", passPhNo);
              formdata.append("address", address);
              formdata.append("city", city);
              formdata.append("pincode", pincode);
              formdata.append("state", state);
              formdata.append("insuranceSelected", insuranceSelected);
              formdata.append("insurance_id", insuranceId);
              formdata.append("email", passEmail);
              formdata.append("GSTIN", GSTIN);
              formdata.append("businessName", businessName);
              formdata.append("businessAddress", businessAddress);
              formdata.append("businessEmail", businessEmail);
              passengers.forEach((passenger, index) => {
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
              //   .then((response) => response.text())
              //   .then((result) => if(result.status=='false'){
              //   })
              //   .catch((error) => console.error(error));
              const data = await response.json();
              if (data.status === true) {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: data.message,
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  navigate("/bookings");
                });
              } else {
                Swal.fire({
                  position: "top-center",
                  icon: "warning",
                  title: data.message,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            } else {
              Swal.fire({
                position: "top-center",
                icon: "warning",
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          } else if (
            wallet.balance_amount > 0 &&
            wallet.balance_amount < totalFare
          ) {
            // Case 2: Wallet balance is less than total fare (partial deduction)
            const remainingAmount = totalFare - wallet.balance_amount; // Amount to pay via payment gateway
            const orderId = `ORDER_${new Date().getTime()}`;
            const txnAmount = remainingAmount.toFixed(2);
            // const txnAmount = "1.00";
            const userId = userIdString.user.user_id;
            console.log(`hello${userId}`);
            // try {
            var form = new FormData();
            form.append("txnAmount", txnAmount);
            form.append("orderId", orderId);
            form.append("user_id", userId);

            // const formdata1 = new FormData();
            // formdata1.append("txnAmount", txnAmount);
            // formdata1.append("orderId", orderId);
            // formdata1.append("user_id", userId);
            const response = await fetch(
              "https://seatadda.co.in/auth/api/payment/initializePayment",
              {
                method: "POST",
                // headers: { "Content-Type": "application/json" },
                body: form,
                redirect: "follow",
              }
            );

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Server Error: ${errorText}`);
            }

            const data = await response.json();
            console.log(data);
            if (data.data.body?.txnToken) {
              window.Paytm.CheckoutJS.init({
                root: "",
                flow: "DEFAULT",
                data: {
                  orderId,
                  token: data.data.body.txnToken,
                  tokenType: "TXN_TOKEN",
                  amount: txnAmount,
                },
                // handler: {
                //   notifyMerchant: (eventName, eventData) => {
                //     console.log('Event:', eventName, eventData);
                //     if (eventName === 'APPROVED') alert('Payment Successful!');
                //     else if (eventName === 'FAILED') alert('Payment Failed!');
                //   },
                // },
                merchant: {
                  redirect: false,
                },
                handler: {
                  transactionStatus: async function (paymentStatus) {
                    console.log("paymentStatus => ", paymentStatus);
                    if (paymentStatus.STATUS == "TXN_SUCCESS") {
                      // try {
                      const formdata = new FormData();
                      formdata.append("orderId", paymentStatus.ORDERID);
                      formdata.append("user_id", userIdString.user.user_id);

                      const requestOptions = {
                        method: "POST",
                        body: formdata,
                        redirect: "follow",
                      };

                      const response = await fetch(
                        "https://seatadda.co.in/auth/api/payment/verifyPayment",
                        requestOptions
                      );
                      console.log(response.json());
                      if (response.ok == true) {
                        const fetch1 = async () => {
                          const updateWallet = fare;
                          const myHeaders = new Headers();
                          myHeaders.append(
                            "Authorization",
                            userIdString.access_token.split("Bearer")[1]
                          );
                          const formdata = new FormData();
                          formdata.append("user_id", userIdString.user.user_id);
                          formdata.append("transaction_id", id);
                          formdata.append("transaction_type", "debit");
                          formdata.append("amount", updateWallet);
                          formdata.append(
                            "message",
                            `Ticket Booked ${From},${To}`
                          );

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
                            const passengers = selectedSeats.map(
                              (seat, index) => ({
                                seat_types: selectedTypes[index], // Index ke hisab se seat type ko assign karenge
                                seat_number: selectedSeats[index], // Seat number ko assign karenge
                                passenger_name: passDetails[index].name, // Passenger ka naam assign karenge (assume ki sirf ek passenger hai)
                                age: passDetails[index].age, // Passenger ki umar assign karenge
                                gender: passDetails[index].gender, // Passenger ka gender assign karenge
                              })
                            );
                            const formdata = new FormData();
                            formdata.append(
                              "user_id",
                              userIdString.user.user_id
                            );
                            formdata.append(
                              "bus_schedule_id",
                              busData.bus_schedule_id
                            );
                            formdata.append(
                              "travels_name",
                              busData.travels_name
                            );
                            formdata.append(
                              "service_name",
                              busData.service_name
                            );
                            formdata.append("reg_no", busData.reg_no);
                            formdata.append("fare", totalFare);
                            formdata.append("sourse", From);
                            formdata.append("destination", To);
                            formdata.append(
                              "boading_points",
                              foundObject.boading_points
                            );
                            formdata.append(
                              "bording_type",
                              foundObject.bording_type
                            );
                            formdata.append("boarding_date", foundObject.date);
                            formdata.append("boarding_time", foundObject.time);
                            formdata.append("arrival_date", arrival.date);
                            formdata.append("arrival_time", arrival.time);
                            // formdata.append("seat_types", selectedTypes[0]);
                            // formdata.append("seat_number", selectedSeats[0]);
                            // for (let i = 0; i < passDetails.length; i++) {
                            //     formdata.append("passenger_name",passDetails[i].name);
                            //   }
                            // for (let i = 0; i < passDetails.length; i++) {
                            // formdata.append("age", passDetails[i].age);
                            // }
                            // for (let i = 0; i < passDetails.length; i++) {
                            //     formdata.append("gender", passDetails[i].gender);
                            //   }
                            formdata.append("phone", passPhNo);
                            formdata.append("address", address);
                            formdata.append("city", city);
                            formdata.append("pincode", pincode);
                            formdata.append("state", state);
                            formdata.append(
                              "insuranceSelected",
                              insuranceSelected
                            );
                            formdata.append("insurance_id", insuranceId);
                            formdata.append("email", passEmail);
                            formdata.append("GSTIN", GSTIN);
                            formdata.append("businessName", businessName);
                            formdata.append("businessAddress", businessAddress);
                            formdata.append("businessEmail", businessEmail);
                            passengers.forEach((passenger, index) => {
                              for (const key in passenger) {
                                formdata.append(
                                  `${key}[${index}]`,
                                  passenger[key]
                                ); // Corrected formdata.append line
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
                            //   .then((response) => response.text())
                            //   .then((result) => if(result.status=='false'){
                            //   })
                            //   .catch((error) => console.error(error));
                            const data = await response.json();
                            if (data.status === true) {
                              Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: data.message,
                                showConfirmButton: false,
                                timer: 1500,
                              }).then(() => {
                                navigate("/bookings");
                              });
                            } else {
                              Swal.fire({
                                position: "top-center",
                                icon: "warning",
                                title: data.message,
                                showConfirmButton: false,
                                timer: 1500,
                              });
                            }
                          } else {
                            Swal.fire({
                              position: "top-center",
                              icon: "warning",
                              title: data.message,
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          }
                        };
                        fetch1();
                      }
                      // } catch {
                      //   console.error("error");
                      // }
                    }

                    // Close the popup after receiving payment status
                    window.Paytm.CheckoutJS.close();
                  },
                  notifyMerchant: function (eventName, data) {
                    console.log("notifyMerchant handler function called");
                    console.log("eventName => ", eventName);
                    console.log("data => ", data);
                    if (eventName === "APP_CLOSED") {
                      alert("Pop-up closed");
                    }
                  },
                },
              })
                .then(() => window.Paytm.CheckoutJS.invoke())
                .catch((error) =>
                  console.error("Error in Paytm Checkout:", error)
                );
            } else {
              console.error("Token generation failed:", data);
              alert("Failed to generate transaction token. Try again.");
            }
            // Deduct the remaining wallet balance
            // const updateWallet = walletBalance;

            // const myHeaders = new Headers();
            // myHeaders.append(
            //   "Authorization",
            //   userIdString.access_token.split("Bearer")[1]
            // );

            // const formdata = new FormData();
            // formdata.append("user_id", userIdString.user.user_id);
            // formdata.append("transaction_id", id);
            // formdata.append("transaction_type", "debit");
            // formdata.append("amount", updateWallet); // Deduct wallet balance
            // formdata.append("message", `Ticket Booked ${From},${To}`);

            // const requestOptions = {
            //   method: "POST",
            //   headers: myHeaders,
            //   body: formdata,
            //   redirect: "follow",
            // };

            // const response = await fetch(
            //   "https://seatadda.co.in/auth/api/update-user-wallet",
            //   requestOptions
            // );
            // const data = await response.json();

            // if (data.status === true) {
            //   // Proceed to payment gateway for the remaining amount
            //   localStorage.setItem(
            //     "totalFare",
            //     JSON.stringify({ ...formdata, remainingAmount })
            //   );
            //   // Swal.fire({
            //   //   position: "top-center",
            //   //   icon: "warning",
            //   //   title: data.message,
            //   //   showConfirmButton: false,
            //   //   timer: 1500,
            //   // }).then(() => {
            //   // navigate(`/payment?total=${remainingAmount}`); // Redirect to payment gateway

            //   // });
            // } else {
            //   Swal.fire({
            //     position: "top-center",
            //     icon: "warning",
            //     title: data.message,
            //     showConfirmButton: false,
            //     timer: 1500,
            //   });
            // }
          } else {
            Swal.fire({
              position: "top-center",
              icon: "warning",
              title: "no sufficient balance",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              navigate("/bookings");
            });
          }
        } else {
          const passengers = selectedSeats.map((seat, index) => ({
            seat_types: selectedTypes[index], // Index ke hisab se seat type ko assign karenge
            seat_number: selectedSeats[index], // Seat number ko assign karenge
            passenger_name: passDetails[index].name, // Passenger ka naam assign karenge (assume ki sirf ek passenger hai)
            age: passDetails[index].age, // Passenger ki umar assign karenge
            gender: passDetails[index].gender, // Passenger ka gender assign karenge
          }));
          const formdata = {
            user_id: userIdString.user.user_id,
            bus_schedule_id: busData.bus_schedule_id,
            travels_name: busData.travels_name,
            service_name: busData.service_name,
            reg_no: busData.reg_no,
            fare: totalFare,
            sourse: From,
            destination: To,
            boading_points: foundObject.boading_points,
            bording_type: foundObject.bording_type,
            boarding_date: foundObject.date,
            boarding_time: foundObject.time,
            arrival_date: arrival.date,
            arrival_time: arrival.time,
            phone: passPhNo,
            address: address,
            city: city,
            pincode: pincode,
            state: state,
            insuranceSelected: insuranceSelected,
            email: passEmail,
            passengers: passengers,
            insurance_id: insuranceId,
          };
          localStorage.setItem("totalFare", JSON.stringify(formdata));
          // navigate(`/payment?total=${totalFare}`);
          const orderId = `ORDER_${new Date().getTime()}`;
          const txnAmount = totalFare.toFixed(2);
          // const txnAmount = "1.00";
          const userId = userIdString.user.user_id;
          console.log(`hello${userId}`);
          // try {
          var form = new FormData();
          form.append("txnAmount", txnAmount);
          form.append("orderId", orderId);
          form.append("user_id", userId);

          // const formdata1 = new FormData();
          // formdata1.append("txnAmount", txnAmount);
          // formdata1.append("orderId", orderId);
          // formdata1.append("user_id", userId);
          const response = await fetch(
            "https://seatadda.co.in/auth/api/payment/initializePayment",
            {
              method: "POST",
              // headers: { "Content-Type": "application/json" },
              body: form,
              redirect: "follow",
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server Error: ${errorText}`);
          }

          const data = await response.json();
          console.log(data);
          if (data.data.body?.txnToken) {
            window.Paytm.CheckoutJS.init({
              root: "",
              flow: "DEFAULT",
              data: {
                orderId,
                token: data.data.body.txnToken,
                tokenType: "TXN_TOKEN",
                amount: txnAmount,
              },
              // handler: {
              //   notifyMerchant: (eventName, eventData) => {
              //     console.log('Event:', eventName, eventData);
              //     if (eventName === 'APPROVED') alert('Payment Successful!');
              //     else if (eventName === 'FAILED') alert('Payment Failed!');
              //   },
              // },
              merchant: {
                redirect: false,
              },
              handler: {
                transactionStatus: async function (paymentStatus) {
                  console.log("paymentStatus => ", paymentStatus);
                  if (paymentStatus.STATUS == "TXN_SUCCESS") {
                    // try {
                    const formdata = new FormData();
                    formdata.append("orderId", paymentStatus.ORDERID);
                    formdata.append("user_id", userIdString.user.user_id);

                    const requestOptions = {
                      method: "POST",
                      body: formdata,
                      redirect: "follow",
                    };

                    const response = await fetch(
                      "https://seatadda.co.in/auth/api/payment/verifyPayment",
                      requestOptions
                    );
                    console.log(response.json());
                    if (response.ok == true) {
                      const fetch1 = async () => {
                        const updateWallet = fare;
                        const myHeaders = new Headers();
                        myHeaders.append(
                          "Authorization",
                          userIdString.access_token.split("Bearer")[1]
                        );
                        const formdata = new FormData();
                        formdata.append("user_id", userIdString.user.user_id);
                        formdata.append("transaction_id", id);
                        formdata.append("transaction_type", "debit");
                        formdata.append("amount", updateWallet);
                        formdata.append(
                          "message",
                          `Ticket Booked ${From},${To}`
                        );

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
                          const passengers = selectedSeats.map(
                            (seat, index) => ({
                              seat_types: selectedTypes[index], // Index ke hisab se seat type ko assign karenge
                              seat_number: selectedSeats[index], // Seat number ko assign karenge
                              passenger_name: passDetails[index].name, // Passenger ka naam assign karenge (assume ki sirf ek passenger hai)
                              age: passDetails[index].age, // Passenger ki umar assign karenge
                              gender: passDetails[index].gender, // Passenger ka gender assign karenge
                            })
                          );
                          const formdata = new FormData();
                          formdata.append("user_id", userIdString.user.user_id);
                          formdata.append(
                            "bus_schedule_id",
                            busData.bus_schedule_id
                          );
                          formdata.append("travels_name", busData.travels_name);
                          formdata.append("service_name", busData.service_name);
                          formdata.append("reg_no", busData.reg_no);
                          formdata.append("fare", totalFare);
                          formdata.append("sourse", From);
                          formdata.append("destination", To);
                          formdata.append(
                            "boading_points",
                            foundObject.boading_points
                          );
                          formdata.append(
                            "bording_type",
                            foundObject.bording_type
                          );
                          formdata.append("boarding_date", foundObject.date);
                          formdata.append("boarding_time", foundObject.time);
                          formdata.append("arrival_date", arrival.date);
                          formdata.append("arrival_time", arrival.time);
                          // formdata.append("seat_types", selectedTypes[0]);
                          // formdata.append("seat_number", selectedSeats[0]);
                          // for (let i = 0; i < passDetails.length; i++) {
                          //     formdata.append("passenger_name",passDetails[i].name);
                          //   }
                          // for (let i = 0; i < passDetails.length; i++) {
                          // formdata.append("age", passDetails[i].age);
                          // }
                          // for (let i = 0; i < passDetails.length; i++) {
                          //     formdata.append("gender", passDetails[i].gender);
                          //   }
                          formdata.append("phone", passPhNo);
                          formdata.append("address", address);
                          formdata.append("city", city);
                          formdata.append("pincode", pincode);
                          formdata.append("state", state);
                          formdata.append(
                            "insuranceSelected",
                            insuranceSelected
                          );
                          formdata.append("insurance_id", insuranceId);
                          formdata.append("email", passEmail);
                          formdata.append("GSTIN", GSTIN);
                          formdata.append("businessName", businessName);
                          formdata.append("businessAddress", businessAddress);
                          formdata.append("businessEmail", businessEmail);
                          passengers.forEach((passenger, index) => {
                            for (const key in passenger) {
                              formdata.append(
                                `${key}[${index}]`,
                                passenger[key]
                              ); // Corrected formdata.append line
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
                          //   .then((response) => response.text())
                          //   .then((result) => if(result.status=='false'){
                          //   })
                          //   .catch((error) => console.error(error));
                          const data = await response.json();
                          if (data.status === true) {
                            Swal.fire({
                              position: "top-center",
                              icon: "success",
                              title: data.message,
                              showConfirmButton: false,
                              timer: 1500,
                            }).then(() => {
                              navigate("/bookings");
                            });
                          } else {
                            Swal.fire({
                              position: "top-center",
                              icon: "warning",
                              title: data.message,
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          }
                        } else {
                          Swal.fire({
                            position: "top-center",
                            icon: "warning",
                            title: data.message,
                            showConfirmButton: false,
                            timer: 1500,
                          });
                        }
                      };
                      fetch1();
                    }
                    // } catch {
                    //   console.error("error");
                    // }
                  }

                  // Close the popup after receiving payment status
                  window.Paytm.CheckoutJS.close();
                },
                notifyMerchant: function (eventName, data) {
                  console.log("notifyMerchant handler function called");
                  console.log("eventName => ", eventName);
                  console.log("data => ", data);
                  if (eventName === "APP_CLOSED") {
                    alert("Pop-up closed");
                  }
                },
              },
            })
              .then(() => window.Paytm.CheckoutJS.invoke())
              .catch((error) =>
                console.error("Error in Paytm Checkout:", error)
              );
          } else {
            console.error("Token generation failed:", data);
            alert("Failed to generate transaction token. Try again.");
          }
          // } catch (error) {
          //   console.error("Error:", error);
          //   alert("Error initiating payment. Check console for details.");
          // }
        }
      }
    });
  };

  const handleBackward = () => {
    navigate(`/select-bus?departure=${From}&arrival=${To}&date=${date}`);
  };
  const storePassenger = (
    passDetails,
    passEmail,
    passPhNo,
    address,
    city,
    pincode,
    state,
    insuranceId,
    GSTIN,
    businessName,
    businessEmail,
    businessAddress
  ) => {
    // console.log(address);
    setGSTIN(GSTIN);
    setBusinessName(businessName);
    setBusinessEmail(businessEmail);
    setBusinessAddress(businessAddress);
    setPassDetails(passDetails);
    setPassEmail(passEmail);
    setPassPhNo(passPhNo);
    setAddress(address);
    setCity(city);
    setPincode(pincode);
    setState(state);
    setInsuranceId(insuranceId);
  };
  const storeInsurance = (insurancevalue) => {
    // console.log(insurancevalue);
    setInsurance(insurancevalue);
  };
  const termAndCondition = (termAndCondition) => {
    setChecked(termAndCondition);
  };
  const ApplyCoupon = async () => {
    if (!coupon) {
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title: "coupon cant be empty",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      userIdString.access_token.split("Bearer")[1]
    );
    const formdata = new FormData();
    formdata.append("coupon_code", coupon);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    const response = await fetch(
      "https://seatadda.co.in/auth/api/coupon-code-verification",
      requestOptions
    );
    const data = await response.json();
    if (data.status === true) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    setCouponData(data);
    // console.log(couponData);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://seatadda.co.in/api/coupon-code-list"
        );
        const data = await response.json();
        setCuppon(data.date);
      } catch (error) {
        console.error("Error fetching coupon codes:", error);
      }
    };

    fetchData();
  }, [Cupon]);
  // console.log(Cupon);
  const proceedColor = isdisable
    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
    : "bg-primarycolors-red/90 hover:bg-primarycolors-red text-primarycolors-white !important";
  return (
    <div>
      <div className="hidden md:block">
        <Navbar />
        <div className="container mx-auto ">
          <div className="grid md:grid-cols-4 p-2 sm:p-5 gap-4">
            <div className="md:col-span-3">
              {user !== null && (
                <PassengerDetails
                  storePassenger={storePassenger}
                  storeInsurance={storeInsurance}
                  termAndCondition={termAndCondition}
                  user={user}
                />
              )}
            </div>
            <div className="flex flex-col gap-[1rem]">
              <div className="border-[1px] border-dashed  px-4  text-left h-fit  shadow-2xl  flex flex-col justify-between ">
                <div className="my-5">
                  <h1 className="font-bold  uppercase text-center text-primarycolors-red ">
                    Journey Details:{" "}
                  </h1>
                  <div className="mb-2 p-3 text-sm">
                    {" "}
                    <p className="m-2 flex justify-between">
                      From: <span className="font-bold uppercase">{From}</span>{" "}
                    </p>
                    <p className="m-2 flex justify-between">
                      {" "}
                      To: <span className="font-bold uppercase">{To}</span>
                    </p>
                    <p className="m-2 flex justify-between">
                      Date: <span className="font-bold uppercase">{date}</span>{" "}
                    </p>{" "}
                    <p className="m-2 flex justify-between">
                      Boarding Point:{" "}
                      <span className="font-bold uppercase">{boardPoint}</span>{" "}
                    </p>{" "}
                    <p className="m-2 flex justify-between">
                      Dropping Point:{" "}
                      <span className="font-bold uppercase">{dropPoint}</span>{" "}
                    </p>{" "}
                    <div className="m-2 flex  justify-between">
                      <p className="w-fit">Selected Seats:</p>

                      <div>
                        {selectedSeats.map((seat) => (
                          <span className="font-bold" key={seat}>
                            {" "}
                            {seat},
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* {insurance !== 0 && (
                      <div className="m-2 flex  justify-between">
                        <p className="w-fit">Travel Insurance:</p>
                        <div className="font-bold">
                          <p>{insurance}</p>
                        </div>
                      </div>
                    )} */}
                  </div>

                  <hr className="my-2 border-dashed" />
                  <div className="p-3">
                    <h1 className="font-bold mb-5  uppercase text-center text-primarycolors-red ">
                      Fare Details:{" "}
                    </h1>
                    <p className="m-2 flex justify-between">
                      Basic Fare (for {selectedSeats.length} Seat) :{" "}
                      <span className="font-bold uppercase">
                        <span className="">&#8377;</span>
                        {totalFare}
                      </span>{" "}
                    </p>{" "}
                    {couponData && couponData.status ? (
                      <p className="m-2 flex justify-between">
                        Discount Fare:
                        <span className="font-bold uppercase">
                          <span>&#8377;</span>
                          {discount !== undefined ? discount : 0}{" "}
                        </span>
                      </p>
                    ) : (
                      <p className="m-2 flex justify-between">
                        Discount Fare:
                        <span className="font-bold uppercase">
                          <span>&#8377;</span>0
                        </span>
                      </p>
                    )}
                    {insurance && (
                      <p className="m-2 flex justify-between">
                        Travel Insurance:
                        <span className="font-bold uppercase">
                          <span>&#8377;</span>
                          {insurance}
                        </span>
                      </p>
                    )}
                  </div>
                  <hr className="my-2 border-dashed" />
                  <div className="mb-6">
                    <label className="font-bold mb-5  uppercase text-center text-primarycolors-red ">
                      Have coupon?
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2">
                      <input
                        type="text"
                        style={{
                          borderWidth: "1px", // Add border width
                          borderStyle: "solid", // Ensure border style is set to "solid"
                          borderColor: "red !important",
                          borderTopLeftRadius: "5px",
                          borderBottomLeftRadius: "5px",
                        }}
                        className="flex-grow w-full p-2 sm:p-3 "
                        placeholder="Coupon code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                      />
                      <span className="sm:mt-0  w-full sm:w-auto">
                        <button
                          className="w-full sm:w-auto p-0 sm:p-4 bg-red-600 text-white"
                          onClick={ApplyCoupon}
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            height: "51px",
                            borderTopRightRadius: "5px",
                            borderBottomRightRadius: "5px",
                          }}
                        >
                          Apply
                        </button>
                      </span>
                    </div>
                    {Cupon != undefined ? (
                      <div className="bg-white p-4 rounded-md shadow-lg">
                        {Cupon.map((data, index) => (
                          <div
                            key={index}
                            className="flex items-center my-2 py-2"
                          >
                            <input
                              type="checkbox"
                              className="custom-checkbox mr-2"
                              id={`insurancebox-${index}`}
                              name="insurancebox"
                              value="true"
                            />
                            <label
                              htmlFor={`insurancebox-${index}`}
                              className="text-sm cursor-pointer"
                            >
                              {data.coupon_code}
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}

                    {isSuccess && (
                      <span className="absolute right-2 top-2 text-green-500 animate-bounce">
                        ✔️ hhhhhhhhh
                      </span>
                    )}
                    {isSuccess && (
                      <p
                        className="mt-2 text-sm animate-fadeIn"
                        style={{ color: "green" }}
                      >
                        ✔️ Coupon applied successfully!
                      </p>
                    )}
                    {/* {!isSuccess && (
                      <p
                        className="mt-2 text-sm animate-fadeIn"
                        style={{ color: "red" }}
                      >
                        Coupon code is not valid
                      </p>
                    )} */}
                  </div>

                  <hr className="my-2 border-dashed" />
                  <div className="p-3 mt-5 py-2 bg-primarycolors-textcolor/40 flex justify-between p-2 sm:p-3">
                    <h1 className="font-bold text-center text-primarycolors-black ">
                      Net Payable:
                    </h1>

                    <span className="font-bold uppercase">
                      <span>&#8377;</span>
                      {fare !== undefined ? fare : 0}{" "}
                    </span>
                  </div>
                  <hr className="my-2 border-dashed" />
                  <div>
                    <h1 className="font-bold mb-2  uppercase  text-primarycolors-red">
                      Wallet
                    </h1>
                    <input
                      type="checkbox"
                      id="wallet"
                      onClick={walletBalance}
                    />
                    {wallet !== null && (
                      <label htmlFor="wallet" style={{ marginLeft: "10px" }}>
                        {wallet.balance_amount}
                      </label>
                    )}
                  </div>
                </div>{" "}
              </div>{" "}
              <div className="mx-1">
                <button
                  disabled={isdisable}
                  onClick={handlePay}
                  // className={`w-full p-2 rounded-md ${proceedColor} `}

                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.375rem",
                    backgroundColor: isdisable
                      ? "gray"
                      : "rgba(239, 68, 68, 0.9)", // bg-gray-100 or bg-primarycolors-red/90
                    color: isdisable ? "#ffffff" : "#ffffff", // text-gray-500 or text-primarycolors-white
                    cursor: isdisable ? "not-allowed" : "pointer",
                    ...(isdisable
                      ? {}
                      : { transition: "background-color 0.3s ease" }),
                  }}
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
      <div className="block md:hidden ">
        <div className="fixed shadow-xl border-b-[1px] border-primarycolors-gray overflow-y-hidden top-0   z-10 w-full  flex items-center gap-4  text-primarycolors-white py-3 px-2 bg-primarycolors-textcolor">
          <div className="text-2xl   font-normal" onClick={handleBackward}>
            <BiArrowBack />
          </div>
          <div className=" px-0   text-[16px]  mt-1  font-bold  ">
            Passengers Details
          </div>
        </div>
        <div className="relative top-[3rem]">
          <div className="">
            {user !== null && (
              <PassengerDetailsMobile
                storePassenger={storePassenger}
                storeInsurance={storeInsurance}
                termAndCondition={termAndCondition}
                wallet={wallet}
                walletBalance={walletBalance}
                user={user}
              />
            )}
          </div>

          <div className="fixed  bg-primarycolors-white shadow-inner w-[98%] ml-1 -bottom-1 flex justify-center py-2">
            <button
              disabled={isdisable}
              onClick={handlePay}
              // className={`w-full p-2 rounded-md ${proceedColor}`}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                backgroundColor: isdisable ? "gray" : "rgba(239, 68, 68, 0.9)", // bg-gray-100 or bg-primarycolors-red/90
                color: isdisable ? "#ffffff" : "#ffffff", // text-gray-500 or text-primarycolors-white
                cursor: isdisable ? "not-allowed" : "pointer",
                ...(isdisable
                  ? {}
                  : { transition: "background-color 0.3s ease" }),
              }}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Passenger;
