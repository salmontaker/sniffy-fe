import { Box, Container } from "@mui/material";

function AuthFormContainer({ children }) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: 6,
        flexGrow: 1
      }}
    >
      <Box sx={{ width: "100%" }}>{children}</Box>
    </Container>
  );
}

export default AuthFormContainer;
