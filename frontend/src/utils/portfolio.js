const STORAGE_KEY = "stock_portfolio";

// =========================
// Get Portfolio
// =========================
export const getPortfolio = () => {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};

// =========================
// Add Holding
// =========================
export const addHolding = (holding) => {
  const portfolio = getPortfolio();

  const exists = portfolio.find(
    (item) => item.Symbol === holding.Symbol
  );

  if (exists) {
    exists.Quantity += holding.Quantity;
  } else {
    portfolio.push(holding);
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(portfolio)
  );
};
// =========================
// Remove Holding
// =========================
export const removeHolding = (symbol) => {
  const portfolio = getPortfolio().filter(
    (item) => item.Symbol !== symbol
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(portfolio)
  );
};

// =========================
// Check Holding
// =========================
export const isInPortfolio = (symbol) => {
  return getPortfolio().some(
    (item) => item.Symbol === symbol
  );
};

// =========================
// Clear Portfolio
// =========================
export const clearPortfolio = () => {
  localStorage.removeItem(STORAGE_KEY);
};