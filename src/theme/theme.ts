import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff9800", // Naranja
    },
    secondary: {
      main: "#2196f3", // Azul
    },
    success: {
      main: "#4caf50", // Verde
    },
    background: {
      default: "#000000",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cccccc",
    },
  },
  typography: {
    fontFamily: '"Ubuntu", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      marginBottom: "1rem",
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 600,
      marginBottom: "1rem",
    },
    body1: {
      fontSize: "1.1rem",
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          backgroundColor: "#000000",
        },
        "*": {
          boxSizing: "border-box",
        },
        html: {
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});
