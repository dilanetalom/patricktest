import React from 'react'

const DocumentModal = ({ isOpen, onClose, documents, clientName }) => {
    if (!isOpen || !documents) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-lg w-full transform scale-95 md:scale-100 transition-transform duration-300">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <h3 className="text-2xl font-bold text-gray-800">Détails de {clientName}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-bold p-2 transition-colors duration-200">
                        &times;
                    </button>
                </div>
                <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-gray-700">Documents</h4>
                    <div className="grid gap-4">
                        <a
                            href={documents.contract}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="font-medium text-gray-800">Contrat</span>
                        </a>
                        <a
                            href={documents.invoice}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 0V3m0 2H9m2 0V3m-2 2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 0V3m0 2H9m2 0V3m-2 2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 0V3m0 2H9m2 0V3m-2 2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 0V3m0 2H9m2 0V3m-2 2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 0V3m0 2H9m2 0V3m-2 2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 0V3m0 2H9m2 0V3" />
                            </svg>
                            <span className="font-medium text-gray-800">Facture</span>
                        </a>
                        <a
                            href={documents.paymentProof}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a2 2 0 110-4 2 2 0 010 4z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m2-3a3 3 0 00-3-3h-2a3 3 0 00-3 3v6a3 3 0 003 3h2a3 3 0 003-3v-6z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m2-3a3 3 0 00-3-3h-2a3 3 0 00-3 3v6a3 3 0 003 3h2a3 3 0 003-3v-6z" />
                            </svg>
                            <span className="font-medium text-gray-800">Preuve de paiement</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentModal