import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Button, Box } from "@mui/material";
import { CheckCircle, Home } from "@mui/icons-material";

const Exito: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <CheckCircle
          sx={{
            fontSize: 80,
            color: "success.main",
            mb: 3,
          }}
        />

        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          color="success.main"
        >
          ¡Inscripción Exitosa!
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ mb: 4 }}
        >
          En breve nos estaremos comunicando contigo para coordinar el pago y
          enviarte los detalles del curso.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate("/")}
            size="large"
          >
            Volver al inicio
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Exito;
