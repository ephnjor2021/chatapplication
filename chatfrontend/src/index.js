import App from "./App";
import rootReducers from "./store/reducer/index";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import React from "react";
import { Provider } from "react-redux";


const store = createStore(rootReducers);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
