import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  ENREGISTREMENT,
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  USER_LOADING,
  VERIFICATION,
  CLEAR_DATA
} from "./types";
// Register User
export const registerUser = (userData) => dispatch => {
  dispatch(ClearData());
  axios
    .post("/api/users/register", userData)
    .then(res =>
    dispatch({
      type: ENREGISTREMENT,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = (userData, history) => dispatch => {
  dispatch(ClearData());
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      dispatch(verification());
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .then(() => history.push("/dashboard")) // re-direct to dashboard on successful login
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// Get current user
export const getCurrentUser = () => dispatch => {
  dispatch(setUserLoading());
  axios
    .get("/api/user/currentuser")
    .then(res =>
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
export const verification = () => {
  return{
    type: VERIFICATION
  }
}
export const ClearData = () => {
  return {
    type : CLEAR_DATA
  }
}
// Log user out
export const logoutUser = (history) => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch(ClearData());
};