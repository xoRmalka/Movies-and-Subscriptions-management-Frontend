import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";

import appReducer from "./Reducers/appReducer";
const appStore = createStore(appReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={appStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
