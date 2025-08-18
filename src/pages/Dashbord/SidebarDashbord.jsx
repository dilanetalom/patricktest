// src/components/Sidebar.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';

const Sidebar = ({ setActiveView, activeView }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  
  // 🚀 Utilisez directement l'objet user du store Redux, qui peut être null
  const { user, isSuccess, isError, message, isLoading } = useSelector((state) => state.auth);

    if (!user) {
        return null; 
      }
  // Définissez vos éléments de navigation en fonction du rôle
  const navItemsClient = [
    {id:1, name: 'Nouvelle commande', view: '/dashbord' },
    { id:2, name: 'Commande en attente de validation', view: '/pending' },
    { id:3, name: 'Signature du contrat ', view: '/contrat' },
    { id:4, name: 'Paiement ', view: '/paiment' },
    { id:5, name: 'Projet débuter ', view: '/in-progress' },
    { id:6, name: 'Projets terminé', view: '/completed' },
    { id:7, name: 'Paramètres du Profil', view: '/profile' },
  ];

  const navItemsAdmin = [
    // {id:1, name: 'Nouvelles commandes', view: '/dashbord' },
    {id:1, name: 'Voir les commandes', view: '/commande' },
    // {id:3, name: 'Signature du contrat ', view: '/contrat' },
    {id:2, name: 'Vérification du paiement ', view: '/verify ' },
    { id:3, name: 'Lancer le projet ', view: '/in-progress' },
    {id:4, name: 'Projet(s) finalisé(s)', view: '/completed' },
    { id:5, name: 'Paramètres du Profil', view: '/profile' },
    { id:6, name: 'Gestion utilisateurs', view: '/user' },
  ];

  const currentNavItems = user?.user?.role === 'client' ? navItemsClient : navItemsAdmin;

  // Gestion du modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Déconnexion
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleCloseModal();
  };

  useEffect(() => {
    if (isError) toast.error(message);
  }, [isError, message]);

  return (
    <aside className="w-[19%] h-[100vh]  fixed bg-gray-900 text-gray-200 flex flex-col p-6 shadow-2xl">
      <Link to={user?.user?.role === 'client'?"/bords":"/bord"} className="text-3xl font-extrabold text-white mb-10 tracking-wide">
        Dashboard
      </Link>
      <nav className="flex-grow">
        <ul className="space-y-4">
          {
          
          currentNavItems.map(item => (
            <li key={item.id}>
              <Link
              to={item.view}  
                className={`flex items-center w-full text-left p-3 rounded-xl transition-all duration-300 transform
                  ${window.location.pathname === item.view
                    ? 'bg-gray-700 text-white shadow-lg scale-105'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                {/* Icône optionnelle, à insérer ici */}
                <span className="ml-3 text-lg font-medium">
                  {item.name}
                </span>
              </Link>
            </li>
          ))
}
        </ul>
      </nav>

      {/* Tu peux ajouter d'autres éléments ici, comme une section utilisateur ou de déconnexion */}
      <div className="mt-8">
        <button
          onClick={handleOpenModal}
          className="flex items-center w-full text-left p-3 rounded-xl text-gray-400  hover:bg-gray-700 hover:text-red-300 transition-colors duration-300"
        >
          {/* Icône de déconnexion */}
          <span className="ml-3 font-medium">Déconnexion</span>
        </button>

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
    </aside>
  );
};

export default Sidebar;