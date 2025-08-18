import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import logo from '../images/patrick.png';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [view, setView] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  // Effet pour gérer notifications et redirection
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess && user?.role) { // on attend que user.role existe
    toast.success('Connexion réussie ! Redirection...');
    const timer = setTimeout(() => {
      if (user.role === 'client') {
        navigate('/bords'); // client -> /bords
      } else {
        navigate('/bord'); // admin -> /bord
      }
    }, 500); // 500ms suffisent

    return () => clearTimeout(timer);
  
    }
  }, [isError, isSuccess, message, user, navigate, dispatch]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="hidden lg:flex w-1/2 bg-blue-950 text-white flex-col justify-center items-center p-8 relative">
        <div className=" top-8 left-8 text-2xl font-bold">
                           <div className={`w-full h-full bg-gray-50 rounded-full`}>
                               <img
                                   src={logo}
                                   alt=""
                                   className="h-[500px] w-full object-cover object-center"
                               />
                           </div>
                       </div>
        <div className="text-center mt-6 flex items-center gap-3">
          <p>Je n'ai pas encore de compte ?</p>
          <Link
            to="/register"
            className="text-red-600 font-bold hover:border-b hover:border-gray-100 transition"
          >
            Inscription
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 relative">
        <div className="absolute top-10 left-10 bg-blue-300 rounded-full w-8 h-8 animate-pulse opacity-50"></div>
        <div className="absolute top-20 right-20 bg-indigo-300 rounded-full w-12 h-12 animate-bounce opacity-50"></div>
        <div className="absolute bottom-10 left-20 bg-teal-300 rounded-full w-6 h-6 animate-spin-slow opacity-50"></div>
        <div className="absolute bottom-20 right-10 bg-purple-300 rounded-full w-10 h-10 animate-ping opacity-50"></div>

        <div className="w-full max-w-lg flex flex-col gap-8 bg-white p-8 rounded-lg z-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Connectez-vous</h1>
          <p className="text-gray-600">Entrez vos identifiants pour accéder à votre compte.</p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Votre adresse email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Mot de passe <span className="text-red-600">*</span>
              </label>
              <div className="mt-1 relative">
                <input
                  type={view ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Votre mot de passe"
                  className="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <div
                  onClick={() => setView(!view)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  {view ? '👁️' : '🙈'}
                </div>
              </div>
              <div className="text-right mt-2">
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-950 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? 'Connexion en cours...' : 'SE CONNECTER'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
