// src/components/Pending.jsx (ou le composant parent)
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LayoutDashbord from './LayoutDashbord';
import ChatBox from './ChatBox'; // Composant de chat
import Modal from './Modal'; // Composant de modal
import { fetchProjects, acceptProposal, refuseAndNegotiate } from '../../store/projectsSlice';

const Pending = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projects, status, error } = useSelector((state) => state.projects);
    const { user } = useSelector((state) => state.auth);

    const isAdmin = user && user.role === 'admin';

    // État pour gérer le modal
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const pendingProjects = Array.isArray(projects)
        ? projects.filter(project =>
            (project.status === 'pending' || project.status === 'negotiation') && (isAdmin || project.user_id === user.id)
        )
        : [];

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProjects());
        }
    }, [status, dispatch]);

    const handleAccept = (projectId) => {
        dispatch(acceptProposal(projectId));
    };

    const handleNegotiate = (projectId) => {
        dispatch(refuseAndNegotiate(projectId))
            .unwrap()
            .then(() => {
                // Ouvre le modal de chat après la réussite de la négociation
                setSelectedProjectId(projectId);
                setIsChatModalOpen(true);
            })
            .catch((error) => {
                console.error("Failed to start negotiation:", error);
            });
    };

    const isLoading = status === 'loading';

    if (isLoading) {
        return <LayoutDashbord>
               <div className="flex justify-center items-center h-[400px]">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
                </div>
        </LayoutDashbord>;
    }

    return (
        <LayoutDashbord>
            <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Projets en attente</h2>
                <div className=''>
                    {error && <p className="text-red-500 mt-4">Erreur: {error}</p>}
                    {pendingProjects.length > 0 ? (
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {pendingProjects.map(project => (
                                <div key={project.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                                    <h3 className="text-xl font-semibold">{project.name}</h3>
                                    <p className="text-gray-600 mt-1">Service: {project.service_id}</p>
                                    <p className="text-gray-500 text-sm mt-1">Soumis le: {new Date(project.created_at).toLocaleDateString()}</p>
                                    {isAdmin && <p className="text-gray-500 text-sm mt-1">Soumis par: {project.user?project.user.name:null}</p>}
                                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                        {/* Logique pour les administrateurs */}
                                        {isAdmin && (
                                            <>
                                                {project.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleAccept(project.id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                                                            Accepter
                                                        </button>
                                                        <button onClick={() => handleNegotiate(project.id)} className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                                                            Négocier
                                                        </button>
                                                    </>
                                                )}
                                                {project.status === 'negotiation' && (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedProjectId(project.id);
                                                            setIsChatModalOpen(true);
                                                        }}
                                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                                                    >
                                                        Ouvrir le chat
                                                    </button>
                                                )}
                                            </>
                                        )}

                                        {/* Logique pour les utilisateurs (clients) */}
                                        {!isAdmin && (
                                            <>
                                                {project.status === 'pending' && (
                                                    <Link to={`/projects/${project.id}`} className="text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 w-full block">
                                                        Voir les détails
                                                    </Link>
                                                )}
                                                {project.status === 'negotiation' && (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedProjectId(project.id);
                                                            setIsChatModalOpen(true);
                                                        }}
                                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 w-full"
                                                    >
                                                        Ouvrir le chat
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">{isAdmin ? "Aucun nouveau projet en attente." : "Vous n'avez aucun projet en attente."}</p>
                    )}
                </div>
            </div>

            {/* Le modal de chat */}
            <Modal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)}>
                <ChatBox projectId={selectedProjectId} />
            </Modal>
        </LayoutDashbord>
    );
};

export default Pending;