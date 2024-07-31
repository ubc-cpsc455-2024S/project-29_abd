import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ThemeProvider from "./theme-provider";

const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider>{children}</ThemeProvider>
      </Router>
    </Provider>
  );
};

export default AppProviders;
