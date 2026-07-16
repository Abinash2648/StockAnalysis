import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

function ComparisonSummary({ selectedStocks }) {

  if (selectedStocks.length === 0) return null;

  const highestScore = selectedStocks.reduce((best, stock) => {

    const currentScore = Number(stock.Score.split("/")[0]);
    const bestScore = Number(best.Score.split("/")[0]);

    return currentScore > bestScore ? stock : best;

  });

  const highestPrice = selectedStocks.reduce((best, stock) =>
    stock.Close > best.Close ? stock : best
  );

  const breakoutCount = selectedStocks.filter(
    (stock) => stock.Breakout === "✅"
  ).length;

  const cards = [
    {
      title: "Highest Score",
      value: `${highestScore.Symbol} (${highestScore.Score})`,
      color: "#2E7D32",
      icon: <EmojiEventsIcon fontSize="large" />,
    },
    {
      title: "Highest Price",
      value: `₹ ${Number(highestPrice.Close).toFixed(2)}`,
      color: "#1976D2",
      icon: <CurrencyRupeeIcon fontSize="large" />,
    },
    {
      title: "Breakout Stocks",
      value: breakoutCount,
      color: "#ED6C02",
      icon: <TrendingUpIcon fontSize="large" />,
    },
    {
      title: "Compared",
      value: `${selectedStocks.length} Stocks`,
      color: "#7B1FA2",
      icon: <CompareArrowsIcon fontSize="large" />,
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
                transform: "translateY(-5px)",
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

export default ComparisonSummary;