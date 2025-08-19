// src/components/Admin/ConfirmationModal.jsx
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Assurez-vous que c'est bien l'ID de votre élément racine

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal-content p-6 bg-white rounded-lg shadow-xl max-w-sm mx-auto mt-20"
            overlayClassName="modal-overlay fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Confirmation</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
            </div>
            
            <p className="text-gray-600 mb-6">{message}</p>
            
            <div className="flex justify-end gap-4">
                <button
                    onClick={onClose}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-200"
                >
                    Annuler
                </button>
                <button
                    onClick={onConfirm}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                >
                    Confirmer
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;