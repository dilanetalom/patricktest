import Apropos from "./pages/Apropos";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Porfolio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/AuthPage";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PrivateRoute from "./components/PrivateRoute";
import Pending from "./pages/Dashbord/Pending";
import InProgress from "./pages/Dashbord/InProgress";
import Completed from "./pages/Dashbord/Completed";
import Profile from "./pages/Dashbord/Profile";
import AllServices from "./pages/Dashbord/ServiceDashbord";
import User from "./pages/Dashbord/gestion/User";
import Notifications from "./pages/Dashbord/Notifications";
import Bord from "./pages/Dashbord/Bord";

import { getProfile } from "./store/authSlice";
import AcceptedProjects from "./pages/Dashbord/AcceptedProjects";
import ContractSignaturePage from "./pages/Dashbord/client/ContractSignaturePage";
import Bords from "./pages/Dashbord/Bords";
import PaymentPage from "./pages/Dashbord/client/PaymentPage";
import Commande from "./pages/Dashbord/admin/Commande";
import AdminPaymentVerification from "./pages/Dashbord/admin/AdminPaymentVerification";
import ProgressPage from "./pages/Dashbord/admin/ProgressPage";
import Customer from "./pages/Dashbord/admin/Customer";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getProfile()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <ToastContainer />
      <Notifications />
      <Router>
        <Routes>
          {/* Pages publiques */}
          <Route path="/" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<Apropos />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Routes protégées pour tous les utilisateurs */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashbord" element={<AllServices />} />
            <Route path="/pending" element={<Pending />} />
            <Route path="/in-progress" element={<InProgress />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contrat" element={<AcceptedProjects />} />
            <Route path="/signe/:projectId" element={<ContractSignaturePage />} />
          </Route>
          <Route path="*" element={<h1>Page not found</h1>} />
          {/* Routes protégées uniquement pour les admins */}
          <Route element={<PrivateRoute role="admin" />}>
            <Route path="/user" element={<User />} />
            <Route path="/bord" element={<Bord />} />
          <Route path="/verify" element={<AdminPaymentVerification/>} />
          <Route path="/ProgressPage" element={<ProgressPage/>} />
          <Route path="/Customer" element={<Customer/>} />

          </Route>
          <Route element={<PrivateRoute role="client" />}>
          <Route path="/bords" element={<Bords />} />
          <Route path="/paiment" element={<PaymentPage />} />
          <Route path="/commande" element={<Commande/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
