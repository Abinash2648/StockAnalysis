const STORAGE_KEY = "stock_watchlist";

export const getWatchlist = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const isInWatchlist = (symbol) => {
  return getWatchlist().some((stock) => stock.Symbol === symbol);
};

export const addToWatchlist = (stock) => {
  const watchlist = getWatchlist();

  const exists = watchlist.some(
    (item) => item.Symbol === stock.Symbol
  );

  if (!exists) {
    watchlist.push(stock);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(watchlist)
    );
  }
};

export const removeFromWatchlist = (symbol) => {
  const watchlist = getWatchlist().filter(
    (item) => item.Symbol !== symbol
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(watchlist)
  );
};

export const toggleWatchlist = (stock) => {
  if (isInWatchlist(stock.Symbol)) {
    removeFromWatchlist(stock.Symbol);
  } else {
    addToWatchlist(stock);
  }
};

export const clearWatchlist = () => {
  localStorage.removeItem(STORAGE_KEY);
};