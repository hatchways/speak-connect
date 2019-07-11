import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"'
  },
  error: "#d8000c",
  bgcolor: "#f6f6f6",

  palette: {
    primary: {
      light: "#ffffff",
      main: "#ffffff", // white
      dark: "#bfbfbf"
    },
    secondary: {
      light: "#ffffff",
      main: "#3956E1", // blue
      dark: "#1b34ab",
      contrastText: "#e80000"
    }
  }
});
