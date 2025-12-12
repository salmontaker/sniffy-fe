import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function AuthFormHeader({ title, subTitle, linkText, linkTo }) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        component="h2"
        variant="h4"
        sx={{
          mt: 3,
          fontWeight: "800",
          color: "text.primary"
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mt: 1,
          color: "text.secondary"
        }}
      >
        {subTitle}
        <Link
          component={RouterLink}
          to={linkTo}
          variant="body2"
          underline="hover"
          sx={{
            fontWeight: "500"
          }}
        >
          {linkText}
        </Link>
      </Typography>
    </Box>
  );
}

export default AuthFormHeader;
