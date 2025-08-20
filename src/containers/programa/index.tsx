import Layout from "../layout";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { Code, Psychology, Computer } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DataObjectIcon from "@mui/icons-material/DataObject";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";

const courseContent = [
  {
    text: "DESARROLLO WEB / 8 clases",
    details: [
      "Introducción y primeros pasos en la programación",
      "Introducción a Git y Github",
      "Visual Studio Code",
      "Fundamentos HTML - 3 clases",
      "Fundamentos CSS - 3 clases",
    ],
    icon: <Code />,
  },
  {
    text: "JAVASCRIPT / 8 clases",
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
    text: "TYPESCRIPT / 3 clases",
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
    text: "REACT.JS / 7 clases",
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
    text: "NODE.JS / 22 clases",
    details: [
      "Filesystem",
      "Express",
      "Conexión a Mongo DB",
      "Mongoose",
      "Conexión a MySQL",
      "Sequelize",
      "Arquitectura - división en capas",
      "Encriptación de datos",
      "Cookies",
      "Sesiones",
      "Autorización",
      "Autenticación",
      "Passport",
      "Json Web Token",
      "Mailing",
      "Motores de plantillas",
      "Websockets",
      "Conexión backend y frontend",
      "Testing",
      "Logging",
      "Documentación",
      "Despliegue",
    ],
    icon: <DataObjectIcon />,
  },
];

const Programa = () => {
  return (
    <Layout>
      <Grid mt={10} mb={5}>
        <Grid item sm={12} md={12} lg={12}>
          <Typography variant="h1" component="h1" gutterBottom>
            Ruta de estudio
          </Typography>
          <Typography variant="subtitle1" component="h1" gutterBottom>
            Éstos son los temas que vamos a recorrer con profundidad durante la
            cursada.
          </Typography>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
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

              <Box sx={{ display: "block", gap: 1, p: 1 }}>
                {item.details.map((detail, idx) => (
                  <AccordionDetails
                    key={idx}
                    sx={{
                      borderRadius: "8px",
                      padding: "8px 12px",
                      display: "block",
                      width: "fit-content",
                      marginBottom: "3px",
                      "&:hover": {
                        backgroundColor: "#2a2a2a",
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: 14, color: "#D1D5DB" }}>
                      {`> ${detail}`}
                    </Typography>
                  </AccordionDetails>
                ))}
              </Box>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Programa;
