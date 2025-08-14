// src/components/ChatBox.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'; // We need to import axios
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Import our chatSlice actions and thunks
import { addMessage, fetchMessages } from '../../store/chatSlice';


// const API_URL = 'http://127.0.0.1:8000/api/';
const API_URL = 'https://finixbackend.macinnovafrica.com/api/';

const ChatBox = ({ projectId }) => {
    const dispatch = useDispatch();
    const { messages, status, error } = useSelector((state) => state.chat);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null); // Ref to scroll to the bottom of the chat

    // Déplacez le hook useSelector en dehors de la boucle
    const currentUserId = useSelector((state) => state.auth.user.id);
    let lastMessageDate = null;

    // Fetch conversation messages when the component mounts
    useEffect(() => {
        if (projectId) {
            dispatch(fetchMessages(projectId));
        }
    }, [dispatch, projectId]);

    // WebSocket configuration for real-time chat
    useEffect(() => {
        // Check if Pusher is already configured
        if (!window.Echo) {
            window.Pusher = Pusher;
            window.Echo = new Echo({
                broadcaster: 'pusher',
                key: import.meta.env.VITE_PUSHER_APP_KEY,
                cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
                forceTLS: true,
                authEndpoint: `${API_URL}broadcasting/auth`, // Needed for private channels
                auth: {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            });
        }

        // Subscribe to the private channel
        const channel = window.Echo.private(`chat.${projectId}`);

        // Listen for new messages
        channel.listen('MessageSent', (e) => {
            dispatch(addMessage(e.message));
        });

        // Clean up the subscription when the component unmounts
        return () => {
            window.Echo.leaveChannel(`chat.${projectId}`);
        };
    }, [projectId, dispatch]);

    // Effect to scroll to the latest message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post( // <-- Capturez la réponse
                    `${API_URL}projects/${projectId}/send-message`,
                    { content: newMessage },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // 1. Ajoutez le message à l'état Redux
                // Le message retourné par l'API contient toutes les informations (ID, utilisateur, etc.)
                dispatch(addMessage(response.data));

                // 2. Réinitialisez le champ de saisie
                setNewMessage('');
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

 
    const isSending = status === 'loading';

    return (
        <div className="flex flex-col h-[70vh] bg-gray-100 rounded-lg shadow-md overflow-hidden">


      <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {status === 'loading' ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500">Chargement des messages...</p>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500 text-center">
                            Aucune négociation entamée pour ce projet. <br />
                            Soyez le premier à envoyer un message !
                        </p>
                    </div>
                ) : (
                    messages.map((message, index) => {
                        // Crée un objet Date à partir du timestamp du message
                        const messageDate = new Date(message.created_at);
                        const messageDay = messageDate.toLocaleDateString();

                        const showDateSeparator = messageDay !== lastMessageDate;
                        lastMessageDate = messageDay;
                        
                        return (
                            <React.Fragment key={message.id}>
                                {/* Affiche un séparateur de date si c'est un nouveau jour */}
                                {showDateSeparator && (
                                    <div className="flex justify-center my-4">
                                        <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                                            {messageDay}
                                        </span>
                                    </div>
                                )}

                                <div
                                    className={`flex items-end gap-2 ${
                                        message.user_id === currentUserId ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    <div
                                        className={`flex flex-col max-w-sm px-4 py-2 rounded-xl shadow-md ${
                                            message.user_id === currentUserId
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                        }`}
                                    >
                                        {message.user_id !== currentUserId && (
                                            <span className="font-bold text-sm text-gray-600">
                                                {message.user.firstName}
                                            </span>
                                        )}
                                        <p className="text-sm">
                                            {message.content}
                                        </p>
                                    </div>

                                    {/* Affiche l'heure du message */}
                                    <span className="text-xs text-gray-500">
                                        {messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </React.Fragment>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

        {/* Le formulaire d'envoi de message reste le même */}
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
        }} className="p-4 bg-white border-t border-gray-200 flex">
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSending}
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg transition-colors duration-200"
                disabled={isSending || !newMessage.trim()}
            >
                Envoyer
            </button>
        </form>
    </div>  
    );
};

export default ChatBox;