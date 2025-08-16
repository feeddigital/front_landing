import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Button,
  Avatar,
  Chip,
  Divider,
  CircularProgress,
  Grid,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Code,
  Psychology,
  Computer,
  CalendarToday,
  Schedule,
  Person,
  Email,
  Phone,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DataObjectIcon from "@mui/icons-material/DataObject";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";

import { apiService } from "../../services/api-service";

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [inscripcionEmail, setInscripcionEmail] = useState<string>("");
  const [inscripcionNombre, setInscripcionNombre] = useState<string>("");
  const [inscripcionApellido, setInscripcionApellido] = useState<string>("");
  const [inscripcionWhatsapp, setInscripcionWhatsapp] = useState<string>("");
  const [consultaEmail, setConsultaEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [planPago, setPlanPago] = useState<string>("");
  const [_alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const navigate = useNavigate();

  // Links según plan
  const linksMercadoPago: Record<string, string> = {
    transferencia1: "https://mpago.li/link-transferencia-1pago",
    transferencia6: "https://mpago.li/link-transferencia-6pagos",
    tarjeta: "https://mpago.li/2avsyVs",
  };

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleInscripcion = async () => {
    if (!isInscripcionFormValid() || !planPago) {
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
        whatsapp: inscripcionWhatsapp.trim() || undefined,
        planPago: planPago,
      };

      await apiService.sendSubscription(subscriptionData);

      showAlert(
        "success",
        "¡Inscripción enviada correctamente! Redirigiendo al pago..."
      );

      // Pequeño delay para mostrar el mensaje antes de redirigir
      setTimeout(() => {
        const link = linksMercadoPago[planPago];
        if (link && link !== "#") {
          window.location.href = link;
        } else {
          navigate("/success", {
            state: { type: "inscription", data: subscriptionData },
          });
        }
      }, 2000);

      // Reseteo de campos
      setInscripcionEmail("");
      setInscripcionNombre("");
      setInscripcionApellido("");
      setInscripcionWhatsapp("");
      setPlanPago("");
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

  const handleConsulta = async () => {
    if (!consultaEmail || !isValidEmail(consultaEmail)) {
      showAlert("error", "Por favor ingresá un email válido.");
      return;
    }

    setIsLoading(true);
    try {
      await apiService.sendConsultation({
        email: consultaEmail.trim(),
        message:
          "Consulta por días y horarios disponibles para el curso fullstack.",
      });

      showAlert(
        "success",
        "¡Gracias por tu consulta! En minutos nos estaremos comunicando con vos."
      );
      setConsultaEmail("");
    } catch (error: any) {
      console.error("Error:", error);
      showAlert(
        "error",
        error.message ||
          "Error al enviar la consulta. Por favor, intentá nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidWhatsapp = (whatsapp: string): boolean => {
    if (!whatsapp) return true; // WhatsApp es opcional
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,15}$/;
    return phoneRegex.test(whatsapp.replace(/\s/g, ""));
  };

  const isInscripcionFormValid = (): boolean => {
    return (
      inscripcionNombre.trim() !== "" &&
      inscripcionApellido.trim() !== "" &&
      isValidEmail(inscripcionEmail) &&
      inscripcionEmail !== "" &&
      (inscripcionWhatsapp === "" || isValidWhatsapp(inscripcionWhatsapp))
    );
  };

  const scheduleItems = [
    { text: "Lunes y Miércoles", icon: <CalendarToday />, color: "secondary" },
    { text: "20 a 22hs.", icon: <Schedule />, color: "success" },
    {
      text: "Clases comienzan 01/09",
      icon: <CalendarToday />,
      color: "secondary",
    },
  ];

  const empresas = [
    { src: "/mercado-libre.png", alt: "Mercado Libre" },
    { src: "/galicia.JPG", alt: "Galicia" },
    { src: "/bancor.JPG", alt: "Bancor" },
    { src: "/santander.jpg", alt: "Santander" },
    { src: "/naranjax.png", alt: "Naranja" },
    { src: "/telecom.png", alt: "Telecom" },
  ];

  const courseContent = [
    {
      text: "DESARROLLO WEB",
      details: [
        "Introducción y primeros pasos en la programación",
        "GIT",
        "VS CODE",
        "HTML",
        "CSS",
      ],
      icon: <Code />,
    },
    {
      text: "JAVASCRIPT",
      details: [
        "Variables",
        "Tipos de datos",
        "Condicionales",
        "Bucles",
        "Arrays",
        "Funciones",
        "Clases",
        "Estructuras avanzadas",
        "Objetos",
        "Asincronía",
        "DOM",
        "Depuración",
        "Regex",
      ],
      icon: <IntegrationInstructionsIcon />,
    },
    {
      text: "TYPESCRIPT",
      details: [
        "Tipos de datos",
        "Types",
        "Interfaces",
        "Clases",
        "Encapsulamiento",
      ],
      icon: <Psychology />,
    },
    {
      text: "REACT.JS",
      details: [
        "Componentes",
        "Routing",
        "Asincronía",
        "Consumir APIs",
        "Context",
        "Zustand",
        "Tanstack Query",
      ],
      icon: <Computer />,
    },

    {
      text: "NODE.JS",
      details: [
        "Express",
        "Filesystem",
        "Mongo DB",
        "mySQL",
        "Mongoose",
        "Sequelize",
        "Encriptación de datos",
        "Autorización",
        "Autenticación",
        "Passport",
        "Json Web Token",
        "Motores de plantillas",
        "Conexión backend y frontend",
      ],
      icon: <DataObjectIcon />,
    },
  ];

  return (
    <Grid sx={{ pl: 2, pr: 2, pb: 2 }}>
      <Grid item sm={12} md={12} lg={12}>
        <Box
          sx={{
            marginTop: "10px",
            height: "69vh",
            backgroundImage: "url('/mujer-programando.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.66)", // Mejora el contraste del texto
              }}
            >
              {!isMobile ? (
                <Avatar
                  src="/LOGO_CUADRADO.jpg"
                  alt="Logo Feed Digital"
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 1,
                    mt: 8,
                  }}
                >
                  FD
                </Avatar>
              ) : (
                <Box
                  sx={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.9) 90%, transparent 100%)",
                    borderRadius: "8px",
                    display: "inline-flex",
                    justifyContent: "left",
                    alignItems: "left",
                    width: "100%",
                  }}
                >
                  <Avatar
                    src="/LOGO_CUADRADO.jpg"
                    alt="Logo Feed Digital"
                    sx={{
                      width: 120,
                      height: 100,
                      mb: 1,
                      mt: 5,
                    }}
                  >
                    FD
                  </Avatar>
                </Box>
              )}

              <Typography variant="h1" component="h1" gutterBottom>
                Aprendé Desarrollo Web Fullstack
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Cuando finalices este curso vas a poder ofrecer servicios de
                desarrollo web fullstack y crear web/apps profesionales.
              </Typography>
              <Typography variant="h5" sx={{ mb: 2 }}>
                La ruta de estudio está pensada para que comiences desde cero y
                paso a paso adquieras los conocimientos necesarios para
                insertarte en el mercado laboral.
              </Typography>
              <Chip
                label="🔴 Clases online en vivo"
                color="error"
                size="medium"
                sx={{ fontSize: "1rem", py: 2, px: 1, mb: 5 }}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item sm={12} md={12} lg={12} sx={{ marginTop: 6 }}>
        <Card sx={{ backgroundColor: "#0a0a0a", marginBottom: 5 }}>
          <CardContent>
            <Typography
              variant="subtitle1"
              align="left"
              sx={{ color: "#D1D5DB", mb: 2, letterSpacing: 1 }}
            >
              CONTENIDO DEL CURSO:
            </Typography>

            {courseContent.map((item, index) => (
              <Accordion
                key={index}
                sx={{
                  backgroundColor: "#0a0a0a",
                  color: "#fff",
                  boxShadow: "none",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {item.icon}
                    <Typography sx={{ fontSize: 15 }}>{item.text}</Typography>
                  </Box>
                </AccordionSummary>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, p: 1 }}>
                  {item.details.map((detail, idx) => (
                    <AccordionDetails
                      key={idx}
                      sx={{
                        backgroundColor: "#1f1f1f",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        display: "inline-block",
                        width: "fit-content",
                        "&:hover": {
                          backgroundColor: "#2a2a2a",
                        },
                      }}
                    >
                      <Typography sx={{ fontSize: 14, color: "#D1D5DB" }}>
                        {detail}
                      </Typography>
                    </AccordionDetails>
                  ))}
                </Box>
              </Accordion>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={12} md={12} lg={12}>
        <Grid container spacing={4} alignItems="center">
          {/* Texto */}
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom>
              ¿Ser Fullstack Web Developer?
            </Typography>
            <Typography variant="body1" gutterBottom>
              El desarrollo de software es un universo en constante crecimiento
              y lleno de oportunidades. El perfil de Programador Web Fullstack
              está entre los más buscados por las empresas, y será nuestra meta
              clara. A lo largo de la cursada, practicaremos de forma intensiva
              para que desarrolles un entendimiento sólido de la programación y
              la lógica computacional. Al especializarte en este perfil,
              contarás con las bases necesarias para comprender el
              funcionamiento de las empresas tecnológicas y enfrentar tus
              primeras entrevistas con confianza.
            </Typography>
          </Grid>

          {/* Imagen */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/programador.JPG"
              alt="Programador trabajando"
              sx={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 2,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} md={12} lg={12}>
        <Box sx={{ backgroundColor: "#0a0a0a", py: 5 }}>
          <Typography
            variant="subtitle1"
            fontSize={12}
            align="center"
            sx={{ color: "#D1D5DB", mb: 4, letterSpacing: 1 }}
          >
            EMPRESAS QUE SOLICITAN DESARROLLADORES FULLSTACK
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {empresas.map((empresa, i) => (
              <Grid key={i} item xs={6} sm={4} md={2}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 5,
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 100,
                    width: 100,
                    marginLeft: 4,
                  }}
                >
                  <img
                    src={empresa.src}
                    alt={empresa.alt}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
      <Grid item sm={12} md={12} lg={12} sx={{ marginBottom: 3, marginTop: 3 }}>
        <Grid>
          <Card sx={{ height: "100%", backgroundColor: "#0a0a0a" }}>
            <CardContent>
              <Typography variant="h2" gutterBottom>
                DÍAS Y HORARIOS DISPONIBLES:
              </Typography>
              <Grid container spacing={2}>
                {scheduleItems.map((item, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <ListItem sx={{ py: 1 }}>
                      <ListItemIcon
                        sx={{ color: `${item.color}.main`, minWidth: 40 }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontWeight: 500,
                          fontSize: "1.1rem",
                        }}
                      />
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item sm={6} md={8} lg={8}>
        <Paper sx={{ p: 4, textAlign: "center", backgroundColor: "#0a0a0a" }}>
          <Box sx={{ mb: 4 }}>
                      {/* Botones de plan de pago */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                value: "transferencia1",
                label: "Transferencia 1 pago",
                desc: "Pago único con transferencia bancaria.",
                hasDiscount: true,
              },
              {
                value: "transferencia6",
                label: "Transferencia 6 pagos",
                desc: "6 cuotas fijas sin interés por transferencia.",
                hasDiscount: false,
              },
              {
                value: "tarjeta",
                label: "Tarjeta de crédito",
                desc: "Pagá con tu tarjeta en cuotas.",
                hasDiscount: false,
              },
            ].map((plan) => (
              <Box
                key={plan.value}
                sx={{ position: "relative", display: "inline-block" }}
              >    
                <Button
                  variant={planPago === plan.value ? "contained" : "outlined"}
                  color={planPago === plan.value ? "primary" : "inherit"}
                  onClick={() => setPlanPago(plan.value)}
                  sx={{
                    minWidth: 200,
                    borderRadius: "8px",
                    fontWeight: "bold",
                    backgroundColor:
                      planPago === plan.value ? "primary.main" : "transparent",
                    color: planPago === plan.value ? "#fff" : "#ccc",
                    "&:hover": {
                      backgroundColor:
                        planPago === plan.value ? "primary.dark" : "#1f1f1f",
                    },
                  }}
                >
                  {plan.label}
                </Button>
              </Box>
            ))}
          </Box>

          {/* Descripción del plan seleccionado */}
          {planPago && (
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: "#ccc", mb: 1 }}>
                {
                  {
                    transferencia1: "Pago único con transferencia bancaria.",
                    transferencia6:
                      "6 cuotas fijas sin interés por transferencia.",
                    tarjeta: "Pagá con tu tarjeta en cuotas.",
                  }[planPago]
                }
              </Typography>

              {/* Mostrar info adicional del descuento */}
              {planPago === "transferencia1" && (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "#d32f2f",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    mt: 1,
                  }}
                >
                  🔥 50% DESCUENTO
                </Box>
              )}
            </Box>
          )}

            {/* Nombre y apellido */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mb: 2,
                maxWidth: 600,
                mx: "auto",
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
                  inscripcionApellido !== "" &&
                  inscripcionApellido.trim() === ""
                }
                helperText={
                  inscripcionApellido !== "" &&
                  inscripcionApellido.trim() === ""
                    ? "Apellido requerido"
                    : ""
                }
                InputProps={{
                  startAdornment: (
                    <Person sx={{ color: "text.secondary", mr: 1 }} />
                  ),
                }}
              />
            </Box>

            {/* Email */}
            <TextField
              fullWidth
              variant="outlined"
              type="email"
              label="Tu correo electrónico"
              value={inscripcionEmail}
              onChange={(e) => setInscripcionEmail(e.target.value)}
              disabled={isLoading}
              required
              error={inscripcionEmail !== "" && !isValidEmail(inscripcionEmail)}
              helperText={
                inscripcionEmail !== "" && !isValidEmail(inscripcionEmail)
                  ? "Email inválido"
                  : ""
              }
              sx={{ mb: 2, maxWidth: 600 }}
              InputProps={{
                startAdornment: (
                  <Email sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />

            {/* WhatsApp */}
            <TextField
              fullWidth
              variant="outlined"
              type="tel"
              label="WhatsApp (opcional)"
              placeholder="+54 9 11 1234-5678"
              value={inscripcionWhatsapp}
              onChange={(e) => setInscripcionWhatsapp(e.target.value)}
              disabled={isLoading}
              error={
                inscripcionWhatsapp !== "" &&
                !isValidWhatsapp(inscripcionWhatsapp)
              }
              helperText={
                inscripcionWhatsapp !== "" &&
                !isValidWhatsapp(inscripcionWhatsapp)
                  ? "Formato de WhatsApp inválido"
                  : "Incluye código de país (ej: +54)"
              }
              sx={{ mb: 3, maxWidth: 600 }}
              InputProps={{
                startAdornment: (
                  <Phone sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />

            {/* Botón inscripción */}
            <Box>
              <Button
                variant="contained"
                size="large"
                onClick={handleInscripcion}
                disabled={isLoading || !isInscripcionFormValid()}
                startIcon={
                  isLoading && <CircularProgress size={20} /> 
                }
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
              >
                {isLoading ? "PROCESANDO..." : "INSCRIBIRME"}
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Consultas */}
          <Typography variant="h6" sx={{ mb: 3 }}>
            Consultá por otros días y horarios disponibles:
          </Typography>

          <Box>
            <TextField
              fullWidth
              variant="outlined"
              type="email"
              label="Tu correo para consultas"
              value={consultaEmail}
              onChange={(e) => setConsultaEmail(e.target.value)}
              disabled={isLoading}
              error={consultaEmail !== "" && !isValidEmail(consultaEmail)}
              helperText={
                consultaEmail !== "" && !isValidEmail(consultaEmail)
                  ? "Email inválido"
                  : ""
              }
              sx={{ mb: 2, maxWidth: 400 }}
              InputProps={{
                startAdornment: (
                  <Email sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
            <Box>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleConsulta}
                disabled={isLoading || !isValidEmail(consultaEmail)}
                startIcon={
                  isLoading ? <CircularProgress size={20} /> : <Email />
                }
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
              >
                {isLoading ? "ENVIANDO..." : "CONSULTAR"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default LandingPage;
