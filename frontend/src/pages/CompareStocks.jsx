import { useState } from "react";

import MainLayout from "../component/layout/MainLayout";
import ComparisonGrid from "../component/compare/ComparisonGrid";
import { useStocks } from "../context/StockContext";
import ComparisonSummary from "../component/compare/ComparisonSummary";

import {
  Typography,
  Card,
  CardContent,
  Autocomplete,
  TextField,
  Chip,
  Alert,
  Box,
} from "@mui/material";

function CompareStocks() {

  const { stocks } = useStocks();

  const [selectedStocks, setSelectedStocks] = useState([]);

  return (
    <MainLayout>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={1}
      >
        ⚖ Compare Stocks
      </Typography>

      <Typography
        color="text.secondary"
        mb={3}
      >
        Select up to 5 stocks and compare their technical indicators.
      </Typography>

      <Card
        sx={{
          borderRadius: 3,
          mb: 3,
        }}
      >
        <CardContent>

          <Autocomplete
            multiple
            options={stocks}
            value={selectedStocks}
            getOptionLabel={(option) => option.Symbol}
            isOptionEqualToValue={(option, value) =>
              option.Symbol === value.Symbol
            }
            filterSelectedOptions

            onChange={(event, newValue) => {

              if (newValue.length <= 5) {
                setSelectedStocks(newValue);
              }

            }}

            renderTags={(value, getTagProps) =>
              value.map((option, index) => (

                <Chip
                  label={option.Symbol}
                  color="primary"
                  variant="filled"
                  {...getTagProps({ index })}
                  key={option.Symbol}
                />

              ))
            }

            renderInput={(params) => (

              <TextField
                {...params}
                label="Search Stocks"
                placeholder="Type stock symbol..."
              />

            )}
          />

        </CardContent>
      </Card>

      {selectedStocks.length === 0 && (

        <Alert severity="info">

          Search and select up to
          {" "}
          <strong>5 stocks</strong>
          {" "}
          to compare.

        </Alert>

      )}

      {selectedStocks.length === 1 && (

        <Alert
          severity="warning"
          sx={{ mb: 3 }}
        >

          Select at least
          {" "}
          <strong>2 stocks</strong>
          {" "}
          for comparison.

        </Alert>

      )}

      {selectedStocks.length > 0 && (

        <Box
          sx={{
            mb: 3,
          }}
        >

          <Typography
            variant="subtitle1"
            fontWeight="bold"
            mb={1}
          >
            Selected Stocks
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
            }}
          >

            {selectedStocks.map((stock) => (

              <Chip
                key={stock.Symbol}
                label={stock.Symbol}
                color="success"
                variant="outlined"
              />

            ))}

          </Box>

        </Box>

      )}
      {selectedStocks.length >= 2 && (
        <ComparisonSummary
          selectedStocks={selectedStocks}
          />
    )}

      <ComparisonGrid
        selectedStocks={selectedStocks}
      />

    </MainLayout>
  );
}

export default CompareStocks;