// src/pages/AcceptedProjects.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../../store/projectsSlice';
import LayoutDashbord from './LayoutDashbord';

const AcceptedProjects = () => {
    const dispatch = useDispatch();
    const { projects, status, error } = useSelector((state) => state.projects);
    const { user } = useSelector((state) => state.auth);

    const acceptedProjects = Array.isArray(projects)
        ? projects.filter(project => project.status === 'accepted')
        : [];

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProjects());
        }
    }, [dispatch, status]);

    return (
        <LayoutDashbord>
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Projets acceptés (prêts à signer)</h2>

                {status === 'loading' && <p>Chargement des projets...</p>}
                {error && <p className="text-red-500">Erreur : {error.message || "Erreur de chargement"}</p>}

                {acceptedProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {acceptedProjects.map(project => (
                            <div
                                key={project.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                            >
                                {/* En-tête */}
                                <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
                                    <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                                        {project.name}
                                    </h3>
                                </div>

                                {/* Contenu */}
                                <div className="px-6 py-5 space-y-3">
                                    <p className="text-gray-700">
                                        <span className="font-medium">Statut :</span>{" "}
                                        <span className="font-bold text-blue-600">✔ Accepté</span>
                                    </p>
                                </div>

                                {/* Bouton */}
                                <div className="px-6 py-4 bg-gray-50">
                                    <Link
                                        to={`/signe/${project.id}`}
                                        className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200 shadow-sm"
                                    >
                                        📄 Voir le contrat
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Aucun projet n'a encore été accepté.</p>
                )}
            </div>
        </LayoutDashbord>
    );
};

export default AcceptedProjects;