import {
    CALCUL,
    CALULC_EN_COURS
  } from "../actions/types";
  
  const initialState = {
    resultat: {},
    loading: false,
    fait: false
    };

export default function(state = initialState, action) {
    switch (action.type) {
      case CALULC_EN_COURS:
        return {
          ...state,
          loading: true,
          fait : false
        };
      case CALCUL:
        return {
          ...state,
          resultat: action.payload,
          loading: false,
          fait : true
        };
      default:
        return state;
    }
}