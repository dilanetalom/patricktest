import React, { useEffect, useState } from 'react';
import logo from "../images/patrick.png"
import style from "../components/about/about.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset, register } from '../store/authSlice';
import toast from 'react-hot-toast'


const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        country: '',
        city: '',
        neighborhood: '',
        phone: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [view, setView] = useState(false)

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    // Effet pour gérer notifications et redirection
    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }

        if (isSuccess && user) {
            toast.success('Connexion réussie ! Redirection...');
            const timer = setTimeout(() => {
                console.log(user);

                if (user.role === 'client') {
                    navigate('/bords');
                } else {
                    navigate('/bord');
                }
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isError, isSuccess, message, user, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
    };
    return (
        <div className="flex h-screen bg-white">
            {/* Section de gauche (Connexion) */}
            <div className="hidden lg:flex w-1/2 bg-blue-950 text-white flex-col gap-4 justify-center items-center  p-8 relative">
                {/* L'image de fond pourrait être ajoutée ici si tu le souhaites */}
                <div className=" top-8 left-8 text-2xl font-bold">
                    <div className={`w-56 h-56 bg-gray-50 rounded-full flex items-center justify-center`}>
                        {/* <img
              src={logo}
              alt=""
              className="h-[500px] w-full object-cover object-center"
            /> */}
                        <span className="text-2xl font-extrabold tracking-wider  flex items-center">
                            <span className="px-3 py-1 bg-blue-950 text-[#F6F6F6] rounded-md shadow-md">T</span>
                            <span className="ml-1 px-3 py-1 border-2 border-blue-950 text-blue-950 rounded-md">D</span>
                        </span>


                    </div>
                </div>
                <div className="text-center flex items-center justify-center gap-3 ">
                    {/* <h2 className="text-lg font-bold mb-4">Already Signed up?</h2> */}
                    <p className="text-lg ">
                        J'ai déjà un compte !
                    </p>
                    <Link to="/login" className=" text-red-600 font-bold  transition-colors duration-300 hover:border-b hover:border-gray-100">
                        Connexion
                    </Link>
                </div>
            </div>

            {/* Section de droite (Inscription) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-10">
                <div className="absolute top-10 left-10 bg-blue-300 rounded-full w-8 h-8 animate-pulse opacity-50"></div>
                <div className="absolute top-20 right-20 bg-indigo-300 rounded-full w-12 h-12 animate-bounce opacity-50"></div>
                <div className="absolute bottom-10 left-20 bg-teal-300 rounded-full w-6 h-6 animate-spin-slow opacity-50"></div>
                <div className="absolute bottom-20 right-10 bg-purple-300 rounded-full w-10 h-10 animate-ping opacity-50"></div>
                <div className="w-full max-w-lg flex flex-col gap-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Créer un compte</h1>
                    {/* <p className="text-gray-500 mb-8">
                        Let's get you all set up so you can start creating your first onboarding experience.
                    </p> */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nom(s) <span className='text-red-600'>*</span></label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Votre nom"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Prenom(s)<span className='text-red-600'>*</span></label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Votre prenom"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className='text-red-600'>*</span></label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                id="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Votre email"
                            />
                        </div>

                        {/* Champs ajoutés pour le pays, la ville, le quartier et le numéro de téléphone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Pays <span className='text-red-600'>*</span></label>
                                <input
                                    type="text"
                                    name="country"
                                    required
                                    value={formData.country}
                                    onChange={handleChange}
                                    id="country"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Votre pays"
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville <span className='text-red-600'>*</span></label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    required
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Votre ville"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Quatier</label>
                                <input
                                    type="text"
                                    id="neighborhood"
                                    name="neighborhood"
                                    value={formData.neighborhood}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Votre quartier"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone <span className='text-red-600'>*</span></label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Votre téléphone"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe <span className='text-red-600'>*</span></label>
                            <div className="mt-1 relative">
                                <input
                                    type={view ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm pr-10 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Mot de passe"
                                />
                                <div onClick={() => setView(!view)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
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
                        </div>

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="terms"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                J'accepte <a href="#" className="text-blue-600 hover:underline">Les Termes & Conditions</a>
                            </label>
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
                                        <span>Inscription en cours...</span>
                                    </div>
                                ) : (
                                    'S\'INSCRIRE'
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;