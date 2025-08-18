import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./theme/theme";
import LandingPage from "./containers/landing";
import Exito from "./containers/exito";
import RespuestaContacto from "./containers/respuesta-contacto";
import PoliticaPrivacidad from "./containers/policy";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/exito" element={<Exito />} />
          <Route path="/consulta" element={<RespuestaContacto />} />
          <Route path="/privacidad" element={<PoliticaPrivacidad />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
