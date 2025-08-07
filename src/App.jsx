import Apropos from "./pages/Apropos";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Porfolio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/AuthPage";
import LayoutDashbord from "./pages/Dashbord/LayoutDashbord";
import { Toaster } from "react-hot-toast";

function App() {
  return (
   <>
   <Toaster />
   <Router>
    <Routes>
      <Route path="/" element={<Portfolio/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/about" element={<Apropos/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashbord" element={<LayoutDashbord />} />
    </Routes>
   </Router>
   </>
  );
}

export default App;
