import React from 'react'

function Customer() {
   const [clients, setClients] = useState([]);
    const [status, setStatus] = useState('idle');
    const [selectedClient, setSelectedClient] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Fonction de simulation de récupération de données
    const fetchClients = () => {
        setStatus('loading');
        setTimeout(() => {
            const verifiedClients = MOCK_CLIENT_PROJECTS.filter(p => p.status === 'payment_verified');
            setClients(verifiedClients);
            setStatus('succeeded');
        }, 1000);
    };

    useEffect(() => {
        if (status === 'idle') {
            fetchClients();
        }
    }, [status]);

    const openModal = (client) => {
        setSelectedClient(client);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedClient(null);
        setModalIsOpen(false);
    };

    if (status === 'loading') {
        return <LayoutDashbord><div className="text-center py-12 text-gray-500">Chargement des clients...</div></LayoutDashbord>;
    }

    if (clients.length === 0) {
        return <LayoutDashbord><div className="text-center py-12 text-gray-500">Aucun client avec un paiement vérifié pour le moment.</div></LayoutDashbord>;
    }

    return (
        <LayoutDashbord>
            <div className="p-4 md:p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Clients avec paiement vérifié</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nom du client
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nom du projet
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date de paiement
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Statut
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Détails</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {clients.map(client => (
                                <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {client.clientName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {client.projectName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {client.paymentDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {client.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => openModal(client)}
                                            className="text-blue-600 hover:text-blue-900 font-semibold transition-colors duration-200"
                                        >
                                            Détails
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <DocumentModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                documents={selectedClient?.documents}
                clientName={selectedClient?.clientName}
            />
        </LayoutDashbord>
    );
}

export default Customer