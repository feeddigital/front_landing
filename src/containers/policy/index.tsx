import { Container, Typography } from "@mui/material";
import Layout from "../layout";

const PoliticaPrivacidad = () => {
  return (
    <Layout>
      <Container maxWidth="md" sx={{ pt: 16 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Política de Privacidad de Digital Dev
        </Typography>

        <Typography paragraph>
          En Digital Dev, respetamos tu privacidad y nos comprometemos a
          proteger tus datos personales. Esta política de privacidad describe
          cómo recopilamos, utilizamos y compartimos tu información cuando
          utilizas nuestro sitio web (
          <a
            href="https://www.digitaldevcursos.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            digitaldevcursos.com
          </a>
          ).
        </Typography>

        <Typography variant="h6" gutterBottom>
          Información que Recopilamos
        </Typography>
        <Typography paragraph>
          <b>Datos Personales:</b> Recopilamos tu nombre, email y whatsapp
          cuando te inscribís a alguno de nuestros cursos.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Uso de tus Datos Personales
        </Typography>
        <Typography paragraph>
          Utilizamos tus datos personales para identificarte como usuario y
          poder facilitarte el contenido de los cursos.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Compartir tus Datos Personales
        </Typography>
        <Typography paragraph>
          No compartimos tus datos personales con terceros. Pero cabe aclarar
          que trabajamos con <b>Mercado Pago</b>{' '}
          para procesar pagos y proteger tu información.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Seguridad de tus Datos Personales
        </Typography>
        <Typography paragraph>
          Utilizamos <b>HTTPS</b> para garantizar la transmisión segura de
          información.
        </Typography>
        <Typography paragraph>
          No guardamos información de pago de los usuarios.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Contacto
        </Typography>
        <Typography paragraph>
          Si tienes alguna pregunta o inquietud sobre esta política de
          privacidad, puedes contactarnos en
          <a href="mailto:feeddigitalcursos@gmail.com">
            {" "}
            feeddigitalcursos@gmail.com
          </a>
          .
        </Typography>

        <Typography variant="body1" fontWeight="bold" mt={4}>
          Gracias por confiar en Digital Dev.
        </Typography>
      </Container>
    </Layout>
  );
};

export default PoliticaPrivacidad;
