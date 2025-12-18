import { Box, Container } from "@mui/material";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default"
      }}
    >
      <Header />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: { xs: 2, sm: 4 },
          px: { xs: 1.5, sm: 2 }
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
}

export default Layout;
