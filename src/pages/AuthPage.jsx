import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    // État pour gérer la visibilité du mot de passe
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Ici, vous ajouteriez la logique pour la connexion
        console.log('Formulaire de connexion soumis');
        navigate("/dashbord")
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transition-all duration-300 transform hover:scale-105">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Connexion
                </h2>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Adresse e-mail"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            name="email" 
                            required
                        />
                        {/* Icône d'e-mail */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12h-5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12h-5z" />
                        </svg>
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} 
                            placeholder="Mot de passe"
                            className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            name="password" // Ajout du nom
                            required
                        />
                        {/* Icône de mot de passe */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15a4 4 0 11-8 0 4 4 0 018 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9a3 3 0 01-6 0 3 3 0 016 0z" />
                        </svg>
                        {/* Icône pour afficher/masquer le mot de passe */}
                        <button
                            type="button" // Important: type="button" pour éviter la soumission du formulaire
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showPassword ? (
                                // Icône "œil ouvert"
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            ) : (
                                // Icône "œil barré"
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.981 18.75A7.498 7.498 0 0112 15.75a7.498 7.498 0 017.019 2.99A1.006 1.006 0 0020 19.5c.38 0 .74-.11 1.041-.302A7.5 7.5 0 0012 21.75a7.5 7.5 0 00-9.041-3.002 1.006 1.006 0 00.022-1.448zM12 12a3 3 0 100-6 3 3 0 000 6z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        
                        className="w-full bg-blue-950 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                    >
                        Se connecter
                    </button>
                </form>

                <p className="mt-6 text-center text-blue-950">
                    Pas encore de compte ?
                    <a href="/register" className="ml-2 font-bold text-red-600 hover:text-red-800 transition-colors duration-200">
                        S'inscrire
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;