// src/components/Notifications.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify'; // Assurez-vous d'avoir installé react-toastify et sa CSS

const Notifications = () => {
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        // La connexion à Echo doit être dans un seul useEffect
        if (user && user.id) {
            // Assurez-vous que Echo est correctement initialisé
            if (!window.Echo) {
                window.Pusher = Pusher;
                window.Echo = new Echo({
                    broadcaster: 'pusher',
                    key: import.meta.env.VITE_PUSHER_APP_KEY,
                    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
                    forceTLS: true,
                    authEndpoint: `http://127.0.0.1:8000/api/broadcasting/auth`,
                    auth: {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    },
                });
            }
            
            // Écoutez le canal de notification de l'utilisateur
            const channel = window.Echo.private(`App.Models.User.${user.id}`);
            
            // Écoutez les événements de notification
            channel.notification((notification) => {
                // Affichez la notification avec react-toastify
                toast.info(`Nouveau message: ${notification.content}`);
            });

            // Nettoyage de l'abonnement lors du démontage du composant
            return () => {
                window.Echo.leaveChannel(`App.Models.User.${user.id}`);
            };
        }
    }, [user]);

    return null; // Ce composant est non visuel
};

export default Notifications;