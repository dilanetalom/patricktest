// src/components/PrivateRoute.jsx

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ requiredRole }) => {
  const { user } = useSelector((state) => state.auth);

  // Vérifie si l'utilisateur est authentifié.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si un rôle spécifique est requis et que le rôle de l'utilisateur ne correspond pas, on redirige.
  // Note: La vérification user?.user?.role n'est plus nécessaire après la correction du slice.
  const userRole = user.role;

  if (requiredRole && userRole !== requiredRole) {
    console.log(`Accès refusé. Rôle de l'utilisateur: ${userRole}, Rôle requis: ${requiredRole}`);

    // Redirige en fonction du rôle de l'utilisateur.
    if (userRole === "admin") {
      return <Navigate to="/bord" replace />;
    } else if (userRole === "client") {
      return <Navigate to="/bords" replace />;
    } else {
      // Cas par défaut pour un rôle inconnu ou non autorisé.
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Si l'utilisateur est authentifié et le rôle est correct, on affiche le contenu de la route.
  return <Outlet />;
};

export default PrivateRoute;
