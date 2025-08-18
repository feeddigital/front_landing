import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#111",
        color: "white",
        py: 3,
        mt: "auto",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography variant="body2">©2025 Digital Dev</Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography
            variant="body2"
            sx={{ marginTop: 1, cursor: "pointer" }}
            onClick={() => navigate("/privacidad")}
          >
            Política de privacidad
          </Typography>

          <IconButton
            component={Link}
            href="https://instagram.com/digitaldevcursos"
            target="_blank"
            rel="noopener"
            sx={{ color: "white" }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noopener"
            sx={{ color: "white" }}
          >
            <LinkedInIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
