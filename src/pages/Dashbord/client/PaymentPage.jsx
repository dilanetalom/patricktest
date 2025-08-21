// src/pages/PaymentPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, submitPaymentProof } from '../../../store/projectsSlice';
import LayoutDashbord from '../LayoutDashbord';
import PaymentModal from './PaymentModal';
import { toast } from 'react-toastify';
import { API_URL } from '../../../store/url';
import PaymentProofsModal from '../admin/PaymentProofsModal';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const { projects, status, error } = useSelector(state => state.projects);
    const { user } = useSelector(state => state.auth);
    const [modalIsOpen, setModalIsOpen] = useState(false);
        const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
        const [selectedProjectPayments, setSelectedProjectPayments] = useState([]);

    const isAdmin = user?.role === 'admin';
    const isClient = user?.role === 'client';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProjects());
        }

    }, [dispatch, status]);



    const filteredProjects = Array.isArray(projects)
        ? projects.filter(project =>
            (isClient ? Number(project.user_id) === Number(user?.id) : true) &&
            ['contract_signed', 'payment_submitted', 'payment_refused', 'in_progress'].includes(project.status)
        )
        : [];

    const handleOpenModal = (projectId) => {
        setSelectedProjectId(projectId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedProjectId(null);
        setIsModalOpen(false);
    };

       const openProofsModal = (payments) => {
        setSelectedProjectPayments(payments);
        setModalIsOpen(true);
    };

    const closeProofsModal = () => {
        setSelectedProjectPayments([]);
        setModalIsOpen(false);
    };

    const handleProofSubmit = (proofFiles) => {
        if (!proofFiles || proofFiles.length === 0) {
            toast.error("Aucune preuve sélectionnée !");
            return;
        }

        const formData = new FormData();
        proofFiles.forEach((file, index) => {
            formData.append(`paymentProofs[${index}]`, file);
        });

        dispatch(submitPaymentProof({ projectId: selectedProjectId, proof: formData }))
            .unwrap()
            .then(() => {
                toast.success("Preuve(s) de paiement soumise(s) avec succès.");
                handleCloseModal();
                dispatch(fetchProjects());
            })
            .catch((err) => {
                const errorMessage = err?.message || "Erreur lors de la soumission de la preuve.";
                toast.error(errorMessage);
            });
    };


    const handleDownloadPaymentInfo = (projectId) => {
        const pdfUrl = `${API_URL}projects/${projectId}/payment-info-pdf`;
        window.open(pdfUrl, '_blank');
    };

    if (status === 'loading') return <LayoutDashbord><div>Chargement...</div></LayoutDashbord>;
    if (error) return <LayoutDashbord><div className="text-red-500">Erreur: {error.message}</div></LayoutDashbord>;

    return (
        <LayoutDashbord>
            <div className="p-8 bg-gray-50">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    {isAdmin ? "Vérification des paiements" : "Soumettre les preuves de paiement"}
                </h2>

                {Array.isArray(projects) && filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map(project => (
                            <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                                <p className="text-md mb-2">Date de signature de contrat : {project.client_signature_date}</p>

                                {/* Message de statut pour le client */}
                                {isClient && (
                                    <>
                                        {project.status === 'payment_submitted' && (
                                            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
                                                <p className="font-bold">Paiement en attente de validation.</p>
                                                <p className="text-sm mt-1">Votre preuve de paiement a bien été soumise. L'administrateur va la vérifier prochainement.</p>
                                            </div>
                                        )}
                                        {project.status === 'payment_refused' && (
                                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                                                <p className="font-bold">Désolé, votre paiement a été refusé.</p>
                                                <p className="text-sm mt-1">Veuillez soumettre une nouvelle preuve de paiement.</p>
                                            </div>
                                        )}
                                        {project.status === 'in_progress' && (
                                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                                                <p className="font-bold">Paiement validé !</p>
                                                <p className="text-sm mt-1">Votre projet a officiellement démarré.</p>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Boutons pour le client */}
                                {isClient && (
                                    <div className="flex flex-col mt-4 gap-3">
                                        {(project.status === 'contract_signed' || project.status === 'payment_refused') && (
                                            <>
                                                <button
                                                    onClick={() => handleDownloadPaymentInfo(project.id)}
                                                    className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition"
                                                >
                                                    infos de paiement
                                                </button>
                                                <button
                                                    onClick={() => handleOpenModal(project.id)}
                                                    className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
                                                >
                                                    Soumettre preuve de paiement
                                                </button>
                                            </>
                                        )}
                                        {/* Bouton pour voir les détails (utile si paiement en attente ou refusé) */}
                                        {(project.status === 'payment_submitted' || project.status === 'payment_refused') && (
                                            <button
                                           onClick={() => openProofsModal(project.payments)}

                                                className="bg-gray-600 text-white px-4 py-3 w-full rounded-lg hover:bg-gray-700 transition"
                                            >
                                                Voir les détails de la preuve
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Boutons pour l'admin */}
                                {isAdmin && (
                                    <div className="flex flex-col mt-4 gap-3">
                                        <p className="text-gray-700 mb-2">
                                            <span className="font-medium">Client :</span> {project.user?.firstName} {project.user?.lastName}
                                        </p>
                                        {project.status === 'payment_submitted' && project.payment_info?.proof_paths && (
                                            <>
                                                <a
                                                    href={`${API_URL}${project.payment_info.proof_paths[0]}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition text-center"
                                                >
                                                    Voir la preuve
                                                </a>
                                                <button

                                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                                >
                                                    Valider le paiement
                                                </button>
                                            </>
                                        )}
                                        {project.status === 'in_progress' && (
                                            <p className="text-green-600 font-bold">Paiement déjà validé.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">
                        {isAdmin ? "Aucun paiement en attente de vérification." : "Aucun paiement en attente de votre part."}
                    </p>
                )}
            </div>

            {isClient && (
                <PaymentModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleProofSubmit}
                    project={Array.isArray(projects) ? projects.find(p => p.id === selectedProjectId) : null}
                />

                
            )}
               <PaymentProofsModal
                isOpen={modalIsOpen}
                onClose={closeProofsModal}
                payments={selectedProjectPayments}
            />
        </LayoutDashbord>
    );
};

export default PaymentPage;