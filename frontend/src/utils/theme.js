import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#9C4B0F" },
    secondary: { main: "#FFDC5D" },
    tertiary: { main: "#FF8C82" },
    white: { main: "#FFFFFF" },
    grey: { main: "#ACAFB5" },
    greyDark: { main: "#5C5C5C" },
    text: {
      primary: "#101317",
      secondary: "#282B2E",
      tertiary: "#454545",
    },
  },
  typography: {
    fontFamily: "SuperMaizen",
  },
});

export default theme;
