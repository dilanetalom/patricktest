// src/components/Pending.jsx
import React from 'react';

const Pending = ({ projects }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Projets en attente</h2>
      {projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map(project => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h3 className="text-xl font-semibold">{project.projectName}</h3>
              <p className="text-gray-600 mt-1">Service: {project.serviceName}</p>
              <p className="text-gray-500 mt-2">Statut: En attente</p>
              <p className="text-gray-500 text-sm mt-1">
                Soumis le: {new Date(project.id).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Vous n'avez aucun projet en attente.</p>
      )}
    </div>
  );
};

export default Pending;