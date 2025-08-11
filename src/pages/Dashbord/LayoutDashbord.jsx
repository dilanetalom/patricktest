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

function LayoutDashbord({children}) {
  const [activeView, setActiveView] = useState('all-services');

  const [userRole, setUserRole] = useState(null); // 'admin' ou 'client'

  useEffect(() => {
    // Récupérer le rôle de l'utilisateur depuis le localStorage
    // Simuler le stockage, vous devriez le remplacer par votre propre logique
    const role = localStorage.getItem('user'); 
    // Si le rôle n'est pas trouvé, on attribue par défaut 'client'
    setUserRole(role || 'client');
  }, []);


  




  return (
    <div className="w-full flex min-h-[100vh] bg-gray-100">
      <div className='w-[19%]'>
      <Sidebar setActiveView={setActiveView} activeView={activeView} />
      </div>
      <div className="w-[81%]  flex flex-col">
        <NavDash/>
        <main className='flex-1 p-8 overflow-y-auto'>
        {children}
        </main>
        
      </div>
    </div>
  );
}

export default LayoutDashbord;