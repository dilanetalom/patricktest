// src/features/projects/projectsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://finixbackend.macinnovafrica.com/api/'; // Adapte l'URL de ton API Laravel

// Action pour créer un nouveau projet
export const createProject = createAsyncThunk('projects/createProject', async ({ projectData, token }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, projectData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// ... (Ajoute ici d'autres actions comme proposePrice, etc.)

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
    // C'est la ligne CRUCIALE qui manquait. Elle initialise l'état.
    createProjectStatus: { status: 'idle', error: null }, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ... (autres cases pour fetchProjects, proposePrice, etc.)
      .addCase(createProject.pending, (state) => {
        state.createProjectStatus.status = 'loading';
        state.createProjectStatus.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.createProjectStatus.status = 'succeeded';
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.createProjectStatus.status = 'failed';
        state.createProjectStatus.error = action.payload || action.error.message;
      });
  },
});

export default projectsSlice.reducer;
