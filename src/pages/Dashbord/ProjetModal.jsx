// src/components/ProjectModal.jsx
import React, { useState } from 'react';

const ProjectModal = ({ service, onClose, onSubmit }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [file, setFile] = useState(null); // Nouveau state pour le fichier
  
  // Champs spécifiques par service
  const [specificFields, setSpecificFields] = useState({});

  const handleSpecificChange = (e) => {
    setSpecificFields({
      ...specificFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Met à jour l'état avec le fichier sélectionné
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      projectName, 
      description, 
      objectives,
      deadline,
      priceRange,
      file, // Ajoute le fichier aux données soumises
      ...specificFields,
    });
  };

  const getSpecificFields = (serviceName) => {
    switch (serviceName) {
      case "Développement web":
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="websiteType">Type de site web</label>
              <select name="websiteType" onChange={handleSpecificChange} className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">Sélectionner...</option>
                <option value="vitrine">Site vitrine</option>
                <option value="ecommerce">E-commerce</option>
                <option value="webapp">Application web</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="webFeatures">Fonctionnalités spécifiques</label>
              <textarea name="webFeatures" onChange={handleSpecificChange} className="w-full p-2 border border-gray-300 rounded-md" rows="2" placeholder="Ex: Paiement en ligne, espace membre, etc."></textarea>
            </div>
          </>
        );
      case "Création d'entreprise":
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="companyName">Nom de l'entreprise</label>
              <input type="text" name="companyName" onChange={handleSpecificChange} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="businessType">Secteur d'activité</label>
              <input type="text" name="businessType" onChange={handleSpecificChange} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
          </>
        );
      case "SEA & SEO":
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="websiteUrl">URL du site web</label>
              <input type="url" name="websiteUrl" onChange={handleSpecificChange} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="targetKeywords">Mots-clés ciblés</label>
              <textarea name="targetKeywords" onChange={handleSpecificChange} className="w-full p-2 border border-gray-300 rounded-md" rows="2" placeholder="Ex: Agence digitale, création de site web Paris"></textarea>
            </div>
          </>
        );
      case "Applications mobiles":
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="platform">Plateforme</label>
              <select name="platform" onChange={handleSpecificChange} className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">Sélectionner...</option>
                <option value="ios">iOS</option>
                <option value="android">Android</option>
                <option value="both">Les deux</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="appFeatures">Fonctionnalités de l'application</label>
              <textarea name="appFeatures" onChange={handleSpecificChange} className="w-full p-2 border border-gray-300 rounded-md" rows="2" placeholder="Ex: Connexion par réseaux sociaux, paiement in-app"></textarea>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 h-[95%] w-full max-w-[70%] relative overflow-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold">
          &times;
        </button>
        <h2 className="text-2xl font-bold text-blue-950 mb-4">Nouveau projet : {service.name}</h2>
        <form onSubmit={handleSubmit}>
          {/* Champs communs à tous les services */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="projectName">Nom du projet</label>
            <input type="text" id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">Description et besoins</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" rows="4" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="objectives">Objectifs du projet</label>
            <textarea id="objectives" value={objectives} onChange={(e) => setObjectives(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" rows="2" placeholder="Ex: Augmenter les ventes de 20%, gagner en visibilité, etc." />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="deadline">Date limite souhaitée</label>
            <input type="date" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          
          {/* Champs spécifiques basés sur le service sélectionné */}
          {getSpecificFields(service.name)}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="file-upload">Joindre un fichier (cahier des charges, maquettes...)</label>
            <input 
              type="file" 
              id="file-upload" 
              onChange={handleFileChange} 
              className="w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-50 file:text-indigo-700
                         hover:file:bg-indigo-100"
            />
            {file && <p className="mt-2 text-sm text-gray-500">Fichier sélectionné : {file.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="priceRange">Intervalle de prix</label>
            <select id="priceRange" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required>
              <option value="">Sélectionner une option</option>
              <option value="< 500€">{'< 500€'}</option>
              <option value="500€ - 1000€">500€ - 1000€</option>
              <option value="1000€ - 5000€">1000€ - 5000€</option>
              <option value="> 5000€">{'> 5000€'}</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-indigo-700">
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;