import { createContext, useContext, useState } from "react";

const StockContext = createContext();

export function StockProvider({ children }) {

  // ==========================
  // Global Stock Data
  // ==========================

  const [stocks, setStocks] = useState([]);

  // ==========================
  // Global Watchlist
  // ==========================

  const [watchlist, setWatchlist] = useState([]);

  // ==========================
  // Global Portfolio
  // ==========================

  const [portfolio, setPortfolio] = useState([]);

  return (
    <StockContext.Provider
      value={{
        // Stocks
        stocks,
        setStocks,

        // Watchlist
        watchlist,
        setWatchlist,

        // Portfolio
        portfolio,
        setPortfolio,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStocks() {
  return useContext(StockContext);
}