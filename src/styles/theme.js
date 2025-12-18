import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const createAppTheme = (mode) => {
  const baseTheme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#FF8A00",
        light: "#FFB04D",
        dark: "#C66B00",
        contrastText: "#FFFFFF"
      },
      secondary: {
        main: "#B02E8C",
        light: "#D85AA5",
        dark: "#7B1FA2",
        contrastText: "#FFFFFF"
      },
      background: {
        default: mode === "light" ? "#FDFDFD" : "#121212",
        paper: mode === "light" ? "#FFFFFF" : "#1E1E1E"
      }
    },
    custom: {
      gradient: "linear-gradient(135deg, #FF8A00 0%, #E6338A 100%)",
      gradientSubtle: "linear-gradient(135deg, #FFF4E5 0%, #FEEAF3 100%)",
      gradientSecondary: "linear-gradient(135deg, #B02E8C 0%, #7B1FA2 100%)"
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif"
      ].join(","),
      h1: {
        fontSize: "2.25rem",
        "@media (min-width:600px)": {
          fontSize: "3rem"
        }
      },
      h2: {
        fontSize: "1.875rem",
        "@media (min-width:600px)": {
          fontSize: "2.5rem"
        }
      },
      h3: {
        fontSize: "1.5rem",
        "@media (min-width:600px)": {
          fontSize: "2rem"
        }
      },
      h4: {
        fontSize: "1.25rem",
        "@media (min-width:600px)": {
          fontSize: "1.75rem"
        }
      },
      h5: {
        fontSize: "1.2rem",
        "@media (min-width:600px)": {
          fontSize: "1.5rem"
        }
      },
      h6: {
        fontSize: "1rem",
        "@media (min-width:600px)": {
          fontSize: "1.25rem"
        }
      },
      subtitle1: {
        fontSize: "0.95rem",
        "@media (min-width:600px)": {
          fontSize: "1rem"
        }
      },
      body1: {
        fontSize: "0.875rem",
        "@media (min-width:600px)": {
          fontSize: "1rem"
        }
      },
      body2: {
        fontSize: "0.75rem",
        "@media (min-width:600px)": {
          fontSize: "0.875rem"
        }
      },
      button: {
        fontSize: "0.875rem",
        "@media (min-width:600px)": {
          fontSize: "1rem"
        }
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "#root": {
            minWidth: "320px",
            background:
              mode === "light"
                ? "linear-gradient(180deg, #FFFFFF 0%, #FDFDFD 100%)"
                : "linear-gradient(180deg, #121212 0%, #1A1A1A 100%)"
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
            transition: "all 0.2s ease-in-out"
          },
          containedPrimary: {
            background: "linear-gradient(135deg, #FF8A00 0%, #FF5C39 100%)",
            boxShadow: "0 2px 10px rgba(255, 138, 0, 0.2)",
            "&:hover": {
              background: "linear-gradient(135deg, #FF9A24 0%, #FF6B4D 100%)",
              boxShadow: "0 4px 15px rgba(255, 92, 57, 0.3)"
            },
            "&.Mui-disabled": {
              background: mode === "light" ? "#E0E0E0" : "#424242",
              color: mode === "light" ? "#9E9E9E" : "#757575",
              boxShadow: "none"
            }
          },
          containedSecondary: {
            background: "linear-gradient(135deg, #B02E8C 0%, #D85AA5 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #D85AA5 0%, #B02E8C 100%)"
            },
            "&.Mui-disabled": {
              background: mode === "light" ? "#E0E0E0" : "#424242",
              color: mode === "light" ? "#9E9E9E" : "#757575",
              boxShadow: "none"
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            fontSize: "0.875rem",
            "@media (min-width:600px)": {
              fontSize: "1rem"
            }
          }
        }
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
            "@media (max-width:600px)": {
              fontSize: "0.75rem",
              minWidth: 26,
              height: 26,
              margin: "0 1px",
              padding: "0 4px"
            }
          }
        }
      }
    }
  });

  return responsiveFontSizes(baseTheme);
};
