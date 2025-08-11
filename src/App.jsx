import Apropos from "./pages/Apropos";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Porfolio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/AuthPage";
import LayoutDashbord from "./pages/Dashbord/LayoutDashbord";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
// import { useDispatch } from 'react-redux';

import { ToastContainer } from "react-toastify";
import Pending from "./pages/Dashbord/Pending";
import InProgress from "./pages/Dashbord/InProgress";
import Completed from "./pages/Dashbord/Completed";
import Profile from "./pages/Dashbord/Profile";
import AllServices from "./pages/Dashbord/ServiceDashbord";
import User from "./pages/Dashbord/gestion/User";
import { useEffect, useState } from "react";

function App() {

  const [user, setUser] = useState({})

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('user'));
   if (users) {
    setUser(users)
   }

  }, []);

  return (
    <>
      <Toaster />
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<Apropos />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            {user.role === "admin" ?
              <>
                <Route path="/dashbord" element={<AllServices />} />
                <Route path="/pending" element={<Pending />} />
                <Route path="/in-progress" element={<InProgress />} />
                <Route path="/completed" element={<Completed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/user" element={<User />} />
              </> :
              <>
                <Route path="/dashbord" element={<AllServices />} />
                <Route path="/pending" element={<Pending />} />
                <Route path="/in-progress" element={<InProgress />} />
                <Route path="/completed" element={<Completed />} />
                <Route path="/profile" element={<Profile />} />
                {/* <Route path="/user" element={<User />} /> */}
                </>

            }

          </Route>


        </Routes>
      </Router>
    </>
  );
}

export default App;
