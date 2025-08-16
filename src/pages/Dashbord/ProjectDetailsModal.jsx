import React from "react";

const ProjectDetailsModal = ({ project, onClose }) => {

    console.log(project);


    const fieldLabels = {
        "Développement web": {
          websiteType: "Type de site web",
          webFeatures: "Fonctionnalités spécifiques",
        },
        "Création d'entreprise": {
          companyName: "Nom de l'entreprise",
          businessType: "Secteur d'activité",
        },
        "SEA & SEO": {
          websiteUrl: "URL du site",
          targetKeywords: "Mots-clés ciblés",
          budget: "Budget",
        },
        "Applications mobiles": {
          platform: "Plateforme",
          appFeatures: "Fonctionnalités de l'application",
        },
        "Design graphique": {
          projectType: "Type de projet",
          preferredColors: "Couleurs préférées",
        },
        // 🔥 tu ajoutes ici tous les autres services
      };
      

    const safeParse = (data) => {
        try {
            let parsed = data;
            // Tant que c'est encore une string JSON, on re-parse
            while (typeof parsed === "string") {
                parsed = JSON.parse(parsed);
            }
            return parsed;
        } catch {
            return null;
        }
    };


    if (!project) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-h-[90%] w-full max-w-3xl relative overflow-auto">
                {/* Bouton de fermeture */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                >
                    &times;
                </button>

                {/* Titre + Statut */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-900">Projet : {project.name}</h2>
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${project.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : project.status === "negotiation"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                    >
                        {project.status}
                    </span>
                </div>

                {/* Informations principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Service</p>
                        <p className="font-semibold text-gray-800">{project.service}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Montant proposé</p>
                        <p className="font-semibold text-gray-800">
                            {project.client_price} {project.device || "€"}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Date d’échéance</p>
                        <p className="font-semibold text-gray-800">
                            {new Date(project.deadline).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Créé le</p>
                        <p className="font-semibold text-gray-800">
                            {new Date(project.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Description & Objectifs */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                        {project.description || "Aucune description fournie."}
                    </p>
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Objectifs</h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                        {project.objectives || "Aucun objectif précisé."}
                    </p>
                </div>

                {/* Client */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Informations client</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-gray-700">
                        <p>
                            👤 {project.user?.firstName} {project.user?.lastName}
                        </p>
                        <p>📧 {project.user?.email}</p>
                        <p>📞 {project.user?.phone}</p>
                        <p>
                            🌍 {project.user?.city}, {project.user?.country}
                        </p>
                    </div>
                </div>

                {/* Champs spécifiques */}
                {project.specific_fields && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Détails spécifiques
                        </h3>

                        <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-gray-700 text-sm">
                            {(() => {
                                const fields = safeParse(project.specific_fields);
                                if (!fields) return <p>Aucun champ spécifique valide.</p>;

                                const labels = fieldLabels[project.service] || {};

                                return Object.entries(fields).map(([key, value]) => (
                                    <div key={key}>
                                        <strong>{labels[key] || key} :</strong> {value}
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                )}

                {/* Fichier */}
                {project.final_link && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Fichier final</h3>
                        <a
                            href={project.final_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            📂 Télécharger le fichier
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetailsModal;
