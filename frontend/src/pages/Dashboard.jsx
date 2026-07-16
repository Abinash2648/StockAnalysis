import { useMemo, useState } from "react";
import { Typography } from "@mui/material";

import MainLayout from "../component/layout/MainLayout";
import SummaryCards from "../component/dashboard/SummaryCards";
import SearchFilter from "../component/dashboard/SearchFilter";
import StockTable from "../component/dashboard/StockTable";
import OverviewChart from "../component/charts/OverviewChart";
import StockDetails from "../component/details/StockDetails";
import AddPortfolioDialog from "../component/portfolio/AddPortfolioDialog";

import { addHolding } from "../utils/portfolio";

import { useStocks } from "../context/StockContext";

import { exportToCSV } from "../utils/exportCsv";
import { exportToPDF } from "../utils/exportPdf";

import { runScreener } from "../services/screenerService";

function Dashboard() {

  // ==========================
  // Global Stock State
  // ==========================

  const { stocks, setStocks } = useStocks();

  // ==========================
  // Local State
  // ==========================

  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState("All");
  const [sector, setSector] = useState("All");

  const [selectedStock, setSelectedStock] = useState(null);
  const [portfolioStock, setPortfolioStock] = useState(null);
  const [loading, setLoading] = useState(false);

  // ==========================
  // Run Screener
  // ==========================

  const handleRun = async () => {
    try {
      setLoading(true);
  
      const data =
        minScore === "All"
          ? await runScreener()
          : await runScreener(minScore);
  
      setStocks(data);
  
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Export
  // ==========================

  const handleExportCSV = () => {
    exportToCSV(filteredStocks);
  };

  const handleExportPDF = () => {
    exportToPDF(filteredStocks);
  };

  // ==========================
  // Portfolio
  // ==========================

  const handlePortfolioSave = (holding) => {
    addHolding(holding);
  };

  // ==========================
  // Available Sectors
  // ==========================

  const sectors = useMemo(() => {

    return [
      "All",
      ...new Set(
        stocks
          .map((stock) => stock.Sector)
          .filter(Boolean)
          .sort()
      ),
    ];

  }, [stocks]);

  // ==========================
  // Frontend Filters
  // ==========================

  const filteredStocks = useMemo(() => {

    return stocks.filter((stock) => {

      const matchesSearch =
        search === "" ||
        stock.Symbol
          .toLowerCase()
          .includes(search.toLowerCase());

      const stockScore = Number(
        stock.Score.split("/")[0]
      );

      const matchesScore =
        minScore === "All" ||
        stockScore === Number(minScore);

      const matchesSector =
        sector === "All" ||
        stock.Sector === sector;

      return (
        matchesSearch &&
        matchesScore &&
        matchesSector
      );

    });

  }, [stocks, search, minScore, sector]);

  return (
    <MainLayout>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        📈 Stock Analysis Dashboard
      </Typography>

      <SummaryCards stocks={filteredStocks} />

      <SearchFilter
        onRun={handleRun}
        onExportCSV={handleExportCSV}
        onExportPDF={handleExportPDF}
        search={search}
        setSearch={setSearch}
        minScore={minScore}
        setMinScore={setMinScore}
        sector={sector}
        setSector={setSector}
        sectors={sectors}
        loading={loading}
      />

      <StockTable
        rows={filteredStocks}
        onStockClick={setSelectedStock}
        onPortfolioClick={setPortfolioStock}
      />

      <StockDetails
        open={selectedStock !== null}
        stock={selectedStock}
        onClose={() => setSelectedStock(null)}
      />

      <OverviewChart stocks={filteredStocks} />

      <AddPortfolioDialog
        open={portfolioStock !== null}
        stock={portfolioStock}
        onClose={() => setPortfolioStock(null)}
        onSave={handlePortfolioSave}
      />

    </MainLayout>
  );
}

export default Dashboard;