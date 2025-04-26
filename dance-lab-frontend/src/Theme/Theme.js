import { createTheme } from "@mui/material/styles";

const lightTheme = {
    palette: {
        mode: "light",
        primary: {
            main: "#ff4081", // Vibrant pink
        },
        secondary: {
            main: "#f50057", // Deeper pink
        },
        background: {
            default: "#f5f5f5", // Light gray
            paper: "#ffffff",
        },
        text: {
            primary: "#333333",
        },
    },
};

const darkTheme = {
    palette: {
        mode: "dark",
        primary: {
            main: "#ff80ab", // Lighter pink for dark mode
        },
        secondary: {
            main: "#ff8a80", // Coral for dark mode
        },
        background: {
            default: "#212121", // Dark gray
            paper: "#424242",
        },
        text: {
            primary: "#ffffff",
        },
    },
};

const getTheme = (mode) =>
    createTheme({
        palette: mode === "light" ? lightTheme.palette : darkTheme.palette,
        typography: {
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            h4: {
                fontWeight: 700,
            },
            h6: {
                fontWeight: 600,
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        textTransform: "none",
                        padding: "8px 16px",
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                },
            },
        },
    });

export default getTheme;