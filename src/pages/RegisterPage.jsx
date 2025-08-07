import React from 'react';
import logo from "../images/patrick.png"
import style from "../components/about/about.module.css";
import { Link } from 'react-router-dom';


const RegisterPage = () => {
    return (
        <div className="flex h-screen bg-white">
            {/* Section de gauche (Connexion) */}
            <div className="hidden lg:flex w-1/2 bg-blue-950 text-white flex-col gap-4 justify-center items-center  p-8 relative">
                {/* L'image de fond pourrait être ajoutée ici si tu le souhaites */}
                <div className=" top-8 left-8 text-2xl font-bold">
                    <div className={`w-full h-full ${style.about}`}>
                        <img
                            src={logo}
                            alt=""
                            className="h-[500px] w-full object-cover object-center"
                        />
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
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Your first name"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Your last name"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Enter your email address"
                            />
                        </div>

                        {/* Champs ajoutés pour le pays, la ville, le quartier et le numéro de téléphone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Your country"
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Your city"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Neighborhood</label>
                                <input
                                    type="text"
                                    id="neighborhood"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Your neighborhood"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Your phone number"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1 relative">
                                <input
                                    type="password"
                                    id="password"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm pr-10 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter a strong password"
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
                        </div>

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="terms"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                I accept BoardMe's <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-950 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                SIGN UP
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;