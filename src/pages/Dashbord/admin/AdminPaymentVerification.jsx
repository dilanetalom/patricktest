// src/components/Admin/AdminPaymentVerification.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, verifyPaymentsByProject } from '../../../store/projectsSlice';
import { toast } from 'react-toastify';
import LayoutDashbord from '../LayoutDashbord';
import PaymentProofsModal from './PaymentProofsModal';
import ConfirmationModal from './ConfirmationModal';

const AdminPaymentVerification = () => {
const dispatch = useDispatch();
    const { projects, status, error } = useSelector(state => state.projects);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
    const [selectedProjectPayments, setSelectedProjectPayments] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(null); // ID du projet sélectionné

    const projectsToVerify = projects.filter(project =>
        project.status === 'payment_submitted'
    );

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProjects());
        }
    }, [dispatch, status]);

    const openProofsModal = (payments) => {
        setSelectedProjectPayments(payments);
        setModalIsOpen(true);
    };

    const closeProofsModal = () => {
        setSelectedProjectPayments([]);
        setModalIsOpen(false);
    };

    const openConfirmationModal = (projectId) => {
        setSelectedProjectId(projectId);
        setConfirmationModalIsOpen(true);
    };

    const closeConfirmationModal = () => {
        setSelectedProjectId(null);
        setConfirmationModalIsOpen(false);
    };

    const handleConfirmVerification = () => {
        closeConfirmationModal();

        if (selectedProjectId) {
            // Trouver le projet et ses IDs de paiement
            const project = projects.find(p => p.id === selectedProjectId);
            if (project && project.payments) {
                const paymentIds = project?.payments.map(p => p.id);
                if (paymentIds.length > 0) {
                    dispatch(verifyPaymentsByProject({ projectId: selectedProjectId, paymentIds }))
                        .unwrap()
                        .then(() => {
                            toast.success("Paiements vérifiés avec succès pour le projet !");
                            dispatch(fetchProjects());
                        })
                        .catch((err) => {
                            const errorMessage = err?.message || "Erreur lors de la vérification des paiements.";
                            toast.error(errorMessage);
                        });
                } else {
                    toast.info("Aucun paiement à vérifier pour ce projet.");
                }
            }
        }
    };

    if (status === 'loading') {
        return <LayoutDashbord><div>Chargement...</div></LayoutDashbord>;
    }

    if (error) {
        return <LayoutDashbord><div className="text-red-500">Erreur: {error?.message}</div></LayoutDashbord>;
    }

    return (
        <LayoutDashbord>
            <div className="p-8 bg-gray-50">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Vérification des paiements</h2>
                {projectsToVerify.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projectsToVerify.map(project => (
                            <div
                                key={project.id}
                                className={`bg-white p-6 rounded-lg shadow-md border-l-4 transition-all duration-300 ease-in-out
                                ${project.status === 'payment_submitted' ? 'border-yellow-500' : 'border-red-500'}`}
                            >
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{project.name}</h3>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Client :</span> {project.user?.firstName} {project.user?.lastName}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Montant :</span> {project.client_price} {project.device}
                                </p>
                                <div className={`py-1 px-2 rounded-full inline-block text-sm font-semibold mt-2
                                    ${project.status === 'payment_submitted' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                    {project.status === 'payment_submitted' ? "En attente de vérification" : "Paiement refusé"}
                                </div>

                                {project.payments && (
                                    <div className="mt-4 flex flex-col gap-3">
                                        <button
                                            onClick={() => openProofsModal(project.payments)}
                                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition w-full"
                                        >
                                            Voir la preuve
                                        </button>
                                        
                                        {project.status === 'payment_submitted' && (
                                            <>
                                                <button
                                                    onClick={() => openConfirmationModal(project.id)}
                                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full"
                                                >
                                                    Valider le paiement
                                                </button>
                                                {/* Le bouton de refus est laissé en commentaire pour l'exemple, mais vous pouvez l'implémenter de la même manière */}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center text-lg">
                        Aucun paiement en attente de vérification.
                    </p>
                )}
            </div>

            <PaymentProofsModal
                isOpen={modalIsOpen}
                onClose={closeProofsModal}
                payments={selectedProjectPayments}
            />

            {/* Ajouter la modale de confirmation ici */}
            <ConfirmationModal
                isOpen={confirmationModalIsOpen}
                onClose={closeConfirmationModal}
                onConfirm={handleConfirmVerification}
                message="Êtes-vous sûr de vouloir valider ce paiement ?"
            />
        </LayoutDashbord>
    );
};

export default AdminPaymentVerification;