// src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from './url';

axios.defaults.withCredentials = true;

// --- Register ---
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + 'register', userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Erreur lors de l\'inscription');
  }
});

// --- Login ---
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + 'login', userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Erreur lors de la connexion');
  }
});

// --- Logout ---
export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post(API_URL + 'logout', {}, { withCredentials: true });
});

// --- Get Profile ---
export const getProfile = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) throw new Error('Aucun token');
    const response = await axios.get(API_URL + 'me', {
      headers: { 
        Authorization: `Bearer ${token}`,
         'Content-Type': 'multipart/form-data',
       },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Impossible de récupérer le profil');
  }
});

// --- Get All Users ---
export const getAllUsers = createAsyncThunk('auth/getAllUsers', async (_, thunkAPI) => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) throw new Error('Aucun token');
    const response = await axios.get(API_URL + 'users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Impossible de récupérer les utilisateurs');
  }
});


export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
    async (userData, thunkAPI) => {
   
      
    try {
      const token = sessionStorage.getItem('token');
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');

      if (!token) {
        throw new Error('Aucun token');
      }
      if (!user?.id) {
        throw new Error('Utilisateur non trouvé en session');
      }

      // Important : changer axios.put en axios.post pour que le _method: 'PATCH' fonctionne
      const response = await axios.put(
        `${API_URL}users/${user.id}`, 
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Le Content-Type n'est pas nécessaire pour FormData, le navigateur s'en charge.
          },
        }
      );

      // Met à jour les données de l'utilisateur en session avec la nouvelle réponse
      sessionStorage.setItem('user', JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Impossible de mettre à jour le profil'
      );
    }
  }
);

// --- Initial State ---
const storedToken = sessionStorage.getItem('token');
const storedUser = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  users: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// --- Slice ---
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => { state.isLoading = true; })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        sessionStorage.setItem('token', action.payload.token);
        sessionStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'Inscription échouée';
      })

      // Login
      .addCase(login.pending, (state) => { state.isLoading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        sessionStorage.setItem('token', action.payload.token);
        sessionStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'Connexion échouée';
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      })

      // Get Profile
      .addCase(getProfile.fulfilled, (state, action) => {
        // CORRECTION: Assurez-vous que la structure de l'utilisateur est la même
        // que celle de l'action 'login'.
        // Si la réponse de l'API est { user: { ... } }, utilisez action.payload.user.
        // Si elle est directement { ... }, utilisez action.payload.
        // Puisque votre action login utilise 'action.payload.user', nous faisons de même ici.
        state.user = action.payload.user; // <--- Ligne corrigée
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      })

      // Get All Users
      .addCase(getAllUsers.pending, (state) => { state.isLoading = true; })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'Impossible de récupérer les utilisateurs';
      });
  },
});

export const { reset } = authSlice.actions; // actions du slice
export default authSlice.reducer;
