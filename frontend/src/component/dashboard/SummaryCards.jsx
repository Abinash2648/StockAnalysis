import Grid from "@mui/material/Grid";

import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import UpdateIcon from "@mui/icons-material/Update";

function SummaryCards({ stocks }) {
  if (!Array.isArray(stocks)) return null;

  const cards = [
    {
      title: "Total Stocks",
      value: stocks.length,
      color: "#1976D2",
      icon: <ShowChartIcon sx={{ fontSize: 42 }} />,
    },
    {
      title: "Perfect Matches",
      value: stocks.filter(
        (stock) => stock.Score === "6/6"
      ).length,
      color: "#2E7D32",
      icon: <StarIcon sx={{ fontSize: 42 }} />,
    },
    {
      title: "Strong Candidates",
      value: stocks.filter(
        (stock) =>
          stock.Score === "6/6" ||
          stock.Score === "5/6"
      ).length,
      color: "#ED6C02",
      icon: <TrendingUpIcon sx={{ fontSize: 42 }} />,
    },
    {
      title: "Last Updated",
      value: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      color: "#7B1FA2",
      icon: <UpdateIcon sx={{ fontSize: 42 }} />,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mt: 2, mb: 2 }}>
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{ xs: 12, sm: 6, md: 3 }}
        >
          <Card
            sx={{
              background: card.color,
              color: "#fff",
              borderRadius: 5,
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(0,0,0,.25)",
              transition: "all .35s ease",

              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 18px 40px rgba(0,0,0,.45)",
              },
            }}
          >
            <CardContent
              sx={{
                p: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {card.icon}

              </Box>

              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  opacity: 0.9,
                  fontWeight: 500,
                }}
              >
                {card.title}
              </Typography>

              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  mt: 1,
                  letterSpacing: 0.5,
                }}
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

export default SummaryCards;