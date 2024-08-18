import { UPDATE_FILTER_DETAILS, UPDATE_SELECTED_POINTS } from "./actionTypes";

const initState = {
  busType: {
    seater: false,
    sleeper: false,
    ac: false,
    nonac: false,
  },
  departureTime: {
    before6am: false,
    "6amto12pm": false,
    "12pmto6pm": false,
    after6pm: false,
  },
  arrivalTime: {
    before6am: false,
    "6amto12pm": false,
    "12pmto6pm": false,
    after6pm: false,
  },
  sortingProperty: "None",

  // Add boarding points and dropping points
  selectedBoardingPoints: [],
  selectedDroppingPoints: [],
};

export const updateFilterDetailsReducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case UPDATE_FILTER_DETAILS:
      return {
        ...state,
        [payload["key"]]: payload["value"],
      };

    case UPDATE_SELECTED_POINTS:
      return {
        ...state,
        selectedBoardingPoints: payload.selectedBoardingPoints,
        selectedDroppingPoints: payload.selectedDroppingPoints,
      };

    default:
      return state;
  }
};
