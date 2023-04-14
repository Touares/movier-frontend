import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app.jsx";
import "bootstrap/dist/css/bootstrap.css";
import 'bootswatch/dist/flatly/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import "font-awesome/css/font-awesome.css";
ReactDOM.render(
  <BrowserRouter>
  <React.Fragment>
    <App />
  </React.Fragment>
  </BrowserRouter>,
  document.getElementById("root")
);
