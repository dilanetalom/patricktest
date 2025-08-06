// src/components/Navbar.jsx
import React from 'react';

const NavDash = ({ username }) => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-40">
      <div className="text-xl font-bold text-gray-800">
        Welcome back, {username}!
      </div>
      <div className="flex items-center space-x-4">
        {/*
          Tu peux ajouter ici d'autres éléments, comme une icône de notifications.
        */}
        <div className="text-gray-700 font-semibold">
          {username}
        </div>
        <button
          onClick={() => alert("Aller aux paramètres du profil")}
          className="bg-indigo-600 text-white px-4 py-4 rounded-full hover:bg-indigo-700 transition-colors"
        >
          
        </button>
      </div>
    </div>
  );
};

export default NavDash;