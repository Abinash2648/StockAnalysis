import { useEffect, useMemo, useState } from "react";

import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import {
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Divider,
  Chip,
  TextField,
} from "@mui/material";

import {
  getWatchlist,
  removeFromWatchlist,
} from "../utils/watchlist";

import { useStocks } from "../context/StockContext";
import StockDetails from "../component/details/StockDetails";

function Watchlist() {

  // ==========================
  // Global Stocks
  // ==========================

  const { stocks } = useStocks();

  // ==========================
  // Local State
  // ==========================

  const [watchlistSymbols, setWatchlistSymbols] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [search, setSearch] = useState("");

  // ==========================
  // Load Watchlist
  // ==========================

  const loadWatchlist = () => {
    setWatchlistSymbols(getWatchlist());
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  // ==========================
  // Merge Latest Stock Data
  // ==========================

  const watchlist = useMemo(() => {

    return watchlistSymbols.map((savedStock) => {

      const latestStock = stocks.find(
        (stock) => stock.Symbol === savedStock.Symbol
      );

      return latestStock || savedStock;

    });

  }, [watchlistSymbols, stocks]);

  // ==========================
  // Remove
  // ==========================

  const handleRemove = (symbol) => {

    removeFromWatchlist(symbol);

    loadWatchlist();

  };
  const filteredWatchlist = useMemo(() => {

    return watchlist.filter((stock) =>
      stock.Symbol
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  
  }, [watchlist, search]);

  return (
    <>
      {/* Header */}
  
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        spacing={2}
        mb={4}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          ⭐ My Watchlist
        </Typography>
  
        <TextField
          size="small"
          placeholder="Search stock..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: {
              xs: "100%",
              md: 320,
            },
  
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
  
      {filteredWatchlist.length === 0 ? (
  
        <Typography
          color="text.secondary"
          sx={{
            mt: 5,
            textAlign: "center",
          }}
        >
          No stocks found.
        </Typography>
  
      ) : (
  
        <Stack spacing={2}>
  
          {filteredWatchlist.map((stock) => (
  
            <Card
              key={stock.Symbol}
              sx={{
                borderRadius: 3,
                transition: "0.25s",
  
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: 6,
                },
              }}
            >
  
              <CardContent>
  
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                >
  
                  {/* Symbol */}
  
                  <Grid size={{ xs: 12, md: 3 }}>
  
                    <Link
                      component="button"
                      underline="hover"
                      onClick={() => setSelectedStock(stock)}
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                      }}
                    >
                      {stock.Symbol}
                    </Link>
  
                  </Grid>
  
                  {/* Score */}
  
                  <Grid size={{ xs: 6, md: 2 }}>
  
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Score
                    </Typography>
  
                    <Chip
                      label={stock.Score}
                      color="primary"
                      size="small"
                    />
  
                  </Grid>
  
                  {/* Price */}
  
                  <Grid size={{ xs: 6, md: 2 }}>
  
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Current Price
                    </Typography>
  
                    <Typography fontWeight="bold">
                      ₹ {stock.Close}
                    </Typography>
  
                  </Grid>
  
                  {/* Breakout */}
  
                  <Grid size={{ xs: 6, md: 2 }}>
  
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Breakout
                    </Typography>
  
                    <Chip
                      size="small"
                      label={stock.Breakout}
                      color={
                        stock.Breakout === "✅"
                          ? "success"
                          : "error"
                      }
                    />
  
                  </Grid>
  
                  {/* Remove */}
  
                  <Grid
                    size={{ xs: 6, md: 3 }}
                    sx={{
                      textAlign: {
                        xs: "left",
                        md: "right",
                      },
                    }}
                  >
  
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() =>
                        handleRemove(stock.Symbol)
                      }
                    >
                      Remove
                    </Button>
  
                  </Grid>
  
                </Grid>
  
              </CardContent>
  
            </Card>
  
          ))}
  
          <Divider sx={{ mt: 2 }} />
  
          <Typography
            variant="h6"
            textAlign="right"
          >
            Total Stocks : {filteredWatchlist.length}
          </Typography>
  
        </Stack>
  
      )}
  
      <StockDetails
        open={selectedStock !== null}
        stock={selectedStock}
        onClose={() => setSelectedStock(null)}
      />
    </>
  );
} 
export default Watchlist;