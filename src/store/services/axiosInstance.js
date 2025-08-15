import axios from 'axios';
import { API_URL } from '../url';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor pour ajouter le token automatiquement
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); // ← ici on prend sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;