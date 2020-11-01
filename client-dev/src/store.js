import { createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
const composeSetup = process.env.NODE_ENV !== 'Production' && typeof window === 'object' &&
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

// store
const initialState = {};
const store = createStore(
    rootReducer,
    initialState,
    composeSetup(applyMiddleware(thunk))
);

//const store = createStore(
  //compose(
   // applyMiddleware(...middleware),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //)
//);
export default store;
