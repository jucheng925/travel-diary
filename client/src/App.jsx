import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UserProvider } from "../context/UserContext"
import Navbar from "../components/Navbar"
import Home from "../components/Home"
import Test from "../components/Test"
import Logout from "../components/Logout"
import CheckSession from "../components/CheckSession"


function App() {

  return (
    <Router>
      <UserProvider>
        <CheckSession/>
        <Navbar />
        <Routes>

          <Route path="/test" element={<Test/>} />
          <Route path="/logout" element = {<Logout />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
