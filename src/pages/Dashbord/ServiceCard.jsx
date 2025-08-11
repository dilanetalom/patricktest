// src/components/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ service, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6  transform transition-transform duration-200 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
      <p className="text-gray-600">
        Cliquez pour soumettre un projet de {service.name.toLowerCase()}.
      </p>
    </div>
  );
};

export default ServiceCard;