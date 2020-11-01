import axios from "axios";
import {
    GET_ERRORS,
    VERIFICATION,
    VERIF_EN_COURS,
    CLEAR_DATA,
    RENVOI
  } from "./types"
export const confirmUser = (userData, history) => dispatch => {
    dispatch(ClearData());
    dispatch(verificationEnCours());
    axios
      .post("/api/users/confirmation", userData)
      .then(() => {
          dispatch(verification())
          history.push("/login");
      }) // re-direct to login on successful verification
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const resendUser = (userData) => dispatch => {
    dispatch(ClearData());
    axios
      .post("/api/users/resend", userData)
      .then(res => {
        dispatch({
          type: RENVOI,
          payload: res.data
        })
      }) 
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const verification = () => {
    return{
      type: VERIFICATION
    }
}
export const verificationEnCours = () => {
    return {
      type: VERIF_EN_COURS
    };
};
export const ClearData = () => {
    return {
      type : CLEAR_DATA
  }
}