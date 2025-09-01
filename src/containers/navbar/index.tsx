import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const handleContactoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Si estamos en la página principal, prevenimos la navegación y hacemos un scroll suave.
    if (location.pathname === "/") {
      event.preventDefault();
      document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
    }
    // Si estamos en otra página, dejamos que el comportamiento por defecto del enlace <a> nos lleve a /#contacto.
  };

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
          <Button component={Link} to="/" sx={{ color: "white" }}>
            Quienes somos
          </Button>
          <Button
            component="a"
            href="/#contacto"
            onClick={handleContactoClick}
            sx={{ color: "white" }}
          >
            Contacto
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
