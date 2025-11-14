import { Box, Container } from "@mui/material";

import Footer from "./Footer";
import Header from "./Header";

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
          py: 4
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
}

export default Layout;
