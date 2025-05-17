import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import List from "@mui/material/List";
import ListIcon from "@mui/icons-material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;
const navItems = [
  ["Expertise", "expertise"],
  ["History", "history"],
  ["Projects", "projects"],
  ["Contact", "contact"],
];

function Navigation({ parentToChild, modeChange }: any) {
  const { mode } = parentToChild;
  const isDarkMode = mode === "dark";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar appearance on scroll
      const navbar = document.getElementById("navigation");
      if (navbar) {
        const isScrolled = window.scrollY > navbar.clientHeight;
        setScrolled(isScrolled);
      }

      // Detect active section for highlighting nav items
      const sections = navItems.map((item) => item[1]);
      let currentSection = "";

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section: any) => {
    const element = document.getElementById(section);
    if (element) {
      // element.scrollIntoView({ behavior: "smooth" });
      slowScrollTo(element);
      setMobileOpen(false);
    }
  };

  function slowScrollTo(element: any, duration = 1500) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function animation(currentTime: any) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // Clamp between 0 and 1

      window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }

    // Ease-in-out function
    function easeInOutQuad(t: any) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animation);
  }

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: isDarkMode ? "#121212" : "#fff",
        color: isDarkMode ? "#fff" : "#121212",
        height: "100%",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        <ListIcon sx={{ verticalAlign: "middle", mr: 1 }} />
        Menu
      </Typography>
      <Divider
        sx={{
          backgroundColor: isDarkMode
            ? "rgba(255,255,255,0.12)"
            : "rgba(0,0,0,0.12)",
        }}
      />
      <List>
        {navItems.map((item) => (
          <ListItem key={item[0]} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                backgroundColor:
                  activeSection === item[1]
                    ? isDarkMode
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.04)"
                    : "transparent",
              }}
              onClick={() => scrollToSection(item[1])}
            >
              <ListItemText
                primary={item[0]}
                primaryTypographyProps={{
                  fontWeight: activeSection === item[1] ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        id="navigation"
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled
            ? isDarkMode
              ? "rgba(18, 18, 18, 0.95)"
              : "rgba(255, 255, 255, 0.95)"
            : isDarkMode
            ? "transparent"
            : "transparent",
          color: isDarkMode ? "#fff" : "#121212",
          transition: "all 0.3s ease-in-out",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: { xs: "0.5rem 1rem", md: "0.5rem 2rem" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                display: { xs: "none", sm: "block" },
                mr: 4,
              }}
            >
              Portfolio
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item[0]}
                onClick={() => scrollToSection(item[1])}
                sx={{
                  color: "inherit",
                  fontWeight: activeSection === item[1] ? "bold" : "normal",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    width: activeSection === item[1] ? "80%" : "0%",
                    height: "2px",
                    backgroundColor: "primary.main",
                    transition: "all 0.3s ease",
                    transform: "translateX(-50%)",
                  },
                  "&:hover::after": {
                    width: "80%",
                  },
                }}
              >
                {item[0]}
              </Button>
            ))}
          </Box>

          <Tooltip
            title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}
            TransitionComponent={Fade}
            arrow
          >
            <IconButton
              onClick={modeChange}
              color="inherit"
              sx={{
                backgroundColor: isDarkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)",
                "&:hover": {
                  backgroundColor: isDarkMode
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.1)",
                },
              }}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      {/* Toolbar placeholder for proper content positioning */}
      <Toolbar />
    </Box>
  );
}

export default Navigation;
