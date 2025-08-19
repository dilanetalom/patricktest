// src/components/Pending.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutDashbord from './LayoutDashbord';
import ChatBox from './ChatBox';
import Modal from './Modal';
import { fetchProjects, acceptProposal, refuseAndNegotiate } from '../../store/projectsSlice';
import ProjectDetailsModal from './ProjectDetailsModal';
import { usePagination } from './admin/usePagination';

const Pending = () =>{
    const dispatch = useDispatch();
    const { projects = [], status, error } = useSelector((state) => state.projects);
    const { user } = useSelector((state) => state.auth);

    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const isLoading = status === 'loading';

    // Assurez-vous que l'utilisateur est chargé
    if (!user) {
        return (
            <LayoutDashbord>
                <div className="text-gray-700 text-lg">Chargement de l’utilisateur...</div>
            </LayoutDashbord>
        );
    }
    
    // Filtrer uniquement les projets du client
    const clientProjects = Array.isArray(projects)
       ?projects.filter(project => (project.status === 'pending' || project.status === 'negotiation' || project.status === 'accepted') && project.user_id === user?.user?.id)
        : [];
    
    // Utiliser un hook de pagination pour gérer l'état
    const { currentItems, currentPage, totalPages, goToPage } = usePagination(clientProjects, 6);

   useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.warn('Aucun token trouvé, impossible de récupérer les projets');
            return;
        }

        // Fonction pour récupérer les projets
        const fetchAndDispatchProjects = () => {
            dispatch(fetchProjects());
        };

        // Lancer la première requête immédiatement
        fetchAndDispatchProjects();

        // Mettre en place le polling toutes les 5 secondes
        const intervalId = setInterval(fetchAndDispatchProjects, 25000); // 5000ms = 5 secondes

        // Nettoyage de l'intervalle lorsque le composant est démonté ou la dépendance change
        return () => clearInterval(intervalId);

    }, [dispatch]);

    const handleOpenChat = (projectId) => {
        setSelectedProjectId(projectId);
        setIsChatModalOpen(true);
    };

    const handleOpenDetails = (project) => {
        setSelectedProject(project);
        setShowDetailsModal(true);
    };

    const handleCloseDetails = () => {
        setShowDetailsModal(false);
        setSelectedProject(null);
    };

    return (
         <LayoutDashbord>
        <div className='p-6 bg-gray-50'>
            <h2 className="text-4xl font-bold mb-10 text-gray-800">Vos projets en attente</h2>

            {isLoading && clientProjects.length === 0 && (
                <div className="flex justify-center items-center h-[400px]">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
                </div>
            )}
            
            {!isLoading && error && (
                <p className="text-red-500 mt-4">
                    Erreur: {typeof error === 'string' ? error : error?.message || JSON.stringify(error)}
                </p>
            )}

            {!isLoading && clientProjects.length > 0 ? (
                <>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {currentItems.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                                >
                                <div className="px-6 py-4 bg-blue-950">
                                    <h3 className="text-lg sm:text-xl font-bold text-white">
                                        {project.name}
                                    </h3>
                                </div>
                                <div className="px-6 py-5 space-y-3">
                                    <p className="text-gray-700"><span className="font-medium">Service :</span> {project.service}</p>
                                    {project.client_price && (
                                        <p className="text-gray-700"><span className="font-medium">Montant proposé :</span> {project.client_price} {project.device || "€"}</p>
                                    )}
                                    <p className="text-gray-700"><span className="font-medium">Date d'échéance :</span> {new Date(project.deadline).toLocaleDateString()}</p>
                                    <p className="text-gray-700"><span className="font-medium">Statut :</span> <span className="capitalize">{project.status.replace(/_/g, ' ') === "pending"?"en attente de validation":"en négociation"}</span></p>

                                    {/** NOUVEAU CODE : Affichage dynamique selon le statut **/}
                                    {project.status === "pending" && (
                                        <div className="mt-4 p-4 rounded-lg bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800">
                                            <h4 className="font-semibold text-sm mb-1">Récapitulatif de la commande : </h4>
                                            <p className="text-sm">
                                                <span className="font-medium">Votre commande est en attente de validation.</span>
                                            </p>
                                        </div>
                                    )}

                                    {project.status === "accepted" && (
                                        <div className="mt-4 p-4 rounded-lg bg-green-50 border-l-4 border-green-500 text-green-800">
                                            <h4 className="font-semibold text-sm mb-1">Félicitations ! 🎉</h4>
                                            <p className="text-sm">
                                                Votre projet a été validé par l'administrateur.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="px-6 py-4 bg-gray-50 flex md:flex-col  sm:flex-row gap-3 gap-2 text-xs">
                                    <button
                                        onClick={() => handleOpenDetails(project)}
                                        className="text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200 block"
                                    >
                                        🔍 Voir les détails
                                    </button>
                                    {project.status === "negotiation" && (
                                        <button
                                            onClick={() => handleOpenChat(project.id)}
                                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
                                        >
                                            💬 Ouvrir le chat
                                        </button>
                                    )}
                                    {project.status === "accepted" && (
                                        <Link
                                            to={`/contrat`} // Lien vers la page de signature
                                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                                        >
                                            ✍️ Passer à la signature de votre contrat
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6 gap-2">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg border ${currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white hover:bg-gray-100"}`}
                            >
                                ⬅ Précédent
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToPage(index + 1)}
                                    className={`px-4 py-2 rounded-lg border ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-lg border ${currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white hover:bg-gray-100"}`}
                            >
                                Suivant ➡
                            </button>
                        </div>
                    )}
                </>
            ) : (
                !isLoading && clientProjects.length === 0 && (
                    <p className="text-gray-500 mt-4">Vous n'avez aucun projet en attente.</p>
                )
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