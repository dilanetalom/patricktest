import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import 'moment/locale/fr';
import { toast } from 'react-toastify';
import axios from 'axios';
import { fetchProjects } from '../../../store/projectsSlice';
import { API_URL } from '../../../store/url';

// Assurez-vous que l'élément racine de votre application est configuré pour la modale
Modal.setAppElement('#root');
// moment.locale('fr');
// const API_URL = 'http://127.0.0.1:8000/api/';

const ProjectProgressModal = ({ isOpen, onClose, project }) => {
    const dispatch = useDispatch();
    // Si le projet n'est pas sélectionné, la modale ne s'ouvre pas
    if (!project) return null;

    const [newUpdate, setNewUpdate] = useState({
        progress_percentage: project.progress_percentage || 0,
        title: '',
        description: '',
        attachments: []
    });

    const [loading, setLoading] = useState(false);

    // Gère le changement des champs de formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUpdate(prev => ({ ...prev, [name]: value }));
    };

    // Gère la soumission du formulaire
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = sessionStorage.getItem('token');
        const payload = {
            progress_percentage: parseInt(newUpdate.progress_percentage, 10),
            title: newUpdate.title,
            description: newUpdate.description,
            // Pour les pièces jointes, la logique d'upload de fichiers doit être implémentée ici
            // Pour l'instant, nous envoyons simplement les autres données
        };

        try {
            await axios.post(
                `${API_URL}projects/${project.id}/updates`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            
            toast.success("Progression enregistrée avec succès !");
            
            // Re-fetch des projets pour mettre à jour la vue avec la nouvelle progression
            dispatch(fetchProjects());
            
            // Fermer la modale et réinitialiser le formulaire
            onClose();
            setNewUpdate({
                progress_percentage: 0,
                title: '',
                description: '',
                attachments: []
            });
            
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de la progression', error);
            const errorMessage = error.response?.data?.message || "Erreur lors de l'enregistrement de la progression.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal-content p-8 bg-white rounded-lg shadow-xl max-w-4xl mx-auto mt-10"
            overlayClassName="modal-overlay fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Progression du Projet : {project.name}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-bold">&times;</button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Section : Historique des mises à jour */}
                <div className="border-r border-gray-200 pr-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Historique de la progression</h3>
                    {project.updates && project.updates.length > 0 ? (
                        <div className="space-y-6 max-h-96 overflow-y-auto pr-4">
                            {[...project.updates]
                              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                .map(update => (
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
                                ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">Aucune mise à jour de progression pour le moment.</p>
                    )}
                </div>

                {/* Section : Nouveau formulaire de progression */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Enregistrer une nouvelle progression</h3>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="progress" className="block text-sm font-medium text-gray-700">Progression (%)</label>
                            <input
                                type="number"
                                id="progress"
                                name="progress_percentage"
                                value={newUpdate.progress_percentage}
                                onChange={handleInputChange}
                                min="0"
                                max="100"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre de l'avancement</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={newUpdate.title}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={newUpdate.description}
                                onChange={handleInputChange}
                                rows="4"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                                required
                            ></textarea>
                        </div>
{/*                         
                        <div>
                            <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">Pièces jointes (photos, documents)</label>
                            <input
                                type="file"
                                id="attachments"
                                name="attachments"
                                // onChange={handleFileChange}
                                multiple
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div> */}

                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                                disabled={loading}
                            >
                                {loading ? 'Enregistrement...' : 'Enregistrer la progression'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default ProjectProgressModal;
