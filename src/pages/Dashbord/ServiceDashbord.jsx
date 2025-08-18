// src/components/AllServices.jsx
import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import LayoutDashbord from './LayoutDashbord';
import { services } from './Service';
import ProjectModal from './ProjetModal';

const AllServices = ( ) => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };


  const addProject = (project) => {
    setProjects(prevProjects => [
      ...prevProjects,
      { ...project, id: Date.now(), status: 'pending', serviceName: selectedService.name }
    ]);
    setIsModalOpen(false);
    setActiveView('pending');
  };


  return (
   <>
   <LayoutDashbord>
   {isModalOpen && <ProjectModal service={selectedService}  onClose={() => setIsModalOpen(false)} onSubmit={addProject} />}

   <div className='p-6 bg-gray-50' >
      <h2 className="text-3xl  mb-6 text-gray-800">Tous les services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard key={service.name} service={service} onClick={() => handleServiceSelect(service)} />
        ))}
      </div>
    </div>
   </LayoutDashbord>
   </>
  );
};

export default AllServices;