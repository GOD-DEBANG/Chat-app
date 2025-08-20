
import { Route, Routes } from 'react-router-dom'
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Profilepage from "./pages/Profilepage";
import bgImage from "./assets/bgImage.svg";


const App = () => {
  return (
    <div className= " bg-contain"
      style={{ backgroundImage: `url(${bgImage})` }}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/profile" element={<Profilepage />} />
        

      </Routes>
    </div>
  )
}

export default App 