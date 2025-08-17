// src/pages/ContractSignaturePage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SignatureCanvas from 'react-signature-canvas';
import { fetchProjectById, signContract, approveContract } from '../../../store/projectsSlice';
import LayoutDashbord from '../LayoutDashbord';
import Modal from '../Modal';
import { API_URL, API_URLS } from '../../../store/url';

const ContractSignaturePage = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSignature, setTempSignature] = useState(null);
  const { project, status, error } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);

  const sigPad = useRef();

  const isClient = user?.user?.role === 'client';

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId));
    }
  }, [dispatch, projectId]);

  const openSignatureModal = () => {
    setTempSignature(null);
    setIsModalOpen(true);
  };

  const handleTempSignature = () => {
    if (!sigPad.current.isEmpty()) {
      const signature = sigPad.current.getCanvas().toDataURL('image/png');
      setTempSignature(signature);
      setIsModalOpen(false);
    } else {
      toast.error("Veuillez signer avant de continuer.");
    }
  };

  const saveSignature = () => {
    if (!tempSignature) {
      toast.error("Aucune signature à enregistrer !");
      return;
    }

    dispatch(signContract({ projectId, signature: tempSignature }))
      .unwrap()
      .then(() => {
        toast.success('Signature client enregistrée !');
        setTempSignature(null);
        // Redirection ou mise à jour si nécessaire
        dispatch(fetchProjectById(projectId));
        navigate("/paiment") // Re-fetch pour actualiser l'état
      })
      .catch((err) => {
        toast.error('Erreur lors de la signature client.');
        console.error('Erreur de signature:', err);
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
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">
            Détails du Contrat - {project.name}
          </h1>

          <ContractContent
            project={project}
            openSignatureModal={openSignatureModal}
            tempSignature={tempSignature}
            isClient={isClient}
            saveSignature={saveSignature}
          />
        </div>
      </div>

      {/* Modal de signature */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Signature Client</h2>
          <SignatureCanvas
            ref={sigPad}
            penColor="black"
            canvasProps={{ width: 350, height: 200, className: 'border' }}
          />
          <div className="mt-4 flex gap-4">
            <button onClick={() => sigPad.current.clear()} className="bg-gray-300 px-4 py-2 rounded">
              Effacer
            </button>
            <button onClick={handleTempSignature} className="bg-yellow-500 px-4 py-2 rounded text-white">
              Aperçu Signature
            </button>
          </div>
        </div>
      </Modal>
    </LayoutDashbord>
  );
};

const ContractContent = ({ project, openSignatureModal, tempSignature, isClient, saveSignature }) => {
  return (
    <div id="contract-content" className="bg-white p-8 rounded-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">CONTRAT DE PRESTATION DE SERVICES</h1>

      <p className="mb-4">
        Entre <strong>{project.user?.firstName} {project.user?.lastName}</strong>, ci-après dénommé
        <strong> « le Client »</strong>, et la société <strong>MPE Digital Solutions</strong>, ci-après dénommée
        <strong> « le Prestataire »</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Article 1 - Objet du contrat</h2>
      <p className="mb-4">
        Le présent contrat a pour objet la réalisation d’une prestation portant sur
        <strong> {project.service}</strong>.  <br />
        Nom du Projet : {project.name}. <br />
        Description : {project.description}.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Article 2 - Obligations du Prestataire</h2>
      <p className="mb-4">
        Le Prestataire s’engage à réaliser la prestation selon les règles de l’art :
        <br />- Objectifs : {project.objectives}
        <br />- Date limite : {new Date(project.deadline).toLocaleDateString()}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Article 3 - Prix et modalités</h2>
      <p className="mb-4">
        Prix global : <strong>{project.client_price} €</strong>.
        Paiement en deux étapes : 50% à la signature et 50% à la livraison.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Article 4 - Durée</h2>
      <p className="mb-4">
        Le contrat prend effet dès signature et se termine à la livraison finale.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Article 5 - Résiliation</h2>
      <p className="mb-4">
        En cas de manquement grave, résiliation possible après mise en demeure de 15 jours.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-10 text-center">
        {/* Client */}
        <div>
          <p className="font-semibold">Le Client</p>
          <p>{project.user?.firstName} {project.user?.lastName}</p>
          {/* Affiche la signature existante ou l'aperçu temporaire */}
          {project.client_signature && (
            <img
              src={`${API_URLS}${project.client_signature}`}
              alt="Signature Client"
              className="mx-auto mt-2 h-56 w-56"
            />
          )}
          {tempSignature && (
            <img src={tempSignature} alt="Aperçu Signature" className="mx-auto mt-2 h-56 w-56" />
          )}

          {/* Bouton pour le client */}
          {!project.client_signature && isClient && (
            <>
              <button
                onClick={openSignatureModal}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Je signe
              </button>
              {tempSignature && (
                <button
                  onClick={saveSignature} // Ajoutez la fonction saveSignature ici
                  className="mt-2 bg-green-600 text-white px-6 py-2 ml-2 rounded-lg hover:bg-green-700"
                >
                  Soumettre Signature
                </button>
              )}
            </>
          )}
          {/* Si déjà signé, un message */}
          {project.client_signature && <p className="mt-4 text-green-600">✅ Signé le {new Date(project.client_signature_date).toLocaleDateString()}</p>}
        </div>

        {/* Prestataire */}
        <div>
          <p className="font-semibold">Le Prestataire</p>
          <p>MPE Digital Solutions</p>
          {project.admin_signature && (
            <img src={`${project.admin_signature}`} alt="Signature Admin" className="mx-auto mt-2 h-56 w-56" />
          )}
          {/* Affiche l'état pour l'admin */}
          {!project.admin_signature && <p className="mt-4 text-gray-500">En attente de signature</p>}
          {project.admin_signature && <p className="mt-4 text-green-600">✅ Signé le {new Date(project.admin_signature_date).toLocaleDateString()}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContractSignaturePage;
