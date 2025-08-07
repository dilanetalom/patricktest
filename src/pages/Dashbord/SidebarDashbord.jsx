// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ setActiveView, activeView }) => {
  const navItems = [
    { name: 'Tous les Services', view: 'all-services' },
    { name: 'En attente', view: 'pending' },
    { name: 'En cours', view: 'in-progress' },
    { name: 'Terminé', view: 'completed' },
    { name: 'Paramètres du Profil', view: 'profile-settings' },
  ];

  return (
    <aside className="w-[19%] h-[100vh]  fixed bg-gray-900 text-gray-200 flex flex-col p-6 shadow-2xl">
      <div className="text-3xl font-extrabold text-white mb-10 tracking-wide">
        Dashboard
      </div>
      <nav className="flex-grow">
        <ul className="space-y-4">
          {navItems.map(item => (
            <li key={item.view}>
              <button
                onClick={() => setActiveView(item.view)}
                className={`flex items-center w-full text-left p-3 rounded-xl transition-all duration-300 transform
                  ${activeView === item.view 
                    ? 'bg-gray-700 text-white shadow-lg scale-105' 
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                {/* Icône optionnelle, à insérer ici */}
                <span className="ml-3 text-lg font-medium">
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Tu peux ajouter d'autres éléments ici, comme une section utilisateur ou de déconnexion */}
      <div className="mt-8">
        <button 
          onClick={() => console.log('Déconnexion')} 
          className="flex items-center w-full text-left p-3 rounded-xl text-gray-400  hover:bg-gray-700 hover:text-red-300 transition-colors duration-300"
        >
          {/* Icône de déconnexion */}
          <span className="ml-3 font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;