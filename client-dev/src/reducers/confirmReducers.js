import {
    VERIFICATION,
    VERIF_EN_COURS,
    RENVOI,
    CLEAR_DATA
  } from "../actions/types";
  
  const initialState = {
    loading: false,
    isVerified: false,
    message:""
  };

export default function(state = initialState, action) {
    switch (action.type) {
      case VERIF_EN_COURS:
        return {
          ...state,
          loading: true
        };
      case VERIFICATION:
        return{
          ...state,
          loading: false,
          isVerified: true
        }
      case RENVOI:
        return{
          ...state,
          message: action.payload
        }
      case CLEAR_DATA:
        return initialState;
      default:
        return state;
    }
}