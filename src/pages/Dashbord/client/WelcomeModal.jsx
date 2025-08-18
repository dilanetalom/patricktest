    // src/components/WelcomeModal.jsx

    import React from 'react';

    import { MdOutlineShoppingCart, MdOutlineAttachMoney, MdTaskAlt, MdDoneAll, MdSettingsBackupRestore } from 'react-icons/md';
    import { FaFileContract, FaHandshake, FaCheckCircle } from "react-icons/fa";
    import Modal from '../Modal';

    const WelcomeModal = ({ isOpen, onClose }) => {
        const steps = [
            { id: 1, title: 'Nouvelles commandes', icon: <MdOutlineShoppingCart size={24} />, description: 'Faites une proposition de projet et suivez son acceptation.' },
            { id: 2, title: 'Signature du contrat', icon: <FaFileContract size={24} />, description: 'Une fois la proposition acceptée, le contrat se génère automatiquement pour signature.' },
            { id: 3, title: 'Paiement', icon: <MdOutlineAttachMoney size={24} />, description: 'Soumettez vos justificatifs pour que nous puissions vérifier le paiement.' },
            { id: 4, title: 'Validation du paiement', icon: <FaCheckCircle size={24} />, description: 'Nous validons le paiement pour que le projet puisse commencer.' },
            { id: 5, title: 'Démarrage du projet', icon: <MdTaskAlt size={24} />, description: 'Suivez la progression de votre projet grâce à la barre d’évolution.' },
            { id: 6, title: 'Projet terminé', icon: <MdDoneAll size={24} />, description: 'Vous serez notifié. Vous pourrez soit valider le projet, soit demander des modifications.' },
            { id: 7, title: 'Validation finale', icon: <FaHandshake size={24} />, description: 'Le projet est définitivement clôturé. Plus aucune modification ne sera possible.' },
        ];

        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="p-6 bg-white rounded-lg shadow-xl max-w-2xl h-[80vh] overflow-auto w-full mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Bienvenue ! Voici comment ça fonctionne.</h2>
                    <p className="text-gray-600 mb-6 text-center">
                        Suivez ces 6 étapes pour mener votre projet à bien.
                    </p>
                    <div className="space-y-4">
                        {steps.map((step) => (
                            <div key={step.id} className="flex items-start space-x-4 p-4 border-b border-gray-200 last:border-b-0">
                                <div className="flex-shrink-0 p-3 bg-blue-100 text-blue-600 rounded-full">
                                    {step.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{step.id}. {step.title}</h3>
                                    <p className="text-sm text-gray-600">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Compris, c'est parti !
                        </button>
                    </div>
                </div>
            </Modal>
        );
    };

    export default WelcomeModal;