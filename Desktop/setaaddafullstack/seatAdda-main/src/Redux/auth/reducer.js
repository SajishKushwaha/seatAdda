import * as actionTypes from "./actionTypes";
const initState = {
  isLoggedIn: false,
  currentCustomer: null,
  error: false,
  isLoading: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        currentCustomer: {
          name: action.payload.name,
          user_id: action.payload.user_id,
          phone: action.payload.phone,
        },
        error: false,
      };

    case actionTypes.LOGIN_FAILURE:
      return { ...state, isLoggedIn: false, error: true };

    case actionTypes.LOGOUT:
      return { ...state, isLoggedIn: false, currentCustomer: null };

    case actionTypes.EDIT_USER_DETAILS:
      return {
        ...state,
        isLoggedIn: true,
        currentCustomer: {
          ...state.currentCustomer,
          name: action.payload.username,
          email: action.payload.useremail,
          phone: action.payload.usermobile,
          gender: action.payload.gender,
          birthDate: action.payload.userBirthDate,
        },
        error: false,
      };

    default:
      return state;
  }
};
