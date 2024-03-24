import { colors } from "./styles/colors.ts";

declare module "@mui/material/styles" {
  interface Theme {
    colors: ReturnType<typeof colors>;
  }
  interface ThemeOptions {
    colors: ReturnType<typeof colors>;
  }
}
