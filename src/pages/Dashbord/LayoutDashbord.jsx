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

  const { user} = useSelector((state) => state.auth);

  if (!user) {
      return null; 
  }

  // 🚀 Récupérez le statut actuel du projet du client
  // C'est un exemple. En réalité, cette donnée devrait venir de votre backend via Redux ou un hook
  const currentProjectStatus = user?.user?.projectStatus || 1; // Par défaut à 1 si non défini






  return (
    <div className="w-full flex min-h-[100vh] bg-gray-100">
      <div className='w-[19%]'>
        <Sidebar setActiveView={setActiveView} activeView={activeView} />
      </div>
      <div className="w-[81%]  flex flex-col">
        <NavDash />
        <main className='flex-1 p-8 overflow-y-auto'>
          {user?.user?.role === 'client' && (
            <ProgressBar currentStep={currentProjectStatus} />
          )}
          {children}
        </main>

      </div>
    </div>
  );
}

export default LayoutDashbord;