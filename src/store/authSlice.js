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
      headers: { Authorization: `Bearer ${token}` },
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
        state.user = action.payload;
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
