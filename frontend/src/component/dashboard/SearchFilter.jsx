import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  InputAdornment,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import SearchIcon from "@mui/icons-material/Search";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

function SearchFilter({
  onRun,
  onExportCSV,
  onExportPDF,
  search,
  setSearch,
  minScore,
  setMinScore,
  sector,
  setSector,
  sectors,
  loading,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        p: 3,
        borderRadius: 4,
        background:
          "linear-gradient(180deg,#1B2435 0%, #182133 100%)",
        border: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <Grid container spacing={2} alignItems="center">

        {/* Search */}

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            placeholder="Search stock (RELIANCE, TCS...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9CA3AF" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 58,
                borderRadius: 3,
                background: "#0F172A",

                "& fieldset": {
                  borderColor: "rgba(255,255,255,.10)",
                },

                "&:hover fieldset": {
                  borderColor: "#22C55E",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#22C55E",
                  borderWidth: 2,
                },
              },

              input: {
                color: "#fff",
              },
            }}
          />
        </Grid>

        {/* Score */}

        <Grid size={{ xs: 12, md: 2.2 }}>
          <TextField
            select
            fullWidth
            value={minScore}
            onChange={(e) => setMinScore(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterAltOutlinedIcon
                    sx={{ color: "#22C55E" }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 58,
                borderRadius: 3,
                background: "#0F172A",

                "& fieldset": {
                  borderColor: "rgba(255,255,255,.10)",
                },

                "&:hover fieldset": {
                  borderColor: "#22C55E",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#22C55E",
                },
              },
            }}
          >
            <MenuItem value="All">All Scores</MenuItem>
  <MenuItem value="6">6 / 6</MenuItem>
  <MenuItem value="5">5 / 6</MenuItem>
  <MenuItem value="4">4 / 6</MenuItem>
  <MenuItem value="3">3 / 6</MenuItem>
  <MenuItem value="2">2 / 6</MenuItem>
  <MenuItem value="1">1 / 6</MenuItem>
  <MenuItem value="0">0 / 6</MenuItem>
          </TextField>
        </Grid>

        {/* Sector */}

        <Grid size={{ xs: 12, md: 2.2 }}>
  <Autocomplete
    options={sectors}
    value={sector}
    onChange={(event, value) =>
      setSector(value || "All")
    }
    getOptionLabel={(option) =>
      option === "All" ? "All Sectors" : option
    }
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder="Sector"
      />
    )}
    sx={{
      "& .MuiOutlinedInput-root": {
        height: 58,
        borderRadius: 3,
        background: "#0F172A",

        "& fieldset": {
          borderColor: "rgba(255,255,255,.10)",
        },

        "&:hover fieldset": {
          borderColor: "#22C55E",
        },

        "&.Mui-focused fieldset": {
          borderColor: "#22C55E",
        },
      },
    }}
  />
</Grid>

        {/* CSV */}

        <Grid size={{ xs: 6, md: 1 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<DescriptionOutlinedIcon />}
            onClick={onExportCSV}
            sx={{
              height: 58,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              background: "#16A34A",

              "&:hover": {
                background: "#15803D",
              },
            }}
          >
            CSV
          </Button>
        </Grid>

        {/* PDF */}

        <Grid size={{ xs: 6, md: 1 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<PictureAsPdfOutlinedIcon />}
            onClick={onExportPDF}
            sx={{
              height: 58,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              background: "#2563EB",

              "&:hover": {
                background: "#1D4ED8",
              },
            }}
          >
            PDF
          </Button>
        </Grid>

        {/* Run */}

        <Grid size={{ xs: 12, md: 1.6}}>
        <Button
  fullWidth
  variant="contained"
  disabled={loading}
  startIcon={
    loading ? (
      <CircularProgress
        size={20}
        color="inherit"
      />
    ) : (
      <PlayArrowRoundedIcon />
    )
  }
  onClick={onRun}
  sx={{
    height: 58,
    borderRadius: 3,
    fontWeight: 700,
    fontSize: 16,
    textTransform: "none",

    background:
      "linear-gradient(90deg,#22C55E,#16A34A)",

    "&:hover": {
      background:
        "linear-gradient(90deg,#16A34A,#15803D)",
    },
  }}
>
  {loading ? "Analyzing..." : "Run "}
</Button>
        </Grid>

      </Grid>
    </Paper>
  );
}

export default SearchFilter;