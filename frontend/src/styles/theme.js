import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#00C853",
    },

    secondary: {
      main: "#2979FF",
    },

    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#CBD5E1",
    },
  },

  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
  },

  shape: {
    borderRadius: 12,
  },
});

export default theme;