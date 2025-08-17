// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'; // Assure-toi d'avoir installé @heroicons/react

const NavDash = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

   // Premier useEffect pour charger les données du localStorage
   useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    // const storedToken = localStorage.getItem('token');

    if (storedUser) { 
      setUser(JSON.parse(storedUser));
    }
    
    // if (storedToken) {
    //   setToken(storedToken);
    // }
  }, []); 




  return (
    <nav className="bg-white w-full p-4 flex justify-between items-center sticky top-0 z-40 shadow-lg">
      <div className="text-2xl  text-gray-900 tracking-wide">
      <span className='font-semibold text-lg'>       Bonjour,  </span>
   
        <span className=' text-lg'>  {user?user.firstName:null} </span>!
        <p className=' text-lg'>De quoi avez vous besoin ?</p>
      </div>
      
      <div className="flex items-center space-x-6">
        {/* Bouton de notifications */}
        <button className="relative text-gray-500 hover:text-gray-900 transition-colors duration-200">
          <BellIcon className="h-7 w-7" />
          {/* Badge de notification, si tu en as besoin */}
          {/* <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span> */}
        </button>

        {/* Espace pour l'avatar ou le nom de l'utilisateur */}
        <div className="flex items-center space-x-3">
          <UserCircleIcon className="h-10 w-10 text-gray-400" />
          <div className="text-gray-800 ">
            {/* {user} */}
           <span className='font-semibold text-lg'>  {user?user.firstName:null} </span>
            <p className='text-md'>{user?user.role:null} </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavDash;