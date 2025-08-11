// src/components/CreateProfileModal.jsx

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../../store/authSlice';

const CreateProfileModal = ({ isOpen, onClose }) => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        country: '',
        city: '',
        neighborhood: '',
        phone: '',
        role: 'client', // Valeur par défaut
    });


    const dispatch = useDispatch();
    
      const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
      );
    
      useEffect(() => {
        if (isError) {
          // Affiche le toast d'erreur
          toast.error(message);
        }
        if (isSuccess) {
          // Affiche le toast de succès, puis ferme la modal
          toast.success('Inscription réussie !');
          onClose();
        }
    
        // Réinitialise l'état Redux uniquement si une action a été effectuée
        // et que la modal est fermée.
        // Cela évite que le reset se produise à chaque rendu.
        if (isError || isSuccess) {
            dispatch(reset());
        }
        
      }, [isError, isSuccess, message, dispatch, onClose]);
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
      };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center p-4 z-50">
            <div className="relative bg-white rounded-xl shadow-2xl p-8 sm:p-12 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-extrabold text-blue-950">Créer un nouveau profil</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors">
                        <FaTimes className="h-6 w-6" />
                    </button>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nom(s) <span className='text-red-600'>*</span></label>
                            <input
                                type="text" id="firstName" name="firstName" required
                                value={formData.firstName} onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Nom de l'utilisateur"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Prenom(s)<span className='text-red-600'>*</span></label>
                            <input
                                type="text" id="lastName" name="lastName" required
                                value={formData.lastName} onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Prénom de l'utilisateur"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className='text-red-600'>*</span></label>
                        <input
                            type="email" name="email" required
                            value={formData.email} onChange={handleChange}
                            id="email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Email de l'utilisateur"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe <span className='text-red-600'>*</span></label>
                        <input
                            type="password" name="password" required
                            value={formData.password} onChange={handleChange}
                            id="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Mot de passe initial"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Pays <span className='text-red-600'>*</span></label>
                            <input
                                type="text" name="country" required
                                value={formData.country} onChange={handleChange}
                                id="country"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Pays"
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville <span className='text-red-600'>*</span></label>
                            <input
                                type="text" id="city" name="city" required
                                value={formData.city} onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Ville"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Quartier</label>
                            <input
                                type="text" id="neighborhood" name="neighborhood"
                                value={formData.neighborhood} onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Quartier"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone <span className='text-red-600'>*</span></label>
                            <input
                                type="tel" id="phone" name="phone" required
                                value={formData.phone} onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Téléphone"
                            />
                        </div>
                        <div>
                             <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rôle <span className='text-red-600'>*</span></label>
                             <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                                <option value="client">Client</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center">
                    <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-950 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Création en cours...</span>
                                </div>
                            ) : (
                                'Créer'
                            )}
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProfileModal;
