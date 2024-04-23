import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UserProvider } from "../context/UserContext"
import Navbar from "../components/Navbar"
import Home from "../components/Home"
import Test from "../components/Test"


function App() {

  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test/>} />
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
