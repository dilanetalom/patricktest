// src/components/PaymentModal.jsx
import React, { useState } from 'react';
import Modal from '../Modal';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { submitPaymentProof } from '../../../store/projectsSlice';

const PaymentModal = ({ isOpen, onClose, onSubmit, project }) => {
    const dispatch = useDispatch();
  const [proofFile, setProofFile] = useState(null);

  const handleFileChange = (event) => {
    setProofFile(event.target.files[0]);
  };

const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!proofFile) {
      toast.error("Veuillez sélectionner un fichier de preuve de paiement.");
      return;
    }

    const formData = new FormData();
    formData.append('proof', proofFile); // Le nom 'proof' doit correspondre à ce qui est attendu par votre API

    dispatch(submitPaymentProof({ project, proof: formData }))
      .unwrap()
      .then(() => {
        // Gérer le succès de la soumission
        toast.success("Preuve de paiement soumise avec succès !");
        // Optionnel : réinitialiser l'état du composant ou rediriger
        setProofFile(null);
      })
      .catch((error) => {
        // Gérer l'échec de la soumission
        const errorMessage = error?.message || "Une erreur est survenue lors de la soumission.";
        toast.error(errorMessage);
      });
  };

    if (!project) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 bg-white rounded-lg shadow-xl max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4">Soumettre une preuve de paiement pour le projet "{project.name}"</h2>
                
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Téléverser votre preuve de paiement :
                        </label>
                        <input
                            type="file"
                            id="paymentProof"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        />
                    </div>
                    
                    {proofFile && (
                        <div className="mb-4">
                            <p className="font-semibold">Fichier sélectionné :</p>
                            <p className="text-sm text-gray-700">{proofFile.name}</p>
                        </div>
                    )}

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={!proofFile}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                        >
                            Soumettre la preuve
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default PaymentModal;