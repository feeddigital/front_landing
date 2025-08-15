import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './theme/theme';
import Navbar from './containers/navbar';
import LandingPage from './containers/landing';
import Exito from './containers/exito';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/exito" element={<Exito />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;