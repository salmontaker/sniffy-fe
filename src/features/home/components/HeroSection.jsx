import { alpha, Box, Container, Typography } from "@mui/material";

function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: { xs: 4, md: 6 },
        background: (theme) =>
          theme.palette.mode === "light"
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.3)} 0%, ${alpha(theme.palette.secondary.light, 0.15)} 100%)`
            : `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.15)} 0%, ${alpha(theme.palette.secondary.dark, 0.08)} 100%)`,
        py: { xs: 4, md: 6 },
        px: 3,
        mb: 4,
        textAlign: "center"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: (theme) => alpha(theme.palette.primary.main, 0.1),
          filter: "blur(40px)",
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: (theme) => alpha(theme.palette.secondary.main, 0.1),
          filter: "blur(30px)",
          zIndex: 0
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 2, sm: 4 }
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            sx={{
              width: { xs: 60, md: 80 },
              height: { xs: 60, md: 80 },
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))"
            }}
          />
          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{
                background: (theme) =>
                  `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 0.5
              }}
            >
              스니피 (Sniffy)
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontWeight: 500, opacity: 0.8, wordBreak: "keep-all" }}
            >
              잃어버린 물건, 스니피가 찾아드려요!
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
