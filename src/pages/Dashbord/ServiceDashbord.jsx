// src/components/AllServices.jsx
import React from 'react';
import ServiceCard from './ServiceCard';

const AllServices = ({ services, onServiceSelect }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Tous les services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard key={service.name} service={service} onClick={() => onServiceSelect(service)} />
        ))}
      </div>
    </div>
  );
};

export default AllServices;