// src/components/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ currentStep }) => {
    // Les étapes du processus client, correspondant à votre schéma
    const steps = [
        "Commande passée",
        "En attente de validation",
        "Signature du contrat",
        "Paiement",
        "Validation du paiement",
        "Projet débuté",
        "Projet terminé"
    ];

    return (
        <div className="flex justify-between items-center w-full px-4 mb-8">
            {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${index + 1 <= currentStep ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}
                    `}>
                        {index + 1}
                    </div>
                    <span className={`text-xs mt-2 text-center w-24
                        ${index + 1 <= currentStep ? 'text-green-400' : 'text-gray-400'}
                    `}>
                        {step}
                    </span>
                    {/* Ligne de progression entre les étapes */}
                    {index < steps.length - 1 && (
                        <div className={`
                            absolute mt-5 left-1/2 transform -translate-x-1/2
                            w-24 h-1
                            ${index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-700'}
                        `}></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;