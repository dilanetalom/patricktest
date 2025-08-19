import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';

const ProfileDropdown = () => {
    // État pour gérer l'ouverture et la fermeture du menu déroulant
      const { isLoading } = useSelector((state) => state.auth);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
      const navigate = useNavigate();
      const [showModal, setShowModal] = useState(false);

    // Fonction pour fermer le menu si l'utilisateur clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

 const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
        navigate('/');
        handleCloseModal();
    };



    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                {/* Le bouton qui déclenche le menu déroulant */}
                <button
                    type="button"
                    className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 rounded-full transition-colors duration-200"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    <UserCircleIcon className="h-10 w-10" />
                </button>
            </div>

            {/* Le panneau du menu déroulant, affiché conditionnellement */}
            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                >
                    <div className="py-1" role="none">
                        <Link
                            to="/profile"
                            className="text-gray-700 flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                        >
                            <UserIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            Profil
                        </Link>
                        <button
                            onClick={handleOpenModal} className="text-gray-700 flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            role="menuitem"
                        >
                            <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            Déconnexion
                        </button>
                    </div>
                </div>
            )}




            {showModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-bold mb-4">Confirmation de déconnexion</h3>
                        <p className="text-gray-700 mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                                disabled={isLoading}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                                disabled={isLoading}
                            >
                                {/* Affiche un texte différent dans le modal */}
                                {isLoading ? 'Déconnexion...' : 'Se déconnecter'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
