import {
  Paper,
  Chip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

function PortfolioTable({
  portfolio,
  onRemove,
}) {

  const rows = portfolio.map((stock) => {

    const investment =
      stock.Quantity * stock.BuyPrice;

    const currentValue =
      stock.Quantity * stock.Close;

    const profit =
      currentValue - investment;

    const profitPercent =
      ((profit / investment) * 100).toFixed(2);

    return {
      ...stock,
      investment,
      currentValue,
      profit,
      profitPercent,
    };
  });

  const columns = [
    {
      field: "Symbol",
      headerName: "Symbol",
      flex: 1,
    },

    {
      field: "Quantity",
      headerName: "Qty",
      flex: 0.6,
    },

    {
      field: "BuyPrice",
      headerName: "Buy Price",
      flex: 0.9,

      valueFormatter: (value) =>
        `₹ ${Number(value).toFixed(2)}`,
    },

    {
      field: "Close",
      headerName: "Current",
      flex: 0.9,

      valueFormatter: (value) =>
        `₹ ${Number(value).toFixed(2)}`,
    },

    {
      field: "investment",
      headerName: "Investment",
      flex: 1,

      valueFormatter: (value) =>
        `₹ ${Number(value).toFixed(2)}`,
    },

    {
      field: "currentValue",
      headerName: "Current Value",
      flex: 1,

      valueFormatter: (value) =>
        `₹ ${Number(value).toFixed(2)}`,
    },

    {
      field: "profit",
      headerName: "P/L ₹",
      flex: 0.9,

      renderCell: (params) => (
        <Chip
          label={`₹ ${params.value.toFixed(2)}`}
          color={
            params.value >= 0
              ? "success"
              : "error"
          }
        />
      ),
    },

    {
      field: "profitPercent",
      headerName: "P/L %",
      flex: 0.8,

      renderCell: (params) => (
        <Chip
          label={`${params.value}%`}
          color={
            Number(params.value) >= 0
              ? "success"
              : "error"
          }
        />
      ),
    },

    {
      field: "remove",
      headerName: "",
      flex: 0.8,

      sortable: false,

      renderCell: (params) => (
        <Chip
          label="Remove"
          color="error"
          clickable
          onClick={() =>
            onRemove(params.row.Symbol)
          }
        />
      ),
    },
  ];

  return (
    <Paper
      sx={{
        mt: 3,
        height: 550,
        borderRadius: 3,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.Symbol}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
      />
    </Paper>
  );
}

export default PortfolioTable;