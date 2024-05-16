import { Button, Typography, styled } from "@mui/material";


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

const SecondButton = styled(Button)(({theme}) => ({
  color: '#F1EDF5',
  backgroundColor: "#3A2449",
  '&:hover': {
    backgroundColor: '#774995',
  },
  fontWeight: 800,
  fontSize: 'medium',
  textTransform: 'capitalize',
  margin: "5px 10px"
}));

const StyledFont = styled(Typography) ({
  color: '#6d213c',
  fontWeight: '400',
  margin: '0 10px'
})

export {ColorButton, StyledFont, SecondButton}