import { UPDATE_FILTER_DETAILS, UPDATE_SELECTED_POINTS } from "./actionTypes";

export const updateFilterDetails = (payload) => {
  return {
    type: UPDATE_FILTER_DETAILS,
    payload,
  };
};

export const updateSelectedPoints = (
  selectedBoardingPoints,
  selectedDroppingPoints
) => {
  
  return {
    type: UPDATE_SELECTED_POINTS,
    payload: { selectedBoardingPoints, selectedDroppingPoints },
  };
};
