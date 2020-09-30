import React from "react";
import store from "../store/index";
import { Provider } from "react-redux";

export default ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
