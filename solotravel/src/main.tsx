import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "src/redux/store.ts"
import "./index.css";
import App from "./App.tsx";
import Header from "./components/layout/header.tsx";
import Sidebar from "./components/layout/sidebar.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
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
