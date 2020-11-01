import axios from "axios";
import {
  GET_ERRORS,
  CALCUL,
  CALULC_EN_COURS,
  CLEAR_DATA
} from "./types";
// Login - get user token
export const Calcul = (userData) => dispatch => {
    dispatch(CalculEnCours());
    dispatch(ClearData());
    axios
    .post("/api/logiciels/calculatrice", userData)
    .then(res => 
      dispatch({
        type: CALCUL,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// User loading
export const CalculEnCours = () => {
  return {
    type: CALULC_EN_COURS
  };
};
export const ClearData = () => {
  return {
    type : CLEAR_DATA
  }
}

