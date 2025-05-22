import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "../src/DataProvider/DataProvider";
import { initialState, reducer } from "./Utility/Reducer";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </React.StrictMode>
);
