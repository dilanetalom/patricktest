import React, { useEffect, useState } from 'react';
import logo from "../images/patrick.png";
import style from "../components/about/about.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset, login } from '../store/authSlice';
// import { login, reset } from '../store/authSlice'; // Import de la fonction 'login' manquante
import toast from 'react-hot-toast'

const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast.success('Connexion réussie ! Redirection...');
            setTimeout(() => {
                navigate('/dashbord');
            }, 1000);
        }
        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };


    return (
        <div className="flex h-screen bg-white">
            {/* Section de gauche (Login) */}
            <div className="hidden lg:flex w-1/2 bg-blue-950 text-white flex-col gap-4 justify-center items-center p-8 relative">
                {/* L'image de fond */}
                <div className="top-8 left-8 text-2xl font-bold">
                    <div className={`w-full h-full ${style.about}`}>
                        <img
                            src={logo}
                            alt=""
                            className="h-[500px] w-full object-cover object-center"
                        />
                    </div>
                </div>
                <div className="text-center flex items-center justify-center gap-3">
                    <p className="text-lg">
                        Je n'ai pas encore de compte ?
                    </p>
                    <Link to="/register" className="text-red-600 font-bold transition-colors duration-300 hover:border-b hover:border-gray-100">
                        Inscription
                    </Link>
                </div>
            </div>

            {/* Section de droite (Formulaire de Connexion) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-10 relative">
                {/* Cercles décoratifs en arrière-plan */}
                <div className="absolute top-10 left-10 bg-blue-300 rounded-full w-8 h-8 animate-pulse opacity-50"></div>
                <div className="absolute top-20 right-20 bg-indigo-300 rounded-full w-12 h-12 animate-bounce opacity-50"></div>
                <div className="absolute bottom-10 left-20 bg-teal-300 rounded-full w-6 h-6 animate-spin-slow opacity-50"></div>
                <div className="absolute bottom-20 right-10 bg-purple-300 rounded-full w-10 h-10 animate-ping opacity-50"></div>

                <div className="w-full max-w-lg flex flex-col gap-8 bg-white p-8 rounded-lg  z-10"> {/* Ajout de z-10 pour le formulaire */}
                    <h1 className="text-4xl font-extrabold text-gray-900">Connectez-vous</h1>
                    <p className="text-gray-600">Entrez vos identifiants pour accéder à votre compte.</p>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email <span className='text-red-600'>*</span> </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none"
                                placeholder="Votre adresse email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Mot de passe <span className='text-red-600'>*</span></label>
                            <div className="mt-1 relative">
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm pr-10 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none"
                                    placeholder="Votre mot de passe"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-gray-400"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.575 3.01 9.963 7.823a1.012 1.012 0 010 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.575-3.01-9.963-7.823z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-right mt-2">
                                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Mot de passe oublié ?</a>
                            </div>
                        </div>

                        <div>
                        <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-950 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Connexion en cours...</span>
                                </div>
                            ) : (
                                'SE CONNECTER'
                            )}
                            </button>

                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default LoginPage;