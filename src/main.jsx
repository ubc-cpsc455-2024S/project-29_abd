import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import App from "./App";
import Header from "./components/layout/header";
import Sidebar from "./components/layout/sidebar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <Provider store={store}>
          <App />
        </Provider>
      </div>
    </>
  </React.StrictMode>
);