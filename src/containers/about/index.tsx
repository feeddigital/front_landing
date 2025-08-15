import React from 'react';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import { CheckCircle, School, Code, Work } from '@mui/icons-material';

const AboutPage: React.FC = () => {
  const features = [
    { text: "Clases en vivo con profesores experimentados", icon: <CheckCircle color="success" /> },
    { text: "Currículum actualizado con tecnologías modernas", icon: <CheckCircle color="success" /> },
    { text: "Proyectos reales para tu portfolio", icon: <CheckCircle color="success" /> },
    { text: "Seguimiento personalizado", icon: <CheckCircle color="success" /> },
    { text: "Comunidad de desarrolladores", icon: <CheckCircle color="success" /> },
    { text: "Certificación al finalizar", icon: <CheckCircle color="success" /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h1" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Sobre Feed Digital
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom color="primary">
              Nuestra Misión
            </Typography>
            <Typography variant="body1" paragraph>
              En Feed Digital nos especializamos en formar desarrolladores web fullstack
              con las tecnologías más demandadas del mercado. Creemos que la programación
              es una herramienta poderosa para crear soluciones innovadoras.
            </Typography>
            <Typography variant="body1" paragraph>
              Nuestro enfoque práctico y personalizado garantiza que nuestros estudiantes
              adquieran las habilidades necesarias para destacar en el mundo del desarrollo web
              y puedan conseguir su primer trabajo como developers o emprender sus propios proyectos.
            </Typography>
          </Paper>

          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom color="secondary">
              ¿Por qué elegir Feed Digital?
            </Typography>
            <List>
              {features.map((feature, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {feature.icon}
                  </ListItemIcon>
                  <ListItemText primary={feature.text} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                <School sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                +200
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estudiantes formados
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'secondary.main' }}>
                <Code sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                5+
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Años de experiencia
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'success.main' }}>
                <Work sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                85%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tasa de empleabilidad
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;