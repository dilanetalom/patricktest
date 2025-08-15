// src/pages/ContractSignaturePage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchProjects, signContract, approveContract } from '../../store/projectsSlice';
import LayoutDashbord from './LayoutDashbord';
import Modal from './Modal';

const ContractSignaturePage = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { project, status, error } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.user?.role === 'admin';
  const isClient = user?.user?.role === 'client';

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjects(projectId));
    }
  }, [dispatch, projectId]);

  const handleClientSignature = () => {
    dispatch(signContract(projectId))
      .unwrap()
      .then(() => {
        toast.success('Contrat signé par le client avec succès !');
        setIsModalOpen(false);
        navigate('/pending-admin-signature'); // Rediriger l'administrateur vers une page d'attente
      })
      .catch(() => {
        toast.error('Erreur lors de la signature du contrat.');
      });
  };

  const handleAdminSignature = () => {
    dispatch(approveContract(projectId))
      .unwrap()
      .then(() => {
        toast.success('Contrat signé par l\'administrateur. Le projet va démarrer !');
        setIsModalOpen(false);
        navigate('/in-progress');
      })
      .catch(() => {
        toast.error('Erreur lors de la signature par l\'admin.');
      });
  };

  if (status === 'loading' || !project) {
    return (
      <LayoutDashbord>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
        </div>
      </LayoutDashbord>
    );
  }

  if (error) {
    return (
      <LayoutDashbord>
        <div className="text-center p-8 text-red-500">
          <h2 className="text-2xl font-bold">Erreur de chargement</h2>
          <p>{error.message || "Impossible de charger les détails du projet."}</p>
        </div>
      </LayoutDashbord>
    );
  }

  return (
    <LayoutDashbord>
      <div className="container mx-auto p-8">
        <div className="bg-white p-10 rounded-lg shadow-xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-4">Détails du Contrat - {project.name}</h1>
          
          <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
            {/* Votre contenu de contrat... */}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200">
            {/* Bouton pour le client */}
            {isClient && project.status === 'accepted' && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200"
              >
                Signer le Contrat
              </button>
            )}

            {/* Bouton pour l'administrateur */}
            {isAdmin && project.status === 'accepted' && (
              <div className="text-center p-4 bg-yellow-100 rounded-lg text-yellow-700">
                <p className="font-bold">En attente de la signature du client.</p>
              </div>
            )}
            
            {/* Affichage après la signature du client */}
            {isAdmin && project.status === 'client-signed' && (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200"
                >
                    Signer le Contrat (en tant qu'Admin)
                </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Composant Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ContractContent 
          project={project} 
          onSignClient={handleClientSignature} 
          onSignAdmin={handleAdminSignature}
          isClient={isClient}
          isAdmin={isAdmin}
        />
      </Modal>
    </LayoutDashbord>
  );
};

// Composant pour le contenu du contrat dans le modal
const ContractContent = ({ project, onSignClient, onSignAdmin, isClient, isAdmin }) => {
    return (
        <div className="p-6 bg-white rounded-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Contrat pour le projet "{project.name}"</h2>
            <div className="prose mb-8">
                {/* Ici, le contenu de votre contrat est généré dynamiquement.
                  Utilisez les données du projet pour remplir les champs.
                */}
                <p>Ce contrat est établi entre **{project.user.firstName} {project.user.lastName}** (le client) et la société.</p>
                <p>Date : {new Date().toLocaleDateString()}</p>
                <p>Détails du projet : **{project.name}**</p>
                <p>Prix : **{project.price} €**</p>
                {/* ... (Ajoutez le reste des clauses du contrat) */}
            </div>

            <div className="mt-8 border-t pt-4 grid grid-cols-2 gap-8">
                {/* Espace de signature du client */}
                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold">Signature du Client</p>
                    {project.client_signature_date ? (
                        <p className="text-green-600 font-bold mt-2">Signé le {new Date(project.client_signature_date).toLocaleDateString()}</p>
                    ) : (
                        <div className="w-full h-24 border-2 border-dashed border-gray-400 mt-2 flex justify-center items-center text-gray-500">
                            Espace de signature
                        </div>
                    )}
                    {isClient && !project.client_signature_date && (
                        <button onClick={onSignClient} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                            Je signe
                        </button>
                    )}
                </div>

                {/* Espace de signature de l'administrateur */}
                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold">Signature de l'Administrateur</p>
                    {project.admin_signature_date ? (
                        <p className="text-green-600 font-bold mt-2">Signé le {new Date(project.admin_signature_date).toLocaleDateString()}</p>
                    ) : (
                        <div className="w-full h-24 border-2 border-dashed border-gray-400 mt-2 flex justify-center items-center text-gray-500">
                            Espace de signature
                        </div>
                    )}
                    {isAdmin && project.client_signature_date && !project.admin_signature_date && (
                        <button onClick={onSignAdmin} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                            Je signe
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContractSignaturePage;