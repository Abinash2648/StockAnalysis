export const exportToCSV = (stocks) => {
  if (!stocks || stocks.length === 0) {
    alert("No data available to export.");
    return;
  }

  const headers = [
    "Symbol",
    "Score",
    "Close",
    "SMA50",
    "SMA150",
    "EMA220",
    "Trend",
    "Price > SMA50",
    "SMA Trend",
    "25% Above Low",
    "EMA Dip",
    "Breakout",
  ];

  const rows = stocks.map((stock) => [
    stock.Symbol,
    stock.Score,
    stock.Close,
    stock.SMA50,
    stock.SMA150,
    stock.EMA220,
    stock.Trend,
    stock["Price > SMA50"],
    stock["SMA Trend"],
    stock["25% Above Low"],
    stock["EMA Dip"],
    stock.Breakout,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "Stock_Screener_Result.csv";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};