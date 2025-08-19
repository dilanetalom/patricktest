import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import 'moment/locale/fr';

// Définir l'élément racine pour l'accessibilité
Modal.setAppElement('#root');

const ProjectUpdatesModal = ({ isOpen, onClose, project }) => {
    // Si le projet n'est pas sélectionné, la modale ne s'ouvre pas
    if (!project) return null;

    // Trier les mises à jour par date de création, la plus récente en premier
    const sortedUpdates = [...project.updates || []].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal-content p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto mt-10"
            overlayClassName="modal-overlay fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50"
        >
            <div className="flex justify-between items-center mb-4 pb-2 border-b-2">
                <h2 className="text-2xl font-bold text-gray-800">Mises à jour de progression</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-bold">&times;</button>
            </div>
            
            <div className="space-y-6 max-h-96 overflow-y-auto pr-4">
                {sortedUpdates.length > 0 ? (
                    sortedUpdates.map(update => (
                        <div key={update.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold text-gray-800">{update.title}</h4>
                                <span className="text-sm font-medium text-blue-600">{update.progress_percentage}%</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{update.description}</p>
                            <p className="text-gray-400 text-xs italic">
                                Mise à jour il y a {moment(update.created_at).fromNow(true)}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">Aucune mise à jour de progression pour le moment.</p>
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

export default ProjectUpdatesModal;
