import { useEffect, useState } from "react";

import MainLayout from "../component/layout/MainLayout";
import PortfolioSummary from "../component/portfolio/PortfolioSummary";
import PortfolioTable from "../component/portfolio/PortfolioTable";
import { useStocks } from "../context/StockContext";

import {
  Typography,
  Card,
  CardContent,
} from "@mui/material";

import {
  getPortfolio,
  removeHolding,
} from "../utils/portfolio";

function Portfolio() {

  const [portfolio, setPortfolio] = useState([]);
  const { stocks } = useStocks();

  // ===========================
  // Load Portfolio
  // ===========================
  const loadPortfolio = () => {
    setPortfolio(getPortfolio());
  };


  useEffect(() => {
    loadPortfolio();
  }, []);

  // ===========================
  // Remove Holding
  // ===========================

  const handleRemove = (symbol) => {
    removeHolding(symbol);
    loadPortfolio();
  };

  return (
    <MainLayout>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        💼 Portfolio
      </Typography>

      {/* Summary Cards */}

      <PortfolioSummary
  portfolio={portfolio.map((holding) => {

    const latest =
      stocks.find(
        (stock) =>
          stock.Symbol === holding.Symbol
      );

    return latest
      ? {
          ...holding,
          Close: latest.Close,
        }
      : holding;

  })}
/>

      {/* Empty Portfolio */}

      {portfolio.length === 0 ? (

        <Card
          sx={{
            borderRadius: 3,
          }}
        >
          <CardContent>

            <Typography variant="h6">
              Portfolio Tracker
            </Typography>

            <Typography color="text.secondary">
              No holdings added yet.
            </Typography>

          </CardContent>
        </Card>

      ) : (

        /* Portfolio Table */

        <PortfolioTable
  portfolio={portfolio.map((holding) => {

    const latest =
      stocks.find(
        (stock) =>
          stock.Symbol === holding.Symbol
      );

    return latest
      ? {
          ...holding,
          Close: latest.Close,
        }
      : holding;

  })}
  onRemove={handleRemove}
/>

      )}

    </MainLayout>
  );
}

export default Portfolio;