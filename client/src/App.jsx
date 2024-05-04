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


function App() {

  return (
    <Router>
      <UserProvider>
        <CheckSession/>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile/edit" element={<Profile/>}/>
          <Route path ="/trips/:id" element ={<TripPage/>} />
          {/* <Route path = "/trips/add" element={<TripAddForm/>} /> */}
          <Route path ="/all" element={<AllPosts/>} />
          <Route path="/logout" element = {<Logout />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
