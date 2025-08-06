import React from 'react';

const RegisterPage = () => {
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Ajoutez ici la logique pour l'inscription, par exemple une requête API
        console.log('Formulaire d\'inscription soumis');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    S'inscrire
                </h2>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            required
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Adresse e-mail"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            required
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12h-5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12h-5z" />
                        </svg>
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            required
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15a4 4 0 11-8 0 4 4 0 018 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9a3 3 0 01-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-950 text-white font-semibold py-3 px-6 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                    >
                        S'inscrire
                    </button>
                </form>

                <p className="mt-6 text-center text-blue-950">
                    Vous avez déjà un compte ?
                    <a href="/login" className="ml-2 font-bold text-red-600 hover:text-blue-800 transition-colors duration-200">
                        Se connecter
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;