import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/css/home.css"
import { Provider } from "react-redux";
import store from "./store";
import { LiveblocksProvider } from "@liveblocks/react";
import {createClient} from "@liveblocks/client";

const client = createClient({
  publicApiKey: "pk_test_rGCwfxKjuMTNJOLSxeiLTtV3",

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