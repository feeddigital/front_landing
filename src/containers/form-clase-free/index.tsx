import { useState } from "react";
import { apiService } from "../../services/api-service";
import { validation } from "../../utils/validation";
import Layout from "../layout";

import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Alert,
} from "@mui/material";
import { Person, Email, Phone } from "@mui/icons-material";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const FormClaseFree: React.FC = () => {
  const [inscripcionEmail, setInscripcionEmail] = useState<string>("");
  const [inscripcionNombre, setInscripcionNombre] = useState<string>("");
  const [inscripcionApellido, setInscripcionApellido] = useState<string>("");
  const [inscripcionWhatsapp, setInscripcionWhatsapp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const isInscripcionFormValid = (): boolean => {
    return (
      inscripcionNombre.trim() !== "" &&
      inscripcionApellido.trim() !== "" &&
      validation.email(inscripcionEmail) &&
      inscripcionEmail !== ""
    );
  };

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleInscripcion = async () => {
    if (!isInscripcionFormValid()) {
      showAlert(
        "error",
        "Por favor completá todos los campos obligatorios y seleccioná un plan de pago."
      );
      return;
    }

    setIsLoading(true);
    try {
      const subscriptionData = {
        nombre: inscripcionNombre.trim(),
        apellido: inscripcionApellido.trim(),
        email: inscripcionEmail.trim(),
        whatsapp: inscripcionWhatsapp.trim(),
      };

      await apiService.sendClaseIntro(subscriptionData);

      showAlert(
        "success",
        "¡No te vas a arrepentir! Te enviamos un correo con el acceso a la clase gratuita."
      );

      // Reseteo de campos
      setInscripcionEmail("");
      setInscripcionNombre("");
      setInscripcionApellido("");
      setInscripcionWhatsapp("");
    } catch (error: any) {
      console.error("Error:", error);
      showAlert(
        "error",
        error.message ||
          "Error al enviar la inscripción. Por favor, intentá nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={5} mb={5} mt={12}>
          {alert && (
            <Alert
              severity={alert.type}
              sx={{
                position: "fixed",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                width: "90%",
                maxWidth: 400,
                zIndex: 9999,
              }}
              onClose={() => setAlert(null)}
            >
              {" "}
              {alert.message}{" "}
            </Alert>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: "#D1D5DB",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Mirá la primer clase gratis
            </Typography>
            <Box
              sx={{
                border: "2px solid #D1D5DB",
                borderRadius: "50%",
                p: 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowDownwardIcon
                sx={{ color: "#D1D5DB", fontSize: "1.2rem" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: "#F0D911",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Sin obligación de compra{" "}
            </Typography>
          </Box>
          <Box
            sx={{
              mb: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 400,
              mx: "auto",
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Nombre"
              value={inscripcionNombre}
              onChange={(e) => setInscripcionNombre(e.target.value)}
              disabled={isLoading}
              required
              error={
                inscripcionNombre !== "" && inscripcionNombre.trim() === ""
              }
              helperText={
                inscripcionNombre !== "" && inscripcionNombre.trim() === ""
                  ? "Nombre requerido"
                  : ""
              }
              InputProps={{
                startAdornment: (
                  <Person sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Apellido"
              value={inscripcionApellido}
              onChange={(e) => setInscripcionApellido(e.target.value)}
              disabled={isLoading}
              required
              error={
                inscripcionApellido !== "" && inscripcionApellido.trim() === ""
              }
              helperText={
                inscripcionApellido !== "" && inscripcionApellido.trim() === ""
                  ? "Apellido requerido"
                  : ""
              }
              InputProps={{
                startAdornment: (
                  <Person sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="email"
              label="Tu correo electrónico"
              value={inscripcionEmail}
              onChange={(e) => setInscripcionEmail(e.target.value)}
              disabled={isLoading}
              required
              error={
                inscripcionEmail !== "" && !validation.email(inscripcionEmail)
              }
              helperText={
                inscripcionEmail !== "" && !validation.email(inscripcionEmail)
                  ? "Email inválido"
                  : ""
              }
              InputProps={{
                startAdornment: (
                  <Email sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="tel"
              label="WhatsApp"
              placeholder="+5411123-5678"
              value={inscripcionWhatsapp}
              onChange={(e) => setInscripcionWhatsapp(e.target.value)}
              disabled={isLoading}
              error={!validation.phone(inscripcionWhatsapp)}
              helperText={
                !validation.phone(inscripcionWhatsapp)
                  ? "Formato de WhatsApp inválido"
                  : "Incluye código de país (ej: +54)"
              }
              InputProps={{
                startAdornment: (
                  <Phone sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleInscripcion}
                disabled={isLoading || !isInscripcionFormValid()}
                startIcon={isLoading && <CircularProgress size={20} />}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
              >
                {isLoading
                  ? "PROCESANDO..."
                  : "QUIERO VER LA PRIMER CLASE GRATIS"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default FormClaseFree;
