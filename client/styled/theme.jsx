import { createTheme } from "@mui/material";

export const myTheme = createTheme({
    palette:{
        primary:{
          main: "#0d5c63",
        },
        secondary:{
          main: '#97EAD2',
        },
        otherColor:{
          main:"#3A2449"
          //purple
        },
        error: {
          main: "#6d213c"
          //magenta
        },
        success: {
          main: "#ffc09f"
          //peach
        }
      }
    })