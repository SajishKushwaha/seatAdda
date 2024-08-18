import * as actionTypes from "./actionTypes";
const loginSuccess = (response) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: response.user,
  };
};

const loginFailure = (response) => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: response.error,
  };
};

const edituser=(response)=>{
  return {
    type: actionTypes.EDIT_USER_DETAILS,
    payload: response,
  };
}

const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};


export { loginSuccess, loginFailure, logout ,edituser};