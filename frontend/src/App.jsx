import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Watchlist from "./pages/Watchlist";
import Portfolio from "./pages/Portfolio";
import CompareStocks from "./pages/CompareStocks";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Dashboard />}
      />

      <Route
        path="/watchlist"
        element={<Watchlist />}
      />
    <Route
    path="/portfolio"
    element={<Portfolio />}
  />
  <Route
  path="/compare"
  element={<CompareStocks />}
/>
</Routes>
  );
}

export default App;