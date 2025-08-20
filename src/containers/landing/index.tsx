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
  List,
  Alert,
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
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { apiService } from "../../services/api-service";
import Layout from "../layout";

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [inscripcionEmail, setInscripcionEmail] = useState<string>("");
  const [inscripcionNombre, setInscripcionNombre] = useState<string>("");
  const [inscripcionApellido, setInscripcionApellido] = useState<string>("");
  const [inscripcionWhatsapp, setInscripcionWhatsapp] = useState<string>("");
  const [consultaEmail, setConsultaEmail] = useState<string>("");
  const [consultaTexto, setConsultaTexto] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [planPago, setPlanPago] = useState<string>("");
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const navigate = useNavigate();

  const linksMercadoPago: Record<string, string> = {
    transferencia1: "/exito",
    transferencia6: "/exito",
    tarjeta: "https://mpago.la/1fYbiUo",
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
        whatsapp: inscripcionWhatsapp.trim(),
        planPago: planPago,
      };

      await apiService.sendSubscription(subscriptionData);

      showAlert(
        "success",
        "¡Inscripción enviada correctamente! Redirigiendo al pago..."
      );

      setTimeout(() => {
        const link = linksMercadoPago[planPago];
        if (link && link !== "#" && !planPago.startsWith("transferencia")) {
          window.location.href = link;
        } else {
          navigate("/exito");
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

  const handleConsultaDisponible = async () => {
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
      navigate("/consulta");
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

  const handleConsulta = async () => {
    if (!consultaEmail || !isValidEmail(consultaEmail)) {
      showAlert("error", "Por favor ingresá un email válido.");
      return;
    }

    setIsLoading(true);
    try {
      await apiService.sendConsultation({
        email: consultaEmail.trim(),
        message: consultaTexto,
      });

      showAlert(
        "success",
        "¡Gracias por tu consulta! En minutos nos estaremos comunicando con vos."
      );
      setConsultaEmail("");
      setConsultaTexto("");
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
    if (!whatsapp) return true;
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,15}$/;
    return phoneRegex.test(whatsapp.replace(/\s/g, ""));
  };

  const isInscripcionFormValid = (): boolean => {
    return (
      inscripcionNombre.trim() !== "" &&
      inscripcionApellido.trim() !== "" &&
      isValidEmail(inscripcionEmail) &&
      inscripcionEmail !== "" &&
      inscripcionWhatsapp.includes("+") &&
      isValidWhatsapp(inscripcionWhatsapp)
    );
  };

  const scheduleItems = [
    { text: "Lunes y Miércoles", icon: <CalendarToday />, color: "secondary" },
    { text: "20 a 22hs.", icon: <Schedule />, color: "success" },
    {
      text: "6 meses",
      icon: <CalendarToday />,
      color: "primary",
    },
    {
      text: "Comienza 01/09",
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
    <Layout>
      <Alert
        severity="warning"
        icon={false}
        sx={{
          backgroundColor: "rgb(241, 255, 131)",
          color: "black",
          position: "fixed",
          top: isMobile ? "52px" : "64px",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          left: 0,
          width: "100%",
          textAlign: "center",
          cursor: "pointer"
        }}
        onClick={() => {
          const pagoSection = document.getElementById("pago");
          if (pagoSection) {
            pagoSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        {isMobile
          ? `Hasta el 30/08 💥 40% OFF en Curso FullStack Developer`
          : `🎉 Hasta el 30/08 💥 40% de descuento en el curso 👉 Desarrollo Web
          FullStack`}
      </Alert>

      <Grid item sm={12} md={12} lg={12}>
        <Box
          sx={{
            marginTop: !isMobile ? "65px" : "60px",
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
                backgroundColor: "rgba(0, 0, 0, 0.66)",
              }}
            >
              {/* Alert */}{" "}
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                align="left"
                sx={{ color: "#D1D5DB", letterSpacing: 1 }}
              >
                CONTENIDO DEL CURSO:
              </Typography>

              <Button
                onClick={() => navigate("/programa")}
                endIcon={
                  <Box
                    sx={{
                      border: "2px solid #D1D5DB",
                      borderRadius: "50%",
                      width: 22,
                      height: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowForwardIcon sx={{ fontSize: 14, color: "#D1D5DB" }} />
                  </Box>
                }
                sx={{
                  color: "#D1D5DB",
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "0.9rem",
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                VER RUTA DE ESTUDIO
              </Button>
            </Box>

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
      <Grid item sm={12} md={12} lg={12} id="pago">
        <Box sx={{ backgroundColor: "#0a0a0a" }}>
          <Card
            sx={{
              backgroundColor: "#121212",
              borderRadius: 3,
              mx: "auto",
              p: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "white", mb: 3, fontWeight: "bold" }}
            >
              ¿Qué incluye tu formación?
            </Typography>

            <List>
              {[
                "Clases online en vivo con instructores con +5 años de experiencia formando desarrolladores",
                "Certificado de finalización de carrera",
                "Acceso a grabación de clases",
                "Revisión de proyectos finales y respuesta a consultas de manera personalizada",
              ].map((text, i) => (
                <ListItem
                  key={i}
                  sx={{
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    px: 0,
                  }}
                >
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#22c55e" }} />{" "}
                  </ListItemIcon>
                  <Typography sx={{ color: "#D1D5DB" }}>{text}</Typography>
                </ListItem>
              ))}
            </List>
          </Card>
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
                  <Grid item xs={12} md={3} key={index}>
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
      <Grid item sm={6} md={8} lg={8} sx={{ mb: 5 }}>
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
            Seleccioná la opción de pago
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
            <ArrowDownwardIcon sx={{ color: "#D1D5DB", fontSize: "1.2rem" }} />
          </Box>
        </Box>

        <Paper sx={{ p: 4, textAlign: "center", backgroundColor: "#0a0a0a" }}>
          <Box sx={{ mb: 4 }}>
            {planPago === "transferencia1" && (
              <Box sx={{ mb: 3, textAlign: "center" }}>
                {/* Precio tachado */}
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    color: "#aaa",
                    textDecoration: "line-through",
                  }}
                >
                  $360.000
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1.5,
                    mt: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    $216.000
                  </Typography>

                  <Box
                    sx={{
                      backgroundColor: "#e53935",
                      color: "#fff",
                      fontWeight: "bold",
                      borderRadius: "6px",
                      px: 1.5,
                      py: 0.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <WhatshotIcon sx={{ fontSize: "1rem" }} />
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                      40% OFF
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            {planPago === "transferencia6" && (
              <Box sx={{ mb: 3, textAlign: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1.5,
                    mt: 1,
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
                    Pago mensual
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    $60.000
                  </Typography>
                </Box>
              </Box>
            )}
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
                        planPago === plan.value
                          ? "primary.main"
                          : "transparent",
                      color: planPago === plan.value ? "#fff" : "#ccc",
                      "&:hover": {
                        backgroundColor:
                          planPago === plan.value ? "primary.dark" : "#1f1f1f",
                      },
                      position: "relative",
                      overflow: "visible",
                    }}
                  >
                    {plan.label}
                  </Button>

                  {plan.value === "transferencia1" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -15,
                        right: -1,
                        backgroundColor: "#e53935",
                        color: "#fff",
                        fontWeight: "bold",
                        borderRadius: "6px",
                        px: 1,
                        py: 0.3,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.3,
                        fontSize: "0.75rem",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                      }}
                    >
                      <WhatshotIcon sx={{ fontSize: "1rem" }} />
                      40% OFF
                    </Box>
                  )}
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
              </Box>
            )}

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

            <TextField
              fullWidth
              variant="outlined"
              type="tel"
              label="WhatsApp*"
              placeholder="+5411123-5678"
              value={inscripcionWhatsapp}
              onChange={(e) => setInscripcionWhatsapp(e.target.value)}
              disabled={isLoading}
              error={!isValidWhatsapp(inscripcionWhatsapp)}
              helperText={
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

            <Box>
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
                {isLoading ? "PROCESANDO..." : "INSCRIBIRME"}
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

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
                onClick={handleConsultaDisponible}
                disabled={
                  isLoading ||
                  !isValidEmail(consultaEmail) ||
                  !isValidWhatsapp(inscripcionWhatsapp)
                }
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
      <Grid item sm={12} md={12} lg={12}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom>
              Recibí tu certificado de finalización
            </Typography>
            <Typography variant="body1" gutterBottom>
              Un premio al esfuerzo, pero los objetivos son el conocimiento y la
              experiencia.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/certificado.jpg"
              alt="Certificado"
              sx={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 2,
                border: "2px solid #9ca3af",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} md={12} lg={12}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/discord.JPG"
              alt="Discord"
              sx={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 2,
                border: "2px solid #9ca3af",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom>
              Comunidad Discord
            </Typography>
            <Typography variant="body1" gutterBottom>
              No enfrentarás este camino solo, tendrás el apoyo de los
              profesores, mentores y compañeros.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} md={12} lg={12} marginBottom={3} marginTop={3}>
        <Box
          id="contacto"
          sx={{
            backgroundColor: "#111",
            p: 3,
            borderRadius: 2,
            color: "white",
          }}
        >
          <Typography variant="h2" gutterBottom>
            Contacto
          </Typography>
          <Typography variant="body1" gutterBottom>
            Escribinos y respondemos tus dudas.
          </Typography>

          <TextField
            label="Tu Email"
            type="email"
            fullWidth
            value={consultaEmail}
            onChange={(e) => setConsultaEmail(e.target.value)}
            margin="normal"
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "gray" } }}
          />

          <TextField
            label="Tu consulta"
            fullWidth
            multiline
            rows={4}
            value={consultaTexto}
            onChange={(e) => setConsultaTexto(e.target.value)}
            margin="normal"
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "gray" } }}
          />

          <Box mt={2}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleConsulta}
              disabled={
                isLoading ||
                !isValidEmail(consultaEmail) ||
                consultaTexto.trim() === ""
              }
              startIcon={isLoading ? <CircularProgress size={20} /> : <Email />}
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
      </Grid>
    </Layout>
  );
};
export default LandingPage;
