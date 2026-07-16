import {
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

function ComparisonGrid({ selectedStocks }) {
  if (selectedStocks.length < 2) return null;

  const metrics = [
    { label: "Current Price", key: "Close", type: "price" },
    { label: "Score", key: "Score", type: "score" },
    { label: "150 SMA > EMA220", key: "Trend", type: "status" },
    { label: "Close > SMA50", key: "Price > SMA50", type: "status" },
    { label: "SMA50 > SMA150", key: "SMA Trend", type: "status" },
    { label: "Above 52W Low", key: "25% Above Low", type: "status" },
    { label: "EMA Dip", key: "EMA Dip", type: "status" },
    { label: "Breakout", key: "Breakout", type: "status" },
  ];

  const columns = [
    {
      field: "metric",
      headerName: "Metric",
      width: 220,
      sortable: false,
      renderCell: (params) => (
        <Typography fontWeight="bold">
          {params.value}
        </Typography>
      ),
    },

    ...selectedStocks.map((stock) => ({
      field: stock.Symbol,
      headerName: stock.Symbol,
      flex: 1,
      sortable: false,

      renderCell: (params) => {
        const value = params.value;
        const type = params.row.type;

        if (type === "price") {
          return (
            <Typography fontWeight="bold">
              ₹ {Number(value).toFixed(2)}
            </Typography>
          );
        }

        if (type === "score") {
          const score = Number(value.split("/")[0]);

          let color = "error";

          if (score >= 6) color = "success";
          else if (score >= 5) color = "warning";
          else if (score >= 4) color = "info";

          return (
            <Chip
              label={value}
              color={color}
              size="small"
            />
          );
        }

        const positive =
          value === "✅" ||
          value === true ||
          String(value).toLowerCase().includes("yes");

        return (
          <Chip
            label={value}
            color={positive ? "success" : "error"}
            size="small"
          />
        );
      },
    })),
  ];

  const rows = metrics.map((metric, index) => {
    const row = {
      id: index,
      metric: metric.label,
      type: metric.type,
    };

    selectedStocks.forEach((stock) => {
      row[stock.Symbol] = stock[metric.key];
    });

    return row;
  });

  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: 3,
      }}
    >
      <CardContent>

        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
        >
          Comparison Dashboard
        </Typography>

        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          hideFooter
          sx={{
            border: 0,

            "& .MuiDataGrid-columnHeaders": {
              fontSize: 15,
              fontWeight: "bold",
            },

            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
            },
          }}
        />

      </CardContent>
    </Card>
  );
}

export default ComparisonGrid;