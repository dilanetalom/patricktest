// src/store/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://finixbackend.macinnovafrica.com/api/';

// --- Initialisation de l'état à partir du localStorage ---
// Cette partie s'exécute une seule fois au chargement de l'application
const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
  user: storedUser,
  token: storedToken,
  allUsers: [], // Nouvel état pour stocker tous les utilisateurs
  isLoading: false,
  isSuccess: storedToken !== null, // L'état est "succès" si un token est trouvé
  isError: false,
  message: '',
};

// --- Thunks asynchrones pour les requêtes à l'API ---

// Inscription
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Connexion
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + 'login', userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Déconnexion (côté client)
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      await axios.post(API_URL + 'logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    // La suppression des données et le retour se font après la requête
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return 'Déconnexion réussie';
  } catch (error) {
    // En cas d'erreur serveur, on déconnecte quand même côté client
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Récupérer tous les utilisateurs
export const getAllUsers = createAsyncThunk('auth/getAllUsers', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return thunkAPI.rejectWithValue('Non autorisé');
    }
    const response = await axios.get(API_URL + 'users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


// --- Slice d'authentification ---
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Réinitialiser l'état
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Inscription
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message || 'Inscription échouée.';
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      // Connexion
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message || 'Connexion échouée.';
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      // Déconnexion
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isSuccess = false;
      })
      // Récupérer tous les utilisateurs
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allUsers = action.payload; // Stocke la liste des utilisateurs
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'Échec de la récupération des utilisateurs.';
        state.allUsers = [];
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
