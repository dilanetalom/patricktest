// src/features/projects/projectsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Crée une instance d'Axios avec l'URL de base pour éviter la répétition

// const API_URL = 'http://127.0.0.1:8000/api/';
const API_URL = 'https://finixbackend.macinnovafrica.com/api/';
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Action pour créer un nouveau projet
export const createProject = createAsyncThunk(
  'projects/createProject',
  async ({ projectData, token }, { rejectWithValue }) => {
    try {
      // The token is now passed directly as a parameter
      const response = await axiosInstance.post('projects', projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
         
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      // It's a good practice to log the full error response to the console
      // to see the validation errors from the backend.
      console.error('Error creating project:', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Action pour récupérer tous les projets
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue({ message: 'Authentication token is missing.' });
      }

      const response = await axiosInstance.get('projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action pour que l'admin accepte une proposition
export const acceptProposal = createAsyncThunk(
  'projects/acceptProposal',
  async (projectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post(
        `projects/${projectId}/accept-proposal`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action pour que l'admin refuse et entre en négociation
export const refuseAndNegotiate = createAsyncThunk(
  'projects/refuseAndNegotiate',
  async (projectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post(
        `projects/${projectId}/negotiate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Slice principal
const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
    createProjectStatus: {
      status: 'idle',
      error: null,
    },
  },
  reducers: {
    // Réinitialise l'état de la création de projet à sa valeur initiale
    resetCreateProjectStatus: (state) => {
      // 💡 Correction ici : réinitialise l'objet entier, pas seulement une valeur
      state.createProjectStatus = {
        status: 'idle',
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Logique pour la création de projet
      .addCase(createProject.pending, (state) => {
        state.createProjectStatus.status = 'loading'; // 💡 Accédez à la propriété status
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.createProjectStatus.status = 'succeeded'; // 💡 Accédez à la propriété status
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.createProjectStatus.status = 'failed'; // 💡 Accédez à la propriété status
        state.createProjectStatus.error = action.payload || action.error.message; // 💡 Stockez l'erreur dans l'objet
      })

      // Logique pour la récupération des projets
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
    
      // Logique pour l'acceptation de proposition (admin)
      .addCase(acceptProposal.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(acceptProposal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.projects.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload; // Met à jour le projet dans le tableau
        }
      })
      .addCase(acceptProposal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      // Logique pour la négociation de proposition (admin)
      .addCase(refuseAndNegotiate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refuseAndNegotiate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.projects.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(refuseAndNegotiate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetCreateProjectStatus } = projectsSlice.actions;
export default projectsSlice.reducer;