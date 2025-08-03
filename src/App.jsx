import Portfolio from "./pages/Porfolio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path="/" element={<Portfolio/>} />
    </Routes>
   </Router>
   </>
  );
}

export default App;
