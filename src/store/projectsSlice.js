// src/features/projects/projectsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://finixbackend.macinnovafrica.com/api/'; 
// const API_URL = 'http://127.0.0.1:8000/api/'; 

// Action pour créer un nouveau projet
export const createProject = createAsyncThunk('projects/createProject', async ({ projectData, token }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}projects`, projectData, {
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




  export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { rejectWithValue }) => {
    try {
      // We only need the token for the API call
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      
      if (!token) {
        // Rejects if the token is missing to prevent an invalid API call
        return rejectWithValue({ message: 'Authentication token is missing.' });
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // The second argument is the config object, which contains headers.
      const response = await axios.get(`${API_URL}projects`, config, );
      
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      if (error.response) {
        // The API returned an error object. Return it.
        return rejectWithValue(error.response.data);
      } else {
        // A network or other error occurred. Return a general message.
        return rejectWithValue({ message: error.message });
      }
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
  reducers: {
    resetCreateProjectStatus: (state) => {
      state.createProjectStatus = { status: 'idle', error: null };
    }
  },
  extraReducers: (builder) => {
    builder




    .addCase(fetchProjects.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(fetchProjects.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.projects = action.payload; // On stocke les projets récupérés
    })
    .addCase(fetchProjects.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || action.error.message;
    })
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

export const { resetCreateProjectStatus } = projectsSlice.actions;
export default projectsSlice.reducer;
