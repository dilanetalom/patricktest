// src/features/projects/projectsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './services/axiosInstance';
import axios from 'axios';
import { API_URL } from './url';


// --- Thunks ---

// Créer un projet
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('projects', projectData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Récupérer tous les projets
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('projects');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);



export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`projects/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Accepter une proposition (admin)
export const acceptProposal = createAsyncThunk(
  'projects/acceptProposal',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`projects/${projectId}/accept-proposal`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Refuser et négocier (admin)
export const refuseAndNegotiate = createAsyncThunk(
  'projects/refuseAndNegotiate',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`projects/${projectId}/negotiate`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);



export const signContract = createAsyncThunk(
  'projects/signContract',
  async ({ projectId, signature }, { getState, rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}projects/${projectId}/sign-client`,
        { signature },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Retourne la réponse en cas de succès
      return response.data.project;
    } catch (error) {
      // ✅ Correction ici : vérifiez l'existence de error.response
      if (error.response) {
        // Le serveur a répondu avec un code d'erreur HTTP
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // La requête a été faite, mais aucune réponse n'a été reçue
        return rejectWithValue({ message: 'Aucune réponse du serveur.' });
      } else {
        // Quelque chose s'est produit lors de la configuration de la requête
        return rejectWithValue({ message: error.message });
      }
    }
  }
);


export const submitPaymentProof = createAsyncThunk(
  'projects/submitPaymentProof',
  async ({ projectId, proof }, { getState, rejectWithValue }) => {
    console.log(projectId);

    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}projects/${projectId}/submit-proof`,
        proof, // "proof" est déjà un FormData
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // Retourne le projet mis à jour
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk pour la validation du paiement par l'admin
export const verifyPaymentsByProject = createAsyncThunk(
  'projects/verifyPaymentsByProject',
  async ({ projectId, paymentIds }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}projects/${projectId}/verify-payments`, // Nouvelle route
        { payment_ids: paymentIds }, // Envoi des IDs dans le corps de la requête
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Action pour l'approbation du contrat par l'admin
export const approveContract = createAsyncThunk(
  'projects/approveContract',
  async (projectId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(API_URL + projectId + '/approve', null, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);





// --- Slice ---
const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],      
  project: null,
    status: 'idle',
    error: null,
    createProjectStatus: { status: 'idle', error: null },
  },
  reducers: {
    resetCreateProjectStatus: (state) => {
      state.createProjectStatus = { status: 'idle', error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      // Création projet
      .addCase(createProject.pending, (state) => {
        state.createProjectStatus.status = 'loading';
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.createProjectStatus.status = 'succeeded';
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.createProjectStatus.status = 'failed';
        state.createProjectStatus.error = action.payload || action.error.message;
      })


    .addCase(submitPaymentProof.fulfilled, (state, action) => {
        // La payload est maintenant l'objet { message, project }
        const updatedProject = action.payload.project; 
        const index = state.projects.findIndex(p => p.id === updatedProject.id);
        if (index !== -1) {
            state.projects[index] = updatedProject;
        }
    })
      .addCase(verifyPaymentsByProject.fulfilled, (state, action) => {
        const updatedPayment = action.payload.payment;
        // Si tu stockes les projets avec leurs paiements
        const project = state.projects.find(p => p.id === updatedPayment.project_id);
        if (project) {
          project.status = 'payment_verified';
        }
        state.success = action.payload.message;
      })


      // Récupération projets
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


    .addCase(fetchProjectById.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchProjectById.fulfilled, (state, action) => {
      state.project = action.payload; // un seul projet
      state.status = "succeeded";
    })
    .addCase(fetchProjectById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })




    .addCase(signContract.fulfilled, (state, action) => {
      state.projects = action.payload; // Met à jour l'objet projet avec les données du serveur
    })
    .addCase(signContract.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase(approveContract.fulfilled, (state, action) => {
      state.projects = action.payload; // Met à jour l'objet projet avec les données du serveur
    })
    .addCase(approveContract.rejected, (state, action) => {
      state.error = action.payload;
    })

    // Accepter proposition
    .addCase(acceptProposal.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(acceptProposal.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.projects[index] = action.payload;
    })
    .addCase(acceptProposal.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || action.error.message;
    })

    // Refuser et négocier
    .addCase(refuseAndNegotiate.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(refuseAndNegotiate.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.projects[index] = action.payload;
    })
    .addCase(refuseAndNegotiate.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || action.error.message;
    });
},
});

export const { resetCreateProjectStatus } = projectsSlice.actions;
export default projectsSlice.reducer;
