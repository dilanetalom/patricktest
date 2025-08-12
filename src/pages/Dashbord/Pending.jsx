// src/components/Pending.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LayoutDashbord from './LayoutDashbord';
import { fetchProjects } from '../../store/projectsSlice';

const Pending = () => {
  const dispatch = useDispatch();
  // On récupère la liste des projets, l'état de chargement et l'erreur depuis le store
  const { projects, status, error } = useSelector((state) => state.projects);
 
  // Correction ici : On vérifie que 'projects' est bien un tableau avant de le filtrer.
  const pendingProjects = Array.isArray(projects) ? projects.filter(project => project.status === 'pending') : [];

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (status === 'idle' && token) {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  const isLoading = status === 'loading';

  return (
    <>
      <LayoutDashbord>
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Projets en attente</h2>
    <div className=' '>
      {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <svg className="animate-spin h-8 w-8 text-blue-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            pendingProjects.length > 0 ? (
              <div className=" w-full grid grid-cols-3 gap-5 ">
                {pendingProjects.map(project => (
                  <div key={project.id} className="bg-white  p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <p className="text-gray-600 mt-1">Service: {project.service}</p>
                    <p className="text-gray-500 mt-2">Statut:encours</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Soumis le: {new Date(project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Vous n'avez aucun projet en attente.</p>
            )
          )}
</div>
          {status === 'failed' && <p className="text-red-500 mt-4">Erreur: {error}</p>}
        </div>
      </LayoutDashbord>
    </>
  );
};

export default Pending;