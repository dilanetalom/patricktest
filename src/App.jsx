import Contact from "./pages/Contact";
import Portfolio from "./pages/Porfolio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path="/" element={<Portfolio/>} />
      <Route path="/contact" element={<Contact/>} />
    </Routes>
   </Router>
   </>
  );
}

export default App;
