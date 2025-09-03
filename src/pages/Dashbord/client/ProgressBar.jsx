// src/components/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ currentStep }) => {
    // Les étapes du processus client, correspondant à votre schéma
    const steps = [
        "Commande passée",
        "En attente de validation",
        "Signature du contrat",
        "Paiement",
        "Projet débuté",
        "Projet terminé"
    ];

    return (
       <div className=" w-full bg-gray-100 py-6 flex justify-between items-start w-full px-4 mb-8 relative z-50">
            {steps.map((step, index) => {
                const isCurrentStep = index + 1 === currentStep;
                const isCompletedStep = index + 1 < currentStep;

                return (
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center z-10">
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center
                                ${isCurrentStep ? 'bg-green-500 text-white' : (isCompletedStep ? 'bg-green-500 text-white shadow-xl' : 'bg-gray-50 shadow-xl text-gray-700')}
                            `}>
                                {index + 1}
                            </div>
                            <span className={`text-xs mt-2 text-center w-24
                                ${isCurrentStep || isCompletedStep ? 'text-green-400' : 'text-gray-400'}
                            `}>
                                {step}
                            </span>
                        </div>
                        
                        {/* Ligne de progression entre les étapes */}
                        {index < steps.length - 1 && (
                            <div className={`
                                h-1 w-full absolute top-1/4 left-[calc(50%+20px)]
                                -translate-y-1/2 -translate-x-1/2
                                ${isCompletedStep ? 'bg-green-500' : 'bg-gray-700'}
                            `}></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default ProgressBar;