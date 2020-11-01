import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import calculReducers from "./calculReducers";
import confirmReducers from "./confirmReducers";

export default combineReducers({
  auth: authReducer,
  calc: calculReducers,
  conf: confirmReducers,
  errors: errorReducer
});