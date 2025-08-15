import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { CheckCircle, Home, Email } from '@mui/icons-material';

const Exito: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, data } = location.state || { type: 'default', data: null };

  const getContent = () => {
    switch (type) {
      case 'inscription':
        return {
          title: '¡Inscripción Exitosa!',
          subtitle: `Hola ${data?.nombre || ''}, tu inscripción fue enviada correctamente.`,
          message: 'En breve nos estaremos comunicando contigo para coordinar el pago y enviarte los detalles del curso.',
          details: data ? [
            `Nombre: ${data.nombre} ${data.apellido}`,
            `Email: ${data.email}`,
            `Plan elegido: ${data.planPago}`,
            ...(data.whatsapp ? [`WhatsApp: ${data.whatsapp}`] : [])
          ] : []
        };
      case 'contact':
        return {
          title: '¡Mensaje Enviado!',
          subtitle: 'Tu consulta fue enviada exitosamente.',
          message: 'Te responderemos a la brevedad en tu email.',
          details: []
        };
      default:
        return {
          title: '¡Operación Exitosa!',
          subtitle: 'Tu solicitud fue procesada correctamente.',
          message: 'Gracias por contactarnos.',
          details: []
        };
    }
  };

  const content = getContent();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircle 
          sx={{ 
            fontSize: 80, 
            color: 'success.main', 
            mb: 3 
          }} 
        />
        
        <Typography variant="h2" component="h1" gutterBottom color="success.main">
          {content.title}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          {content.subtitle}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          {content.message}
        </Typography>
        
        {content.details.length > 0 && (
          <Card sx={{ mb: 4, textAlign: 'left' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumen de tu solicitud:
              </Typography>
              {content.details.map((detail, index) => (
                <Typography key={index} variant="body2" color="text.secondary">
                  {detail}
                </Typography>
              ))}
            </CardContent>
          </Card>
        )}
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate('/')}
            size="large"
          >
            Volver al inicio
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Email />}
            onClick={() => navigate('/contact')}
            size="large"
          >
            Contactar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Exito;