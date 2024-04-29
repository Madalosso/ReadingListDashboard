import React from "react";
import ReactDOM from "react-dom";
import "../../assets/styles/tailwind.css";

import SavedNotification from "../../containers/SavedNotification";

export const showNotification = () => {
  const tooltipElement = document.createElement("div");
  document.body.appendChild(tooltipElement);
  ReactDOM.render(<SavedNotification />, tooltipElement);
};
