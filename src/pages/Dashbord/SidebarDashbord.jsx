// src/components/Sidebar.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';

const Sidebar = ({ setActiveView, activeView }) => {
  const navItems = [
    { name: 'Tous les Services', view: '/dashbord' },
    { name: 'En attente', view: '/pending' },
    { name: 'En cours', view: '/in-progress' },
    { name: 'Terminé', view: '/completed' },
    { name: 'Paramètres du Profil', view: '/profile' },
  ];
  const navItem = [
    // { name: 'Tous les Services', view: '/dashbord' },
    { name: 'Nouveaux projets', view: '/pending' },
    { name: 'Projets En cours', view: '/in-progress' },
    { name: 'Projets Terminés', view: '/completed' },
    { name: 'Gestion utilisateurs', view: '/user' },
  ];



  const [users, setUsers] = useState({})

  useEffect(() => {
    const userss = JSON.parse(localStorage.getItem('user'));
    setUsers(userss)

  }, []);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { user, isSuccess, isError, message, isLoading  } = useSelector((state) => state.auth);

  // Fonction pour ouvrir le modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Fonction de déconnexion principale
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleCloseModal();
  };

  useEffect(() => {
    // Si la déconnexion est un succès, on affiche le toast et on redirige
    if (!user && !isSuccess) {
      toast.success('Vous avez été déconnecté avec succès.');
      navigate('/');
    }
    
    // Si la déconnexion a échoué côté serveur mais a réussi en local
    if (isError) {
      toast.error(message);
      navigate('/');
    }

  }, [user, isSuccess, isError, message, navigate]);

  return (
    <aside className="w-[19%] h-[100vh]  fixed bg-gray-900 text-gray-200 flex flex-col p-6 shadow-2xl">
      <div className="text-3xl font-extrabold text-white mb-10 tracking-wide">
        Dashboard
      </div>
      <nav className="flex-grow">
        <ul className="space-y-4">
          {
          
         users.role==="client"? navItems.map(item => (
            <li key={item.view}>
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
          )):navItem.map(item => (
            <li key={item.view}>
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
          )
          
          
          )}
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