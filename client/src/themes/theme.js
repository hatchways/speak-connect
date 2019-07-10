import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"'
  },
  error: "#d8000c",
  bgcolor: "#f6f6f6",

  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: {
      light: '#ffffff',
      main: '#3956E1',
      dark: '#000000',
      contrastText: '#000',
    }
  }
});
