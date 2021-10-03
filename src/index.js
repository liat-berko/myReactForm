import React from "react";
import ReactDOM from "react-dom";

import MyForm from "./myform";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <MyForm />
  </React.StrictMode>,
  rootElement
);
