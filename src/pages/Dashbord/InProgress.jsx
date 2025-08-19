import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import 'moment/locale/fr';
import { fetchProjects } from '../../store/projectsSlice';
import LayoutDashbord from './LayoutDashbord';
import ProjectUpdatesModal from './client/ProjectUpdatesModal.Client';


Modal.setAppElement('#root');
moment.locale('fr');

const InProgress = () => {
    const dispatch = useDispatch();
    const { projects, status, error } = useSelector(state => state.projects);
    const userId = 1; // Remplacer par la logique de récupération de l'ID utilisateur authentifié

    const [updatesModalIsOpen, setUpdatesModalIsOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    // Filtre les projets pour l'utilisateur actuel et dont le statut est "payment_verified" ou "in_progress"
    const userProjects = projects.filter(project =>
        (project.status === 'payment_verified' || project.status ==='in_progress' )
    );

    // Récupère tous les projets au chargement du composant
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProjects());
        }
    }, [dispatch, status]);

    const openUpdatesModal = (project) => {
        setSelectedProject(project);
        setUpdatesModalIsOpen(true);
    };

    const closeUpdatesModal = () => {
        setSelectedProject(null);
        setUpdatesModalIsOpen(false);
    };

    if (status === 'loading') {
        return <LayoutDashbord><div className="p-8 text-center text-gray-500">Chargement de vos projets...</div></LayoutDashbord>;
    }

    if (error) {
        return <LayoutDashbord><div className="p-8 text-center text-red-500">Erreur lors du chargement de vos projets : {error.message}</div></LayoutDashbord>;
    }

    return (
        <LayoutDashbord>
            <div className="p-8 bg-gray-50 min-h-screen">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Suivi de vos projets en cours</h2>
                {userProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userProjects.map(project => (
                            <div
                                key={project.id}
                                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-lg hover:transform hover:-translate-y-1"
                            >
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{project.name}</h3>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Statut :</span>
                                    <span className="py-1 px-2 rounded-full inline-block text-sm font-semibold ml-2 bg-blue-100 text-blue-800">
                                        En cours d'exécution
                                    </span>
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Progression :</span>
                                    <span className="text-lg font-bold text-blue-600 ml-2">{project.updates[0]?.progress_percentage || 0}%</span>
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                                        style={{ width: `${project.updates[0]?.progress_percentage || 0}%` }}
                                    ></div>
                                </div>
                                <p className="text-gray-500 text-sm mt-4 italic">
                                    Dernière mise à jour : {moment(project.updated_at).fromNow()}
                                </p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Empêcher l'ouverture de la modale parent
                                        openUpdatesModal(project);
                                    }}
                                    className="text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-3 rounded-lg transition-colors duration-200 block w-full"
                                >
                                    Les dernières mises à jour
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center text-lg mt-10">
                        Vous n'avez aucun projet en cours d'exécution.
                    </p>
                )}
            </div>

            {/* Modale des mises à jour, qui s'ouvre au clic sur le bouton */}
            <ProjectUpdatesModal
                isOpen={updatesModalIsOpen}
                onClose={closeUpdatesModal}
                project={selectedProject}
            />
        </LayoutDashbord>
    );
};

export default InProgress;
