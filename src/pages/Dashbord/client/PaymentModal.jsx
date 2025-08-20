// src/components/PaymentModal.jsx
import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { submitPaymentProof } from '../../../store/projectsSlice';

const PaymentModal = ({ isOpen, onClose, onSubmit, project }) => {
    const dispatch = useDispatch();
    const [proofFile, setProofFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (event) => {
        setProofFile(event.target.files[0]);
    };
    // useEffect(()=>{
    //     console.log(project?.id);
        
    // })

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!proofFile) {
            toast.error("Veuillez sélectionner un fichier de preuve de paiement.");
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('paymentProof', proofFile); // Côté client, le nom est 'paymentProof'

        dispatch(submitPaymentProof({ projectId: project?.id, proof: formData }))
            .unwrap()
            .then(() => {
                toast.success("Preuve de paiement soumise avec succès !");
                setProofFile(null);
                onClose();
            })
            .catch((error) => {
                const errorMessage = error?.message || "Une erreur est survenue lors de la soumission.";
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsSubmitting(false);
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
                    
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        />
                    </div>

                    
                        {
                            proofFile && ( // On vérifie si le tableau contient des fichiers
                                <div className="mb-4">
                                    <p className="font-semibold">Fichier(s) sélectionné(s) :</p>
                                    <ul className="list-disc list-inside">
                                      
                                            <li  className="text-sm text-gray-700">{proofFile.name}</li>
                                    
                                    </ul>
                                </div>
                            )
                        }
                    

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
                            // Désactive le bouton si aucun fichier n'est sélectionné OU si la soumission est en cours
                             disabled={!proofFile || isSubmitting} 
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Soumission en cours...</span>
                                </div>
                            ) : (
                                'Soumettre la preuve'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default PaymentModal;