import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import CreateProfileModal from './CreateProfile';

import LayoutDashbord from '../LayoutDashbord';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../store/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileViewModal from './ProfileDetails';
import UpdateProfileModal from './UpdateProfile';

// Constantes pour la pagination
const ITEMS_PER_PAGE = 5;

const User = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // État pour la pagination
    const [currentPage, setCurrentPage] = useState(1);
    
    // État pour la modale de profil
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isProfileModalUp, setIsProfileModalUp] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Données Redux
    const { allUsers, isLoading, isError, message } = useSelector(
        (state) => state.auth
    );

    // Fonction fictive pour simuler la suppression d'un utilisateur
    const handleDelete = (userId) => {
        // Remplacer window.confirm par une modale pour une meilleure UX
        const confirmed = window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?');
        if (confirmed) {
            // Logique de suppression ici (appel API, etc.)
            console.log(`Suppression de l'utilisateur avec l'ID : ${userId}`);
        }
    };

    // Fonction pour afficher la modale de profil
    const handleView = (user) => {
      setSelectedUser(user);
      setIsProfileModalOpen(true);
    };
    const handleupdate = (user) => {
      setSelectedUser(user);
      setIsProfileModalUp(true);
    };

    useEffect(() => {
        dispatch(getAllUsers());
        if (isError) {
            toast.error(message);
        }
    }, [dispatch, isError, message]);

    // Logique de pagination
    // Assurez-vous que allUsers est un tableau avant de l'utiliser
    const usersToDisplay = Array.isArray(allUsers?.data) ? allUsers.data : [];
    const indexOfLastUser = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstUser = indexOfLastUser - ITEMS_PER_PAGE;
    const currentUsers = usersToDisplay.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(usersToDisplay.length / ITEMS_PER_PAGE);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPaginationButtons = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`px-4 py-2 mx-1 rounded-lg ${currentPage === i ? 'bg-blue-950 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {i}
          </button>
        );
      }
      return pageNumbers;
    };

    if (isLoading) {
        return (
            <LayoutDashbord>
                <div className="flex justify-center items-center h-[400px]">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
                </div>
            </LayoutDashbord>
        );
    }

    if (!allUsers || usersToDisplay.length === 0) {
        return (
            <LayoutDashbord>
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h2>
                    <p className="text-gray-600">Aucun utilisateur trouvé.</p>
                </div>
            </LayoutDashbord>
        );
    }

    return (
        <LayoutDashbord>
            <div className="min-h-screen bg-gray-50 p-6 sm:p-12">
                <div className="rounded-xl p-8 sm:p-12 w-full">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-4xl font-extrabold text-blue-950">Tous les Utilisateurs</h2>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center px-6 py-3 bg-blue-950 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-colors duration-300"
                        >
                            <FaPlus className="mr-2" />
                            Créer un profil
                        </button>
                    </div>
                    <CreateProfileModal
                        isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                    />

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                        Nom Complet
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                        Rôle
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                        Téléphone
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-100 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                                            {user.firstName} {user.lastName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                                            {user.role}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                                            {user.phone}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-md font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleView(user)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Voir"
                                                >
                                                    <FaEye size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleupdate(user)}
                                                    className="text-yellow-600 hover:text-yellow-900"
                                                    title="Modifier"
                                                >
                                                    <FaEdit size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Supprimer"
                                                >
                                                    <FaTrash size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Contrôles de pagination */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 mx-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
                        >
                            Précédent
                        </button>
                        {renderPaginationButtons()}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 mx-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
                        >
                            Suivant
                        </button>
                    </div>
                </div>
            </div>

            {/* Modale d'affichage du profil */}
            {selectedUser && (
                <ProfileViewModal
                    isOpen={isProfileModalOpen}
                    onClose={() => setIsProfileModalOpen(false)}
                    user={selectedUser}
                />
            )}
            {selectedUser && (
                <UpdateProfileModal
                    isOpen={isProfileModalUp}
                    onClose={() => setIsProfileModalUp(false)}
                    user={selectedUser}
                />
            )}
        </LayoutDashbord>
    );
};

export default User;

// Vous devrez créer un nouveau composant ProfileViewModal.jsx
// Exemple de ProfileViewModal.jsx
/*
import React from 'react';

const ProfileViewModal = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Profil de {user.firstName} {user.lastName}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">
                        &times;
                    </button>
                </div>
                <div className="space-y-2 text-gray-700">
                    <p><strong>Email :</strong> {user.email}</p>
                    <p><strong>Rôle :</strong> {user.role}</p>
                    <p><strong>Téléphone :</strong> {user.phone}</p>
                    <p><strong>Adresse :</strong> {user.neighborhood}, {user.city}, {user.country}</p>
                    <p><strong>Date d'inscription :</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileViewModal;
*/
