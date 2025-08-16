// src/components/Pending.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutDashbord from './LayoutDashbord';
import ChatBox from './ChatBox';
import Modal from './Modal';
import { fetchProjects, acceptProposal, refuseAndNegotiate } from '../../store/projectsSlice';
import ProjectDetailsModal from './ProjectDetailsModal';

const Pending = () => {
    const dispatch = useDispatch();
    const { projects = [], status, error } = useSelector((state) => state.projects);
    const { user } = useSelector((state) => state.auth);

    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    // S'assure que l'utilisateur est chargé
    if (!user) {
        return (
            <LayoutDashbord>
                <div className="text-gray-700 text-lg">Chargement de l’utilisateur...</div>
            </LayoutDashbord>
        );
    }

    const isAdmin = user?.user?.role === 'admin';

    // Filtre les projets en attente ou en négociation
    const pendingProjects = Array.isArray(projects)
        ? projects.filter((project) =>
            (project.status === 'pending' || project.status === 'negotiation') &&
            (isAdmin || project.user_id == user?.user?.id)
        )
        : [];


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = pendingProjects.slice(indexOfFirstItem, indexOfLastItem);

    // Nombre total de pages
    const totalPages = Math.ceil(pendingProjects.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        // On récupère les projets uniquement si le token existe
        const token = sessionStorage.getItem('token');
        if (token) {
            dispatch(fetchProjects());
        } else {
            console.warn('Aucun token trouvé, impossible de récupérer les projets');
        }
    }, [dispatch]);

    const handleAccept = (projectId) => {
        dispatch(acceptProposal(projectId));
    };

    const handleNegotiate = (projectId) => {
        dispatch(refuseAndNegotiate(projectId))
            .unwrap()
            .then(() => {
                setSelectedProjectId(projectId);
                setIsChatModalOpen(true);
            })
            .catch((err) => {
                console.error('Impossible de démarrer la négociation:', err);
            });
    };



    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
  
    const handleOpenDetails = (project) => {
      setSelectedProject(project);
      setShowDetailsModal(true);
    };
  
    const handleCloseDetails = () => {
      setShowDetailsModal(false);
      setSelectedProject(null);
    };

    const isLoading = status === 'loading';

    return (
        <LayoutDashbord>
            <div>
                <h2 className="text-4xl font-bold mb-10 text-gray-800">Projets en attente</h2>

                {isLoading && (
                    <div className="flex justify-center items-center h-[400px]">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
                    </div>
                )}

                {!isLoading && error && (
                    <p className="text-red-500 mt-4">
                        Erreur: {typeof error === 'string' ? error : error?.message || JSON.stringify(error)}
                    </p>
                )}

                {!isLoading && pendingProjects.length > 0 ? (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {currentProjects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                            >
                                {/* En-tête avec le nom du projet */}
                                <div className="px-6 py-4 bg-blue-950">
                                    <h3 className="text-lg sm:text-xl font-bold text-white">
                                        {project.name}
                                    </h3>
                                </div>

                                {/* Contenu */}
                                <div className="px-6 py-5 space-y-3">
                                    <p className="text-gray-700">
                                        <span className="font-medium">Service :</span> {project.service}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-medium">Montant proposé :</span>{" "}
                                        {project.client_price} {project.device || "€"}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-medium">Date d'échéance :</span>{" "}
                                        {new Date(project.deadline).toLocaleDateString()}
                                    </p>

                                    {isAdmin && (
                                        <p className="text-gray-700">
                                            <span className="font-medium">Soumis par :</span>{" "}
                                            {project.user?.firstName || "Inconnu"}
                                        </p>
                                    )}
                                </div>

                                {/* Boutons */}
                                <div className="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row gap-3">
                                    {isAdmin ? (
                                        <>
                                            {project.status === "pending" && (
                                                <>
                                                    <button
                                                        onClick={() => handleAccept(project.id)}
                                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
                                                    >
                                                        ✅ Accepter
                                                    </button>
                                                    <button
                                                        onClick={() => handleNegotiate(project.id)}
                                                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
                                                    >
                                                        🤝 Négocier
                                                    </button>
                                                </>
                                            )}

                                            {project.status === "negotiation" && (
                                                <div className=' w-full grid grid-cols-2 gap-2'>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedProjectId(project.id);
                                                            setIsChatModalOpen(true);
                                                        }}
                                                        className=" bg-green-400 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200"
                                                    >
                                                        💬 Ouvrir le chat
                                                    </button>

                                                    <button
                                                          onClick={() => handleOpenDetails(project)}
                                                        className="text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200  block"
                                                    >
                                                        🔍 Voir les détails
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {project.status === "pending" && (
                                                <button
                                                onClick={() => handleOpenDetails(project)}
                                                    className="text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200 w-full block"
                                                >
                                                    🔍 Voir les détails
                                                </button>
                                            )}

                                            {project.status === "negotiation" && (
                                                <div className=' w-full grid grid-cols-2 gap-2'>

                                                    <button
                                                        onClick={() => handleOpenDetails(project)}
                                                        className="text-center bg-green-400 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200 w-full block"
                                                    >
                                                        🔍 Voir les détails
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setSelectedProjectId(project.id);
                                                            setIsChatModalOpen(true);
                                                        }}
                                                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200 w-full"
                                                    >
                                                        💬 Ouvrir le chat
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                        ))}
                    </div>
                ) : (
                    !isLoading &&
                    pendingProjects.length === 0 && (
                        <p className="text-gray-500 mt-4">
                            {isAdmin
                                ? "Aucun nouveau projet en attente."
                                : "Vous n'avez aucun projet en attente."}
                        </p>
                    )
                )}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6 gap-2">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg border ${currentPage === 1
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white hover:bg-gray-100"
                                }`}
                        >
                            ⬅ Précédent
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToPage(index + 1)}
                                className={`px-4 py-2 rounded-lg border ${currentPage === index + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-white hover:bg-gray-100"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg border ${currentPage === totalPages
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white hover:bg-gray-100"
                                }`}
                        >
                            Suivant ➡
                        </button>
                    </div>
                )}

                <Modal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)}>
                    <ChatBox projectId={selectedProjectId} />
                </Modal>

                {showDetailsModal && <ProjectDetailsModal project={selectedProject} onClose={handleCloseDetails} />}
            </div>
        </LayoutDashbord>
    );
};

export default Pending;
