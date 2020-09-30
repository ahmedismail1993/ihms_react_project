import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/index";
const reduxDevTool =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const middleWare = [thunk];

const store = createStore(
  reducer,
  compose(applyMiddleware(...middleWare), reduxDevTool)
);

export default store;
