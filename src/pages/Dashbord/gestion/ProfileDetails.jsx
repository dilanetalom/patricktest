import React from 'react';
import { FaUserCircle, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const ProfileViewModal = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="relative bg-white rounded-xl shadow-2xl p-8 sm:p-12 w-full max-w-2xl transform transition-all sm:my-8 sm:align-middle">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-4xl font-extrabold text-blue-950">Détails du Profil</h2>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <FaUserCircle className="text-blue-950 w-8 h-8" />
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold text-gray-700">Nom complet</span>
                            <span className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName} ({user.role})</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaEnvelope className="text-blue-950 w-8 h-8" />
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold text-gray-700">Email</span>
                            <span className="text-2xl font-bold text-gray-900">{user.email}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaPhoneAlt className="text-blue-950 w-8 h-8" />
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold text-gray-700">Téléphone</span>
                            <span className="text-2xl font-bold text-gray-900">{user.phone || 'Non renseigné'}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaMapMarkerAlt className="text-blue-950 w-8 h-8" />
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold text-gray-700">Adresse</span>
                            <span className="text-xl font-bold text-gray-900">
                                {user.neighborhood || 'N/A'}, {user.city}, {user.country}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <button
                        onClick={() => {
                            // Ajoutez ici la logique pour l'édition ou la redirection
                            onClose();
                        }}
                        className="px-6 py-3 bg-blue-950 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-colors duration-300"
                    >
                        Éditer le profil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileViewModal;
