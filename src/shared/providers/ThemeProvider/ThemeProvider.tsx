import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { colors } from "../../../styles/colors.ts";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";

export const GlobalThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme({ colors });
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MuiThemeProvider>
  );
};
