import {
  GET_BUS_DETAILS_FAIL,
  GET_BUS_DETAILS_REQUEST,
  GET_BUS_DETAILS_SUCCESS,
  UPDATE_BOOKING_DETAILS,
} from "./actionTypes";
import busData from "../../constant/Bus";
import axios from "axios";

const busDetailsRequest = () => {
  return {
    type: GET_BUS_DETAILS_REQUEST,
  };
};

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  // console.log(`${year}-${month}-${day}`);
  return `${year}-${month}-${day}`;
}

const busDetailsSuccess = (payload) => {
  return {
    type: GET_BUS_DETAILS_SUCCESS,
    payload,
  };
};

export const updateBookingDetails = (payload) => {
  return {
    type: UPDATE_BOOKING_DETAILS,
    payload,
  };
};

const busDetailsFail = () => {
  return {
    type: GET_BUS_DETAILS_FAIL,
  };
};

export const getBusDetails = (depart, arrival, date) => async (dispatch) => {
  dispatch(busDetailsRequest());
  const filteredBuses = busData;

  const formData = new FormData();
  formData.append("source", depart);
  formData.append("destination", arrival);
  const formattedDate = formatDate(date);
  console.log(formattedDate);
  formData.append("date", formattedDate);
  // const token = localStorage.getItem("authToken");
  // const TokenArray = token.split(" ");
  // console.log(TokenArray[1]);
  /*  for (var pair of formData.entries()) {
    console.log(pair[0] + " " + pair[1]);
  } */

  try {
    const response1 = await axios.post(
      "https://seatadda.co.in/auth/api/stocks-no-booking",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data1 = response1.data.stocks;

      const response2 = await axios.post(
      "https://seatadda.co.in/auth/api/stocks",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data2 = response2.data.stocks;
  //  console.log(data1);
    // console.log(data2);
    // const data2 = [];

    // Combine the data from both API responses
    const combinedData = data2.concat(data1);
    // console.log(combinedData);
    dispatch(busDetailsSuccess(combinedData));
  } catch (error) {
    dispatch(busDetailsFail());
  }
};
