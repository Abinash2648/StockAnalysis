import { useState } from "react";

import {
  Paper,
  Link,
  IconButton,
  Tooltip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Box from "@mui/material/Box";
import {
  toggleWatchlist,
  isInWatchlist,
} from "../../utils/watchlist";

function StockTable({
  rows,
  onStockClick,
  onPortfolioClick,
}) {
  const [, forceUpdate] = useState(0);

  const handleWatchlist = (stock) => {
    toggleWatchlist(stock);
    forceUpdate((prev) => prev + 1);
  };

  const columns = [
    // ⭐ Watchlist
    {
      field: "watchlist",
      headerName: "",
      width: 70,
      sortable: false,

      renderCell: (params) => (
        <Tooltip
          title={
            isInWatchlist(params.row.Symbol)
              ? "Remove from Watchlist"
              : "Add to Watchlist"
          }
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleWatchlist(params.row);
            }}
          >
            {isInWatchlist(params.row.Symbol) ? (
              <StarIcon color="warning" />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        </Tooltip>
      ),
    },

    // 💼 Portfolio
    {
      field: "portfolio",
      headerName: "",
      width: 80,
      sortable: false,
    
      renderCell: (params) => (
        <Tooltip title="Add to Portfolio">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onPortfolioClick(params.row);
            }}
            sx={{
              color: "#F59E0B",
              transition: "all .2s ease",
            
              "&:hover": {
                transform: "scale(1.15)",
                color: "#FFB020",
                backgroundColor: "rgba(245,158,11,.08)",
              },
            }}
          >
            <Box
              sx={{
                width: 26,
                height: 26,
                border: "2px solid #F59E0B",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#F59E0B",
                fontWeight: "bold",
                fontSize: 16,
                transition: "0.2s",
    
                "&:hover": {
                  backgroundColor: "rgba(245,158,11,0.12)",
                  color: "#D97706",
                  borderColor: "#D97706",
                },
              }}
            >
              +
            </Box>
          </IconButton>
        </Tooltip>
      ),
    },
    // Symbol
    {
      field: "Symbol",
      headerName: "Symbol",
      flex: 1,

      renderCell: (params) => (
        <Link
          component="button"
          underline="hover"
          onClick={() => onStockClick(params.row)}
          sx={{
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {params.value}
        </Link>
      ),
    },

    {
      field: "Score",
      headerName: "Score",
      flex: 0.8,
    },

    {
      field: "Trend",
      headerName: "150 SMA > EMA220",
      flex: 1,
    },

    {
      field: "Price > SMA50",
      headerName: "Close > SMA50",
      flex: 1,
    },

    {
      field: "SMA Trend",
      headerName: "SMA50 > SMA150",
      flex: 1,
    },

    {
      field: "25% Above Low",
      headerName: "Above 52W Low",
      flex: 1,
    },

    {
      field: "EMA Dip",
      headerName: "EMA Dip",
      flex: 1,
    },

    {
      field: "Breakout",
      headerName: "Breakout",
      flex: 1,
    },
  ];

  return (
    <Paper
      sx={{
        mt: 4,
        height: 600,
        borderRadius: 3,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.Symbol}
        pageSizeOptions={[10, 20, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        disableRowSelectionOnClick
      />
    </Paper>
  );
}

export default StockTable;