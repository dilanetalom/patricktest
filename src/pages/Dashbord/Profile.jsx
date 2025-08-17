import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutDashbord from './LayoutDashbord';
import { getProfile, updateProfile } from '../../store/authSlice';

function Profile() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    city: '',
    neighborhood: '',
    phone: '',
    password: '',
  });

  const [view, setView] = useState(false);

  useEffect(() => {
    dispatch(getProfile()); // récupère le profil au montage
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.user.firstName || '',
        lastName: user.user.lastName || '',
        email: user.user.email || '',
        country: user.user.country || '',
        city: user.user.city || '',
        neighborhood: user.user.neighborhood || '',
        phone: user.user.phone || '',
        password: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  return (
    <LayoutDashbord>
      <div className="w-full max-w-full flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Modifier mon profil</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nom & Prénom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Email */}
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
            />
          </div>

          {/* Pays et Ville */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          {/* Quartier & Téléphone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Mot de passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
            <div className="mt-1 relative">
              <input
                type={view ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm pr-10 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Changer le mot de passe"
              />
              <div
                onClick={() => setView(!view)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                👁
              </div>
            </div>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-blue-950 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLoading ? 'Mise à jour...' : 'Modifier mon profil'}
          </button>
        </form>
      </div>
    </LayoutDashbord>
  );
}

export default Profile;
