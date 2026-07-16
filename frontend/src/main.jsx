import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import App from "./App";
import theme from "./styles/theme";

// NEW
import { StockProvider } from "./context/StockContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Global Stock Context */}
        <StockProvider>
          <App />
        </StockProvider>

      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);