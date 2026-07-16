import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";

function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1201,
        background: "#1E293B",
      }}
    >
      <Toolbar>
        <ShowChartIcon sx={{ mr: 2 }} />

        <Typography
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          Stock Analysis Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;