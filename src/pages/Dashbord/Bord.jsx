// src/components/Dashboard.tsx
import React from "react";
import { FaFileSignature, FaMoneyBill, FaCheckCircle, FaTasks, FaHandshake } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import LayoutDashbord from "./LayoutDashbord";


const Bord = () => {
    // Données simulées (tu pourras les récupérer via API ensuite)
    const steps = [
        {
            id: 1,
            title: "Nouvelles commandes",
            count: 3,
            color: "bg-yellow-500",
            icon: <MdOutlineShoppingCart size={28} />,
            description: "Propositions clients en attente d’acceptation"
        },
        {
            id: 2,
            title: "Signature du contrat",
            count: 2,
            color: "bg-blue-500",
            icon: <FaFileSignature size={28} />,
            description: "Contrats en cours de modification et signature"
        },
        {
            id: 3,
            title: "Paiement",
            count: 4,
            color: "bg-purple-500",
            icon: <FaMoneyBill size={28} />,
            description: "Paiements en attente de justificatifs"
        },
        {
            id: 4,
            title: "Validation paiement",
            count: 1,
            color: "bg-green-500",
            icon: <FaCheckCircle size={28} />,
            description: "Paiements à vérifier et valider"
        },
        {
            id: 5,
            title: "Projet débuté",
            count: 2,
            color: "bg-indigo-500",
            icon: <FaTasks size={28} />,
            description: "Projets en cours avec suivi de progression"
        },
        {
            id: 6,
            title: "Projet terminé",
            count: 1,
            color: "bg-pink-500",
            icon: <FaHandshake size={28} />,
            description: "Projets livrés en attente de validation finale"
        }
    ];

    return (
        <LayoutDashbord>
            <div className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center space-x-4">
                                <div className={`p-3 rounded-full text-white ${step.color}`}>
                                    {step.icon}
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">{step.title}</h2>
                                    <p className="text-sm text-gray-500">{step.description}</p>
                                </div>
                            </div>
                            <div className="mt-4 text-3xl font-bold text-gray-800">
                                {step.count}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </LayoutDashbord>
    );
};

export default Bord;
