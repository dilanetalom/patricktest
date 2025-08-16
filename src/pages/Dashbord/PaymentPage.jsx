// src/pages/PaymentPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, submitPaymentProof, verifyPayment } from '../../store/projectsSlice';
import LayoutDashbord from './LayoutDashbord';
import PaymentModal from './PaymentModal';
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector(state => state.projects);
  const { user } = useSelector(state => state.auth);

  const isAdmin = user?.user.role === 'admin';
  const isClient = user?.user.role === 'client';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
  }, [dispatch, status]);

  const filteredProjects = projects.filter(project => {
   return project.status === 'contract_signed';
    
  });

  const handleOpenModal = (projectId) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProjectId(null);
    setIsModalOpen(false);
  };

  const handleProofSubmit = (proofFile) => {
    if (!proofFile) {
      toast.error("Aucune preuve sélectionnée !");
      return;
    }

    const formData = new FormData();
    formData.append('paymentProof', proofFile);

    dispatch(submitPaymentProof({ projectId: selectedProjectId, proof: formData }))
      .unwrap()
      .then(() => {
        toast.success("Preuve de paiement soumise avec succès.");
        handleCloseModal();
      })
      .catch(() => toast.error("Erreur lors de la soumission de la preuve."));
  };

  const handleVerifyPayment = (projectId) => {
    dispatch(verifyPayment(projectId))
      .unwrap()
      .then(() => toast.success("Paiement vérifié avec succès !"))
      .catch(() => toast.error("Erreur lors de la vérification du paiement."));
  };

  if (status === 'loading') return <LayoutDashbord><div>Chargement...</div></LayoutDashbord>;
  if (error) return <LayoutDashbord><div className="text-red-500">Erreur: {error.message}</div></LayoutDashbord>;

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
                
                {isAdmin && (
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Client :</span> {project.user?.firstName} {project.user?.lastName}
                  </p>
                )}

                {isClient && project.paymentProof && (
                  <p className="text-gray-700 mb-2">
                    Preuve de paiement : <a href={project.paymentProof} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Voir</a>
                  </p>
                )}

                {isClient && !project.paymentProof && (
                  <button
                    onClick={() => handleOpenModal(project.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Soumettre preuve de paiement
                  </button>
                )}

                {isAdmin && project.paymentProof && (
                  <div className="flex flex-col gap-2">
                    <a
                      href={project.paymentProof}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Voir la preuve
                    </a>
                    <button
                      onClick={() => handleVerifyPayment(project.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Valider le paiement
                    </button>
                  </div>
                )}

                {isAdmin && !project.paymentProof && (
                  <p className="text-gray-500">En attente de la preuve de paiement du client.</p>
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
          project={projects.find(p => p.id === selectedProjectId)}
        />
      )}
    </LayoutDashbord>
  );
};

export default PaymentPage;
