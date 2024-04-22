import {
  GET_BUS_DETAILS_FAIL,
  GET_BUS_DETAILS_REQUEST,
  GET_BUS_DETAILS_SUCCESS,
  UPDATE_BOOKING_DETAILS,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  matchedBuses: [],
  selectedSeats: [],
  selectedTypes:[],
  totalFare: 0,
  From: "",
  To: "",
  date: "",
  boardPoint: "",
  dropPoint: "",
  passengerDetails: [],
  email: "",
  phoneNumber: "",
  busData:[],
  routeDetails:[]
};
export const busDetailsReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_BUS_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };

    case GET_BUS_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        matchedBuses: payload,
      };

    case UPDATE_BOOKING_DETAILS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        selectedSeats: payload.selectedSeats,
        totalFare: payload.totalFare,
        From: payload.From,
        To: payload.To,
        date: payload.date,
        dropPoint: payload.dropPoint,
        boardPoint: payload.boardPoint,
        busData:payload.busData,
        routeDetails:payload.routeDetails,
        selectedTypes:payload.selectedTypes,
        passengerDetails:payload.passengerDetails,
        phoneNumber:payload.phoneNumber,
        email:payload.email
      };
    case GET_BUS_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    default:
      return state;
  }
};
