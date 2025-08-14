// src/components/ProjectModal.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, resetCreateProjectStatus } from '../../store/projectsSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectModal = ({ service, onClose }) => {
  const dispatch = useDispatch();
// Assurez-vous que le state a cette structure

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState('');
  const [deadline, setDeadline] = useState('');
  const [clientPrice, setClientPrice] = useState('');
  const [file, setFile] = useState(null);
  const [specificFields, setSpecificFields] = useState({});
  const [currency, setCurrency] = useState('FCFA');

  const { status, error } = useSelector(state => state.projects.createProjectStatus);

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('Projet soumis avec succès !');
   

      const timer = setTimeout(() => {
        onClose();
        dispatch(resetCreateProjectStatus());
      }, 1500);

      return () => clearTimeout(timer);
    }

    if (status === 'failed') {
      const errorMessage = error?.message || 'Une erreur inconnue est survenue.';
      toast.error(`Erreur lors de la soumission : ${errorMessage}`);
      // Réinitialisez l'état après l'échec
      dispatch(resetCreateProjectStatus());
    }
  }, [status, error, onClose, dispatch]);


  const handleSpecificChange = (e) => {
    setSpecificFields({
      ...specificFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Récupère le token depuis le localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error("Vous devez être connecté pour soumettre un projet.");
      return;
    }

    const projectData = new FormData();
    projectData.append('service', service.name);
    projectData.append('name', projectName);
    projectData.append('description', description);
    projectData.append('objectives', objectives);
    projectData.append('deadline', deadline);
    projectData.append('client_price', clientPrice);
    projectData.append('device', currency);
    // projectData.append('service', clientPrice);
    if (file) {
      projectData.append('file', file);
    }
    projectData.append('specific_fields', JSON.stringify(specificFields));

    for (const [key, value] of projectData.entries()) {
      console.log(`${key}: ${value}`);
    }


    dispatch(createProject({ projectData, token }));
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
          {/* Champs du formulaire... */}
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
            <label className="block text-gray-700 mb-2">Prix proposé</label>
            <div className="flex space-x-2">
              <select
                className="p-2 border border-gray-300 rounded-md"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="XOF">FCFA (XOF)</option>
                <option value="XAF">FCFA (XAF)</option>
                <option value="USD">USD (Dollar américain)</option>
                <option value="EUR">EUR (Euro)</option>
                <option value="GBP">GBP (Livre Sterling)</option>
                <option value="JPY">JPY (Yen japonais)</option>
                <option value="CHF">CHF (Franc suisse)</option>
                <option value="CAD">CAD (Dollar canadien)</option>
                <option value="AUD">AUD (Dollar australien)</option>
                <option value="NGN">NGN (Naira nigérian)</option>
              </select>
              <input
                type="number"
                id="priceRange"
                value={clientPrice}
                onChange={(e) => setClientPrice(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Annuler
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-md transition-colors ${status === 'loading' ? 'bg-indigo-400 cursor-not-allowed' : 'bg-blue-950 hover:bg-indigo-700'}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Chargement...</span>
                </div>
              ) : (
                'Soumettre'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
