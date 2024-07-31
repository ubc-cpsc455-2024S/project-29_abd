import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

const ThemeProvider = ({ children }) => {
  const themeMode = useSelector((state) => state.theme.mode);

  return (
    <StyledThemeProvider theme={{ ...theme, mode: themeMode }}>
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
