import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutDashbord from './LayoutDashbord';
import { getProfile, updateProfile } from '../../store/authSlice';

function Profile() {
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    city: '',
    neighborhood: '',
    phone: '',
    password: '',
    id_document_type: '',
    id_document_number: '',
  });

  const [idDocumentFile, setIdDocumentFile] = useState(null);
  const [idDocumentPreviewUrl, setIdDocumentPreviewUrl] = useState(null);
  const [viewPassword, setViewPassword] = useState(false);

  useEffect(() => {
    dispatch(getProfile()); // Récupère le profil au montage
  }, [dispatch]);

  // Met à jour le formulaire quand les données utilisateur sont chargées
  useEffect(() => {
    if (user && user?.role) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        country: user.country || '',
        city: user.city || '',
        neighborhood: user.neighborhood || '',
        phone: user.phone || '',
        id_document_type: user.id_document_type || '',
        id_document_number: user.id_document_number || '',
        password: '',
      });
      // Vous pouvez également ajouter ici la logique pour prévisualiser une image existante
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdDocumentFile(file);
      const fileUrl = URL.createObjectURL(file);
      setIdDocumentPreviewUrl(fileUrl);
    } else {
      setIdDocumentFile(null);
      setIdDocumentPreviewUrl(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Crée un objet FormData pour envoyer les données textuelles et le fichier
    
    const dataToSend = new FormData();
       dataToSend.append('_method', 'PATCH');
    for (const key in formData) {
      if (formData[key] !== '') {
        dataToSend.append(key, formData[key]);
      }
    }
    if (idDocumentFile) {
      dataToSend.append('id_document_image', idDocumentFile);
    }

    // Le dispatch de updateProfile devra être adapté pour gérer les uploads de fichiers.
    // Cette partie nécessite une logique backend spécifique (ex: upload vers un service de stockage
    // comme Firebase Storage ou S3, puis enregistrement de l'URL dans la base de données).
    // Ici, nous simulons l'envoi des données, mais la logique réelle doit être implémentée côté serveur.
    dispatch(updateProfile(dataToSend));
  };

  return (
    <LayoutDashbord>
      <div className="p-6 bg-white rounded-lg shadow-md mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
          Modifier mon profil
        </h1>
        {isError && <div className="text-red-500 mb-4">{message}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Section Informations Personnelles */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Informations personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Nom(s) <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Prénom(s) <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Votre prénom"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Votre email"
                disabled
              />
            </div>
          </div>

          {/* Section Adresse et Contact */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Adresse et contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Pays *</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Votre pays"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Votre ville"
                />
              </div>
              <div>
                <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Quartier</label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Votre quartier"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Votre téléphone"
                />
              </div>
            </div>
          </div>

          {/* Section Pièce d'identité */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Pièce d'identité</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="id_document_type" className="block text-sm font-medium text-gray-700">
                  Type de document
                </label>
                <select
                  id="id_document_type"
                  name="id_document_type"
                  value={formData.id_document_type}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="CNI">Carte Nationale d'Identité (CNI)</option>
                  <option value="Passport">Passeport</option>
                  <option value="DriversLicense">Permis de Conduire</option>
                  <option value="ResidencePermit">Titre de séjour/Récépissé</option>
                </select>
              </div>
              <div>
                <label htmlFor="id_document_number" className="block text-sm font-medium text-gray-700">
                  Numéro de document
                </label>
                <input
                  type="text"
                  id="id_document_number"
                  name="id_document_number"
                  value={formData.id_document_number}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Numéro de votre pièce"
                />
              </div>
            </div>

            {/* Champ d'upload pour la pièce d'identité */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Télécharger le document
              </label>
              <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {idDocumentPreviewUrl ? (
                    <img src={idDocumentPreviewUrl} alt="Prévisualisation du document" className="mx-auto h-48 w-auto rounded-md object-contain" />
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-4-4l-12.828-12.828a4 4 0 00-5.656 0L8 32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Télécharger un fichier</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/jpg, application/pdf"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF jusqu'à 10MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Mot de passe */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Mot de passe</h2>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Nouveau mot de passe
              </label>
              <div className="mt-1 relative">
                <input
                  type={viewPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm pr-10 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Changer le mot de passe"
                />
                <div
                  onClick={() => setViewPassword(!viewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.575 3.01 9.963 7.822.03.1.03.2 0 .311-.02.1-.03.2-.05.32-.05.1-.09.2-.15.3-.2.2-.4.4-.6.59l-1.6 1.6M12 9a3 3 0 100 6 3 3 0 000-6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-950 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? 'Mise à jour en cours...' : 'Modifier mon profil'}
          </button>
        </form>
      </div>
    </LayoutDashbord>
  );
}

export default Profile;
