import Apropos from "./pages/Apropos";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Porfolio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/AuthPage";
import LayoutDashbord from "./pages/Dashbord/LayoutDashbord";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { loginFromStorage } from "./store/authSlice";

function App() {

  const dispatch = useDispatch();

  // useEffect(() => {

  //   const user = JSON.parse(localStorage.getItem('user'));
  //   const token = localStorage.getItem('token');

  //   if (user && token) {
  //     dispatch(loginFromStorage({ user, token }));
  //   }
  // }, [dispatch]);

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
