// src/components/PaymentModal.jsx
import React, { useState } from 'react';
import Modal from './Modal'; // Votre composant de modal générique

const PaymentModal = ({ isOpen, onClose, onSubmit, project }) => {
    const [proofFile, setProofFile] = useState(null);

    const handleFileChange = (e) => {
        setProofFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (proofFile) {
            onSubmit(proofFile);
        }
    };

    if (!project) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 bg-white rounded-lg shadow-xl max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4">Soumettre une preuve de paiement pour le projet "{project.name}"</h2>
                
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Instructions de virement</h3>
                    <p className="text-gray-700">Veuillez effectuer un virement bancaire sur le compte suivant :</p>
                    <ul className="list-disc list-inside mt-2">
                        <li>**Nom du bénéficiaire:** Votre entreprise</li>
                        <li>**IBAN:** FRXX XXXX XXXX XXXX XXXX XXXX</li>
                        <li>**Montant:** {project.price} €</li>
                        <li>**Référence du virement:** Projet-{project.id}</li>
                    </ul>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Télécharger votre preuve de paiement :
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    
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