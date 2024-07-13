import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts"
import "./index.css";
import App from "./App.tsx";
import Header from "./components/layout/header.tsx";
import Sidebar from "./components/layout/sidebar.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DndProvider backend={HTML5Backend}>
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
  </DndProvider>
);
