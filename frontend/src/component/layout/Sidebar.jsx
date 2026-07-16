import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import StarIcon from "@mui/icons-material/Star";
import WorkIcon from "@mui/icons-material/Work";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {

  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          background: "#0F172A",
          color: "white",
        },
      }}
    >
      <Toolbar />

      <List>

        <ListItemButton
          component={Link}
          to="/"
          selected={location.pathname === "/"}
        >

          <ListItemIcon>
            <DashboardIcon sx={{ color: "white" }} />
          </ListItemIcon>

          <ListItemText primary="Dashboard" />

        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/watchlist"
          selected={location.pathname === "/watchlist"}
        >

          <ListItemIcon>
            <StarIcon sx={{ color: "#FFD700" }} />
          </ListItemIcon>

          <ListItemText primary="Watchlist" />

        </ListItemButton>
        <ListItemButton
  component={Link}
  to="/portfolio"
  selected={location.pathname === "/portfolio"}
>
  <ListItemIcon>
    <WorkIcon
      sx={{
        color:
          location.pathname === "/portfolio"
            ? "#8D6E63" // Brown when active
            : "#4CAF50", // Green when inactive
      }}
    />
  </ListItemIcon>

  <ListItemText primary="Portfolio" />
</ListItemButton>
<ListItemButton
  component={Link}
  to="/compare"
  selected={location.pathname === "/compare"}
>
  <ListItemIcon>
    <CompareArrowsIcon sx={{ color: "#42A5F5" }} />
  </ListItemIcon>

  <ListItemText primary="Compare Stocks" />
</ListItemButton>

      </List>

    </Drawer>
  );
}

export default Sidebar;