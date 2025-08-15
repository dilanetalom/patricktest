// src/pages/PaymentPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects, submitPaymentProof, verifyPayment } from '../../store/projectsSlice';

import { toast } from 'react-toastify';
import LayoutDashbord from './LayoutDashbord';
import PaymentModal from './PaymentModal';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const { projects, status, error } = useSelector((state) => state.projects);
    const { user } = useSelector((state) => state.auth);

    const isAdmin = user?.user.role === 'admin';
    const isClient = user?.user.role === 'client';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    // Filtrer les projets selon le rôle de l'utilisateur et le statut
    const filteredProjects = projects.filter(project => {
        if (isAdmin) {
            return project.status === 'awaiting_payment_verification';
        }
        if (isClient) {
            return project.status === 'contract_signed';
        }
        return false;
    });

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    // Fonctions pour le modal
    const handleOpenModal = (projectId) => {
        setSelectedProjectId(projectId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProjectId(null);
    };

    // Fonction de soumission de preuve de paiement (appelée par le modal)
    const handleProofSubmit = (proofFile) => {
        const formData = new FormData();
        formData.append('paymentProof', proofFile);
        
        dispatch(submitPaymentProof({ projectId: selectedProjectId, proof: formData }))
            .unwrap()
            .then(() => {
                toast.success('Preuve de paiement soumise avec succès.');
                handleCloseModal();
            })
            .catch(() => {
                toast.error('Erreur lors de la soumission de la preuve.');
            });
    };

    // Fonction de vérification par l'administrateur
    const handleVerifyPayment = (projectId) => {
        dispatch(verifyPayment(projectId))
            .unwrap()
            .then(() => {
                toast.success('Paiement vérifié avec succès. Le projet est en cours.');
            })
            .catch(() => {
                toast.error('Erreur lors de la vérification du paiement.');
            });
    };

    // Affichage en cours de chargement
    if (status === 'loading') {
        return <LayoutDashbord><div>Chargement...</div></LayoutDashbord>;
    }

    // Affichage en cas d'erreur
    if (error) {
        return <LayoutDashbord><div>Erreur: {error.message}</div></LayoutDashbord>;
    }

    return (
        <LayoutDashbord>
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    {isAdmin ? "Vérification des paiements" : "Paiements en attente"}
                </h2>

                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map(project => (
                            <div key={project.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                                <p className="text-gray-600 mb-4">Statut: <span className="font-bold">{project.status}</span></p>

                                {isClient && (
                                    <button
                                        onClick={() => handleOpenModal(project.id)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Soumettre preuve de paiement
                                    </button>
                                )}

                                {isAdmin && (
                                    <button
                                        onClick={() => handleVerifyPayment(project.id)}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                    >
                                        Vérifier le paiement
                                    </button>
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
            
            <PaymentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleProofSubmit}
                project={projects.find(p => p.id === selectedProjectId)}
            />
        </LayoutDashbord>
    );
};

export default PaymentPage;