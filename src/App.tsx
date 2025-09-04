import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./theme/theme";
import LandingPage from "./containers/landing";
import Exito from "./containers/exito";
import RespuestaContacto from "./containers/respuesta-contacto";
import PoliticaPrivacidad from "./containers/policy";
import Programa from "./containers/programa";
import FormClaseFree from "./containers/form-clase-free";
import ExitoClaseFree from "./containers/exito-clase-free";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/programa" element={<Programa />} />
          <Route path="/exito" element={<Exito />} />
          <Route path="/exito-clase0" element={<ExitoClaseFree />} />
          <Route path="/consulta" element={<RespuestaContacto />} />
          <Route path="/privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/form-clase-free" element={<FormClaseFree/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
