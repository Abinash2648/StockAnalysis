import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PaidIcon from "@mui/icons-material/Paid";
import WorkIcon from "@mui/icons-material/Work";

function PortfolioSummary({ portfolio }) {

  const totalInvestment = portfolio.reduce(
    (sum, stock) =>
      sum + stock.Quantity * stock.BuyPrice,
    0
  );

  const currentValue = portfolio.reduce(
    (sum, stock) =>
      sum + stock.Quantity * stock.Close,
    0
  );

  const totalProfit =
    currentValue - totalInvestment;

  const cards = [
    {
      title: "Total Investment",
      value: `₹ ${totalInvestment.toFixed(2)}`,
      color: "#1976D2",
      icon: <AccountBalanceWalletIcon fontSize="large" />,
    },
    {
      title: "Current Value",
      value: `₹ ${currentValue.toFixed(2)}`,
      color: "#2E7D32",
      icon: <TrendingUpIcon fontSize="large" />,
    },
    {
      title: "Profit / Loss",
      value: `₹ ${totalProfit.toFixed(2)}`,
      color: totalProfit >= 0 ? "#388E3C" : "#D32F2F",
      icon: <PaidIcon fontSize="large" />,
    },
    {
      title: "Holdings",
      value: portfolio.length,
      color: "#7B1FA2",
      icon: <WorkIcon fontSize="large" />,
    },
  ];

  return (
    <Grid
      container
      spacing={3}
      sx={{ mb: 3 }}
    >
      {cards.map((card) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          key={card.title}
        >
          <Card
            sx={{
              background: card.color,
              color: "white",
              borderRadius: 3,
              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardContent>

              {card.icon}

              <Typography
                variant="h6"
                sx={{ mt: 2 }}
              >
                {card.title}
              </Typography>

              <Typography
                variant="h5"
                fontWeight="bold"
              >
                {card.value}
              </Typography>

            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PortfolioSummary;