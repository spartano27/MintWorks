import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/css/home.css"
import { Provider } from "react-redux";
import store from "./store";
import { LiveblocksProvider } from "@liveblocks/react";
import {createClient} from "@liveblocks/client";

const client = createClient({
  publicApiKey: "pk_live_qWBJrta6dfM5FdwAlCjK-ejY",

});
ReactDOM.render(
  
  <LiveblocksProvider client={client}>
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  </LiveblocksProvider>,
  document.getElementById("root")
);