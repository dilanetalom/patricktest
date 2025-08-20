// src/components/Admin/PaymentProofsModal.jsx
import React from 'react';
import Modal from 'react-modal';
import { API_URLS } from '../../../store/url';

// Définir l'élément racine pour l'accessibilité
Modal.setAppElement('#root');

const PaymentProofsModal = ({ isOpen, onClose, payments }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal-content p-6 bg-white w-[70%] rounded-lg shadow-xl"
            overlayClassName="modal-overlay fixed inset-0 flex items-center justify-center  bg-gray-900 bg-opacity-75 z-50"
        >
            <div className="flex justify-between items-center mb-4 pb-2 border-b-2">
                <h2 className="text-2xl font-bold text-gray-800">Preuves de paiement</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-bold">&times;</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {payments.length > 0 ? (
                    payments.map((payment, index) => (
                        payment.proof_path && (
                            <div key={index} className="relative group">
                                <a href={`${API_URLS}/storage/${payment.proof_path}`} target="_blank" rel="noopener noreferrer">
                                    <img 
                                        src={`${API_URLS}/storage/${payment.proof_path}`} 
                                        alt={`Preuve ${index + 1}`} 
                                        className="w-full h-auto rounded-lg shadow-md transition-transform transform group-hover:scale-105 duration-300" 
                                    />
                                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                                        <p className="text-white text-lg font-semibold">Cliquer pour voir en grand</p>
                                    </div>
                                </a>
                            </div>
                        )
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-2">Aucune preuve trouvée pour ce projet.</p>
                )}
            </div>
            
            <div className="mt-6 text-right">
                <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-200">
                    Fermer
                </button>
            </div>
        </Modal>
    );
};

export default PaymentProofsModal;