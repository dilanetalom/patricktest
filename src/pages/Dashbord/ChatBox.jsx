// src/components/ChatBox.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

import { addMessage, fetchMessages } from '../../store/chatSlice';
import { API_URL } from '../../store/url';

const ChatBox = ({ projectId }) => {
  const dispatch = useDispatch();
  const { messages, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  // Assurer que l'ID de l'utilisateur est bien récupéré
  const currentUserId = user?.user?.id || user?.id;

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Charger les messages existants
  useEffect(() => {
    console.log("Composant ChatBox monté. Chargement des messages pour le projet:", projectId);
    if (projectId) {
      dispatch(fetchMessages(projectId));
    }
  }, [dispatch, projectId]);

  // Config Echo / Pusher
  useEffect(() => {
    if (!window.Echo) {
      window.Pusher = Pusher;
      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        forceTLS: true,
        authEndpoint: `${API_URL}broadcasting/auth`,
        auth: {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      });
    }

    const channel = window.Echo.private(`chat.${projectId}`);

    channel.subscribed(() => {
      console.log('✅ Abonné au canal chat.' + projectId);
    });

    channel.listen('MessageSent', (e) => {
      console.log('📩 Nouveau message reçu via Pusher:', e.message);
      dispatch(addMessage(e.message));
    });

    channel.error((err) => {
      console.error('❌ Erreur Echo:', err);
    });

    return () => {
      console.log('Composant ChatBox démonté. Quitte le canal chat.' + projectId);
      window.Echo.leave(`chat.${projectId}`);
    };
  }, [projectId, dispatch]);

  // Scroll automatique
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Envoi message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const token = sessionStorage.getItem('token');
        await axios.post(
          `${API_URL}projects/${projectId}/send-message`,
          { content: newMessage },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNewMessage('');
        // Le message sera ajouté via Echo
      } catch (error) {
        console.error('❌ Échec de l’envoi du message :', error);
      }
    }
  };

  const isSending = status === 'loading';

  // Formater la date en français
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="flex flex-col h-[70vh] bg-gray-100 rounded-lg shadow-md overflow-hidden">
      {/* Zone messages */}
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
          messages.map((message, idx) => {
            const messageDate = new Date(message.created_at);
            const isSender = message.user_id === currentUserId;
            
            // Ligne de débogage :
            console.log('ID Expéditeur:', message.user_id, '| ID Actuel:', currentUserId, '| Est Expéditeur:', isSender);

            // Afficher la date si nouveau jour
            const showDate =
              idx === 0 ||
              formatDate(messages[idx - 1].created_at) !==
                formatDate(message.created_at);

            return (
              <div key={message.id || idx}>
                {showDate && (
                  <div className="text-center text-xs text-gray-500 my-2">
                    📅 {formatDate(message.created_at)}
                  </div>
                )}

                <div
                  className={`flex items-end gap-2 ${
                    isSender ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex flex-col max-w-sm px-4 py-2 rounded-xl shadow-md ${
                      isSender
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <span
                      className={`font-bold text-xs ${
                        isSender ? 'text-white' : 'text-gray-600'
                      }`}
                    >
                      {message.user?.firstName || 'Utilisateur'}
                    </span>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {messageDate.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-4 bg-white border-t border-gray-200 flex"
      >
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
