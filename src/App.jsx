import Apropos from "./pages/Apropos";
import AuthPage from "./pages/AuthPage";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Porfolio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/AuthPage";

function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path="/" element={<Portfolio/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/about" element={<Apropos/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
   </Router>
   </>
  );
}

export default App;
