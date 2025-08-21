// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { BellIcon, UserCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'; // Ajout de ChatBubbleLeftRightIcon
import ProfileDropdown from './ProfileDropdown';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate pour la redirection

const NavDash = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Premier useEffect pour charger les données du localStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); 

  // Fonction pour gérer la redirection vers la messagerie
  const handleChatClick = () => {
    if (user && user.role) {
      if (user.role === 'admin') {
        navigate('/admin/messages'); // Redirection vers le tableau de bord des messages de l'administrateur
      } else if (user.role === 'client') {
        navigate('/client/messages'); // Redirection vers le tableau de bord des messages du client
      }
    }
  };

  return (
    <nav className="bg-white w-full p-4 flex justify-between items-center sticky top-0 z-40 shadow-lg">
      <div className="text-2xl text-gray-900 tracking-wide">
        <span className='font-semibold text-lg'>Bonjour, </span>
        <span className=' text-lg'>{user ? user.firstName : null} </span>!
        <p className=' text-lg'>De quoi avez vous besoin ?</p>
      </div>
      
      <div className="flex items-center space-x-6">
        {/* Bouton de messagerie */}
        <button
          onClick={handleChatClick}
          className="relative text-gray-500 hover:text-gray-900 transition-colors duration-200"
        >
          <ChatBubbleLeftRightIcon className="h-7 w-7" />
          {/* Badge pour les messages non lus (à implémenter) */}
          {/* <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-blue-500"></span> */}
        </button>

        {/* Bouton de notifications */}
        <button className="relative text-gray-500 hover:text-gray-900 transition-colors duration-200">
          <BellIcon className="h-7 w-7" />
          {/* Badge de notification, si tu en as besoin */}
          {/* <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span> */}
        </button>

        {/* Espace pour l'avatar ou le nom de l'utilisateur */}
        <div className="flex items-center space-x-3">
          <ProfileDropdown />
          <div className="text-gray-800 ">
            <span className='font-semibold text-lg'> {user ? user.firstName : null} </span>
            <p className='text-md'>{user ? user.role : null} </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavDash;
