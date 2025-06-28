import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // or 'dark' for a dark theme
    primary: { main: "#10b981" }, // emerald
    secondary: { main: "#6366f1" }, // indigo
    background: { default: "#f9fafb", paper: "#fff" },
  },
  shape: { borderRadius: 12 },
});

export default theme;
