// src/components/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ service, onClick }) => {
  return (
    <div
    onClick={onClick}
    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl hover:border-blue-500 transition-all duration-300 cursor-pointer group"
  >
    {/* En-tête colorée */}
    <div className="px-6 py-4 bg-gray-400">
      <h3 className="text-lg sm:text-xl font-bold text-white">
        {service.name}
      </h3>
    </div>
  
    {/* Contenu */}
    <div className="px-6 py-5 space-y-2 flex flex-col gap-3">
      <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
        Cliquez pour soumettre un projet de{" "}
        <span className="font-medium">{service.name.toLowerCase()}</span>.
      </p>
      <button className='flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200'>Obtenir un devis gratuitement</button>
    </div>
  </div>
  );
};

export default ServiceCard;