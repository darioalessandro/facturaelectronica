import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import MainMenu from "./MainMenu";

ReactDOM.render(
  <MainMenu
    gauthId={process.env.REACT_APP_GOOGLE_OAUTH_TOKEN}
    isAuthDisabled={process.env.REACT_APP_DISABLE_AUTH}
    backendURL={process.env.REACT_APP_BACKEND_URL}
  />,
  document.getElementById("root")
);
registerServiceWorker();
