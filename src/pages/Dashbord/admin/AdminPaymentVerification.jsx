// src/components/Admin/AdminPaymentVerification.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, verifyPayment } from '../../../store/projectsSlice';
import { toast } from 'react-toastify';
import { API_URL } from '../../../store/url'; // Import your base API URL
import LayoutDashbord from '../LayoutDashbord';

const AdminPaymentVerification = () => {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector(state => state.projects);

  // Filter projects that need payment verification
  const projectsToVerify = projects.filter(project => 
    project.status === 'payment_submitted'
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
  }, [dispatch, status]);

  const handleVerifyPayment = (paymentId) => {
    dispatch(verifyPayment(paymentId))
      .unwrap()
      .then(() => {
        toast.success("Paiement vérifié avec succès !");
      })
      .catch((err) => {
        const errorMessage = err?.message || "Erreur lors de la vérification du paiement.";
        toast.error(errorMessage);
      });
  };

  if (status === 'loading') {
    return <LayoutDashbord><div>Chargement...</div></LayoutDashbord>;
  }

  if (error) {
    return <LayoutDashbord><div className="text-red-500">Erreur: {error?.message}</div></LayoutDashbord>;
  }

  return (
    <LayoutDashbord>
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Vérification des paiements
        </h2>

        {projectsToVerify.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsToVerify.map(project => (
              <div key={project.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Client :</span> {project.user?.firstName} {project.user?.lastName}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-medium">Statut :</span> En attente de vérification
                </p>
                
                <div className="flex flex-col gap-2">
                  <a
                    href={`${API_URL}${project.payment_info?.proof_paths[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition text-center"
                  >
                    Voir la preuve
                  </a>
                  <button
                    onClick={() => handleVerifyPayment(project.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Valider le paiement
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            Aucun paiement en attente de vérification.
          </p>
        )}
      </div>
    </LayoutDashbord>
  );
};

export default AdminPaymentVerification;