
import {
  Dialog,
  Grid,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Stack,
  CardMedia,
  Button,
} from "@mui/material";
import TradingViewChart from "../charts/TradingViewChart";
import { getCompanyDetails } from "../../services/screenerService";
import { formatNumber } from "../../utils/formatNumber";
import { getCompanyNews } from "../../services/screenerService";
import { useEffect, useState } from "react";

function StockDetails({ open, stock, onClose }) {

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
const [newsLoading, setNewsLoading] = useState(false);

useEffect(() => {
  if (!stock) return;

  setNews([]);
  setCompany(null);

  const loadCompany = async () => {
    try {
      setLoading(true);

      const companyData = await getCompanyDetails(stock.Symbol);

      setCompany(companyData);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  loadCompany();

  }, [stock]);

  if (!stock) return null;
  const handleLoadNews = async () => {
    try {
      setNewsLoading(true);
  
      const data = await getCompanyNews(stock.Symbol);
  
      setNews(data.slice(0, 5));
  
    } catch (err) {
      console.error(err);
    } finally {
      setNewsLoading(false);
    }
  };

  const Condition = ({ value, label }) => (
    <Chip
      label={`${value} ${label}`}
      color={value === "✅" ? "success" : "error"}
      variant="filled"
      sx={{
        fontSize: 14,
        height: 38,
      }}
    />
  );
  const healthChip = (value, good, average) => {
    if (value == null) {
      return {
        label: "N/A",
        color: "default",
      };
    }
  
    if (value >= good) {
      return {
        label: "Good",
        color: "success",
      };
    }
  
    if (value >= average) {
      return {
        label: "Average",
        color: "warning",
      };
    }
  
    return {
      label: "Weak",
      color: "error",
    };
  };
  
  const debtChip = (value) => {
    if (value == null) {
      return {
        label: "N/A",
        color: "default",
      };
    }
  
    if (value < 50) {
      return {
        label: "Low Debt",
        color: "success",
      };
    }
  
    if (value < 100) {
      return {
        label: "Moderate",
        color: "warning",
      };
    }
  
    return {
      label: "High Debt",
      color: "error",
    };
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: 28,
        }}
      >
        📈 {stock.Symbol}
      </DialogTitle>
  
      <DialogContent>
  
        {loading && (
          <Typography mb={2}>
            Loading company details...
          </Typography>
        )}
  
        {company && (
          <Card sx={{ mb: 4 }}>
            <CardContent>
  
              <Typography variant="h5" gutterBottom>
                🏢 Company Profile
              </Typography>
  
              <Divider sx={{ mb: 3 }} />
  
              <Grid container spacing={2}>
  
                <Grid item xs={12} sm={6} md={3}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Company
                      </Typography>
  
                      <Typography variant="h6">
                        {company.companyName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
  
                <Grid item xs={12} sm={6} md={3}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Sector
                      </Typography>
  
                      <Typography variant="h6">
                        {company.sector}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
  
                <Grid item xs={12} sm={6} md={3}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Industry
                      </Typography>
  
                      <Typography variant="h6">
                        {company.industry}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
  
                <Grid item xs={12} sm={6} md={3}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Market Cap
                      </Typography>
  
                      <Typography variant="h6">
                        {formatNumber(company.marketCap)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
  
              </Grid>
  
            </CardContent>
          </Card>
        )}
        {company && (
  <Card sx={{ mb: 4 }}>
    <CardContent>

      <Typography variant="h5" gutterBottom>
        📊 Financial Ratios
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                PE Ratio
              </Typography>

              <Typography variant="h5">
                {company.trailingPE ?? "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                EPS
              </Typography>

              <Typography variant="h5">
                {company.eps ?? "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                ROE
              </Typography>

              <Typography variant="h5">
                {company.roe
                  ? `${(company.roe * 100).toFixed(2)}%`
                  : "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Book Value
              </Typography>

              <Typography variant="h5">
                {company.bookValue ?? "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Forward PE
              </Typography>

              <Typography variant="h5">
                {company.forwardPE ?? "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                PEG Ratio
              </Typography>

              <Typography variant="h5">
                {company.pegRatio ?? "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Price / Book
              </Typography>

              <Typography variant="h5">
                {company.priceToBook ?? "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Dividend Yield
              </Typography>

              <Typography variant="h5">
                {company.dividendYield
                  ? `${(company.dividendYield * 100).toFixed(2)}%`
                  : "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

    </CardContent>
  </Card>
)}
{company && (
  <Card sx={{ mb: 4 }}>
    <CardContent>

      <Typography variant="h5" gutterBottom>
        📈 Today's Statistics
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Open
              </Typography>

              <Typography variant="h5">
                ₹ {company.open ?? "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Previous Close
              </Typography>

              <Typography variant="h5">
                ₹ {company.previousClose ?? "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Day High
              </Typography>

              <Typography variant="h5">
                ₹ {company.dayHigh ?? "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Day Low
              </Typography>

              <Typography variant="h5">
                ₹ {company.dayLow ?? "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Volume
              </Typography>

              <Typography variant="h5">
                {formatNumber(company.volume)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Avg Volume
              </Typography>

              <Typography variant="h5">
                {formatNumber(company.averageVolume)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                52 Week High
              </Typography>

              <Typography variant="h5">
                ₹ {company.fiftyTwoWeekHigh ?? "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                52 Week Low
              </Typography>

              <Typography variant="h5">
                ₹ {company.fiftyTwoWeekLow ?? "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

    </CardContent>
  </Card>
)}
{company && (
  <Card sx={{ mb: 4 }}>
    <CardContent>

      <Typography variant="h5" gutterBottom>
        ❤️ Financial Health
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>

        <Grid item xs={12} md={6}>
          <Typography mb={2}>
            <strong>Current Ratio</strong> : {company.currentRatio}
          </Typography>

          <Chip
            {...healthChip(company.currentRatio, 2, 1)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography mb={2}>
            <strong>Debt / Equity</strong> : {company.debtToEquity}
          </Typography>

          <Chip
            {...debtChip(company.debtToEquity)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography mb={2}>
            <strong>Profit Margin</strong> :
            {" "}
            {(company.profitMargins * 100).toFixed(2)}%
          </Typography>

          <Chip
            {...healthChip(company.profitMargins, 0.15, 0.08)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography mb={2}>
            <strong>Operating Margin</strong> :
            {" "}
            {(company.operatingMargins * 100).toFixed(2)}%
          </Typography>

          <Chip
            {...healthChip(company.operatingMargins, 0.15, 0.08)}
          />
        </Grid>

      </Grid>

    </CardContent>
  </Card>
)}
  
        {/* Existing Cards */}
  
        <Grid container spacing={2}>
  
          {/* Overview */}
  
          <Grid item xs={12} md={4}>
  
            <Card>
  
              <CardContent>
  
                <Typography variant="h6" gutterBottom>
                  Overview
                </Typography>
  
                <Divider sx={{ mb: 2 }} />
  
                <Typography>
                  <strong>Score</strong>
                </Typography>
  
                <Typography
                  variant="h4"
                  color="primary"
                  mb={2}
                >
                  {stock.Score}
                </Typography>
  
                <Typography>
                  <strong>Current Price</strong>
                </Typography>
  
                <Typography variant="h5" mb={2}>
                  ₹ {stock.Close}
                </Typography>
  
                <Typography>
                  <strong>52W High</strong>
                </Typography>
  
                <Typography mb={2}>
                  ₹ {stock["52W High"]}
                </Typography>
  
                <Typography>
                  <strong>52W Low</strong>
                </Typography>
  
                <Typography>
                  ₹ {stock["52W Low"]}
                </Typography>
  
              </CardContent>
  
            </Card>
  
          </Grid>
  
          {/* Technical Indicators */}
  
          <Grid item xs={12} md={4}>
  
            <Card>
  
              <CardContent>
  
                <Typography variant="h6" gutterBottom>
                  Technical Indicators
                </Typography>
  
                <Divider sx={{ mb: 2 }} />
  
                <Typography>SMA 50</Typography>
  
                <Typography variant="h5" mb={2}>
                  {stock.SMA50}
                </Typography>
  
                <Typography>SMA 150</Typography>
  
                <Typography variant="h5" mb={2}>
                  {stock.SMA150}
                </Typography>
  
                <Typography>EMA 220</Typography>
  
                <Typography variant="h5">
                  {stock.EMA220}
                </Typography>
  
              </CardContent>
  
            </Card>
  
          </Grid>
  
          {/* Screening Conditions */}
  
          <Grid item xs={12} md={4}>
  
            <Card>
  
              <CardContent>
  
                <Typography variant="h6" gutterBottom>
                  Screening Conditions
                </Typography>
  
                <Divider sx={{ mb: 2 }} />
  
                <Stack spacing={2}>
  
                  <Condition
                    value={stock.Trend}
                    label="SMA150 > EMA220"
                  />
  
                  <Condition
                    value={stock["Price > SMA50"]}
                    label="Close > SMA50"
                  />
  
                  <Condition
                    value={stock["SMA Trend"]}
                    label="SMA50 > SMA150"
                  />
  
                  <Condition
                    value={stock["25% Above Low"]}
                    label="Above 52W Low"
                  />
  
                  <Chip
                    label={stock["EMA Dip"]}
                    color="info"
                  />
  
                  <Condition
                    value={stock.Breakout}
                    label="Breakout"
                  />
  
                </Stack>
  
              </CardContent>
  
            </Card>
  
          </Grid>
  
        </Grid>
        {company?.businessSummary && (
  <Card sx={{ mt: 4 }}>
    <CardContent>

      <Typography variant="h5" gutterBottom>
        🏢 About Company
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Typography
        variant="body1"
        sx={{
          lineHeight: 2,
          textAlign: "justify",
          color: "text.secondary",
          maxHeight: 220,
          overflowY: "auto",
          pr: 1,
      }}
      >
        {company.businessSummary}
      </Typography>

    </CardContent>
  </Card>
)}
  
        {/* TradingView */}
  
        <Card sx={{ mt: 4 }}>
  
          <CardContent>
  
            <Typography
              variant="h5"
              gutterBottom
            >
              📊 Live Chart
            </Typography>
  
            <Divider sx={{ mb: 2 }} />
  
            <TradingViewChart
              symbol={stock.Symbol}
            />
  
          </CardContent>
  
        </Card>
        <Card sx={{ mt: 4 }}>
  <CardContent>

    <Typography variant="h5" gutterBottom>
      📰 Latest News
    </Typography>

    <Divider sx={{ mb: 2 }} />

    {news.length === 0 ? (

<Button
  variant="contained"
  onClick={handleLoadNews}
  disabled={newsLoading}
  sx={{ mt: 2 }}
>
  {newsLoading
    ? "Loading..."
    : "📰 Load Latest News"}
</Button>

) : (

<Stack
  direction="row"
  justifyContent="space-between"
  alignItems="center"
  sx={{ mt: 2, mb: 2 }}
>

  <Typography
    variant="body2"
    color="text.secondary"
  >
    Latest News ({news.length})
  </Typography>

  <Button
    variant="outlined"
    onClick={handleLoadNews}
    disabled={newsLoading}
  >
    🔄 Refresh News
  </Button>

</Stack>

)}

<Stack spacing={2}>

  {news.map((item, index) => (

    <Card key={index} elevation={2}>

      {item.thumbnail && (
        <CardMedia
          component="img"
          height="220"
          image={item.thumbnail}
        />
      )}

      <CardContent>

        <Typography variant="h6" gutterBottom>
          {item.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {item.summary}
        </Typography>

        <Typography variant="caption">
          {item.publisher}
        </Typography>

        <br />

        <Typography variant="caption">
          {new Date(item.published).toLocaleString()}
        </Typography>

        <br />

        <Button
          href={item.url}
          target="_blank"
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Read Full Article
        </Button>

      </CardContent>

    </Card>

  ))}

</Stack>

  </CardContent>
</Card>

      </DialogContent>

    </Dialog>
  );
}

export default StockDetails;