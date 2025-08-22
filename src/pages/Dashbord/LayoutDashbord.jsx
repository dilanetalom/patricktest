// src/App.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from './SidebarDashbord';
import AllServices from './ServiceDashbord';
import Pending from './Pending';
import Completed from './Completed';
import Profile from './Profile';
import ProjectModal from './ProjetModal';
import NavDash from './NavDash';
import { services } from './Service';
import InProgress from './InProgress';
import User from './gestion/User';
import ProgressBar from './client/ProgressBar';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function LayoutDashbord({ children }) {
  const [activeView, setActiveView] = useState('all-services');

  const [userRole, setUserRole] = useState(null); // 'admin' ou 'client'

  useEffect(() => {
    // Récupérer le rôle de l'utilisateur depuis le localStorage
    // Simuler le stockage, vous devriez le remplacer par votre propre logique
    const role = localStorage.getItem('user');
    // Si le rôle n'est pas trouvé, on attribue par défaut 'client'
    setUserRole(role || 'client');
  }, []);

  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return null;
  }
  const stepsRoutes = {
    '/dashbord': 1,
    '/pending': 2,
    '/contrat': 3,
    '/paiment': 4,
    '/in-progress': 5,
    '/completed': 6,
  };
  //   const currentProjectStatus = user?.user?.projectStatus || 1; 


  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Mettez à jour l'étape en fonction de la route actuelle
    const path = location.pathname;
    const newStep = stepsRoutes[path] || 1; // Si la route n'est pas trouvée, par défaut à 1
    setCurrentStep(newStep);
  }, [location]);



  return (
    <div className="w-full flex min-h-[100vh] bg-gray-100">
      <div className='w-[19%]'>
        <Sidebar setActiveView={setActiveView} activeView={activeView} />
      </div>
      <div className="w-[81%]  flex flex-col">
        <NavDash />
        <main className='flex-1 p-8 overflow-y-auto'>
          {user?.role === 'client' && (
            <div className='w-full '>
              <ProgressBar currentStep={currentStep} />
            </div>
          )}
          {children}
        </main>

      </div>
    </div>
  );
}

export default LayoutDashbord;