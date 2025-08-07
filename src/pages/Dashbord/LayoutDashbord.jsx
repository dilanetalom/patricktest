// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './SidebarDashbord';
import AllServices from './ServiceDashbord';
import Pending from './Pending';
import Completed from './Completed';
import Profile from './Profile';
import ProjectModal from './ProjetModal';
import NavDash from './NavDash';
import { services } from './Service';
import InProgress from './InProgress';

function LayoutDashbord() {
  const [activeView, setActiveView] = useState('all-services');
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [currentUser, setCurrentUser] = useState({name:"Dilane"});

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

  const renderContent = () => {
    switch (activeView) {
      case 'all-services':
        return <AllServices services={services} onServiceSelect={handleServiceSelect} />;
      case 'pending':
        return <Pending projects={projects.filter(p => p.status === 'pending')} />;
      case 'in-progress':
        return <InProgress projects={projects.filter(p => p.status === 'in-progress')} />;
      case 'completed':
        return <Completed projects={projects.filter(p => p.status === 'completed')} />;
      case 'profile-settings':
        return <Profile />;
      default:
        return <AllServices services={services} onServiceSelect={handleServiceSelect} />;
    }
  };

  return (
    <div className="w-full flex min-h-[100vh] bg-gray-100">
      <div className='w-[19%]'>
      <Sidebar setActiveView={setActiveView} activeView={activeView} />
      </div>
      <div className="w-[81%]  flex flex-col">
        <NavDash username={currentUser.name}/>
        <main className='flex-1 p-8 overflow-y-auto'>
        {renderContent()}
        </main>
        
      </div>
      {isModalOpen && <ProjectModal service={selectedService} onClose={() => setIsModalOpen(false)} onSubmit={addProject} />}
    </div>
  );
}

export default LayoutDashbord;