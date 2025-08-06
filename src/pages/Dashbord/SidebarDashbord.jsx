// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ setActiveView, activeView }) => {
  const navItems = [
    { name: 'All Services', view: 'all-services' },
    { name: 'Pending', view: 'pending' },
    { name: 'In Progress', view: 'in-progress' },
    { name: 'Completed', view: 'completed' },
    { name: 'Profile Settings', view: 'profile-settings' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-4 h-screen">
      <div className="text-2xl font-bold mb-8">Dashboard</div>
      <ul>
        {navItems.map(item => (
          <li key={item.view} className="mb-2">
            <button
              onClick={() => setActiveView(item.view)}
              className={`block w-full text-left p-2 rounded-md transition-colors duration-200 ${
                activeView === item.view ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;