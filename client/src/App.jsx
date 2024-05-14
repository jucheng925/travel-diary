import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UserProvider } from "../context/UserContext"
import Navbar from "../components/Navbar"
import Home from "../components/Home"
import Logout from "../components/Logout"
import Signup from "../components/Signup"
import CheckSession from "../components/CheckSession"
import Profile from "../components/Profile"
import TripPage from "../components/TripPage"
import AllPosts from "../components/AllPosts"
import TripAddForm from "../components/TripAddForm"
import OfferForm from "../components/OfferForm"
import { ThemeProvider } from "@mui/material"
import { myTheme } from "./styled/theme"
import "./styled/app.css"



function App() {

  return (
    <Router>
      <UserProvider>
        <ThemeProvider theme={myTheme}>
          <CheckSession/>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/profile/edit" element={<Profile/>}/>
            <Route path ="/trips/:id" element ={<TripPage/>} />
            <Route path = "/trips/add" element={<TripAddForm/>} />
            <Route path ="/trips/request" element={<OfferForm/>}/>
            <Route path ="/all" element={<AllPosts/>} />
            <Route path="/logout" element = {<Logout />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </ThemeProvider>
      </UserProvider>
    </Router>
  )
}

export default App
