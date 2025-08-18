import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#000",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Box
            component="img"
            src="/LOGO_CUADRADO.jpg"
            alt="Logo"
            sx={{ height: 40 }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box>
          <Button component={Link} to="/quienes-somos" sx={{ color: "white" }}>
            Quienes somos
          </Button>
          <Button component={Link} to="/contacto" sx={{ color: "white" }}>
            Contacto
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
