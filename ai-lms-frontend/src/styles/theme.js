import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        mode: "dark",

        background: {
            default: "#0F172A",
            paper: "#1E293B",
        },

        primary: {
            main: "#0056D2",
        },

        success: {
            main: "#34D399",
        },

        warning: {
            main: "#FF69B4",
        },

        error: {
            main: "#C2185B",
        },

        text: {
            primary: "#F8FAFC",
            secondary: "#94A3B8",
        },

        divider: "#334155",

    },

    typography: {

        fontFamily: "Inter",

        h1: { fontWeight: 700 },

        h2: { fontWeight: 700 },

        h3: { fontWeight: 600 },

        h4: { fontWeight: 600 },

        h5: { fontWeight: 600 },

        body1: {

            color: "#94A3B8"

        },

    },

    shape: {

        borderRadius: 12,

    },

});

export default theme;