import { Button, styled } from "@mui/material";
import { purple } from "@mui/material/colors";

// const StyledButton= styled(Button) ({
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "10px"
//   })

const ColorButton = styled(Button)(({theme}) => ({
    color: '#3A2449',
    backgroundColor: "#97EAD2",
    '&:hover': {
      backgroundColor: '#177158',
    },
    fontWeight: 800,
    fontSize: 'medium',
    textTransform: 'capitalize'
}));

export {ColorButton}