import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from './url';



// Action asynchrone pour récupérer les messages d'une conversation
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (projectId, { rejectWithValue }) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('Aucun token');
      const response = await axios.get(`${API_URL}projects/${projectId}/conversation`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Définition du slice pour le chat
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      // Ajoute un nouveau message au tableau
      state.messages.push(action.payload);
    },
    resetChatState: (state) => {
      // Réinitialise l'état du chat
      state.messages = [];
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload; // Remplit le tableau avec les messages récupérés
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { addMessage, resetChatState } = chatSlice.actions;

export default chatSlice.reducer;