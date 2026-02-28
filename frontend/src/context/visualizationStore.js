import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useVisualizationStore = create((set, get) => ({
  algorithms: [],
  structures: [],
  selectedAlgorithm: null,
  selectedStructure: null,
  simulationState: null,
  isRunning: false,
  currentStep: 0,
  animationSpeed: 1,
  loading: false,
  error: null,

  fetchAlgorithms: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/algorithms`);
      set({ algorithms: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchStructures: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/structures`);
      set({ structures: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  runSimulation: async (algorithm, input, token) => {
    set({ loading: true, error: null, isRunning: true, currentStep: 0 });
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(`${API_URL}/simulate/run`, { algorithm, input }, { headers });
      set({
        simulationState: response.data,
        loading: false,
      });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message;
      set({ error: errorMsg, loading: false, isRunning: false });
      throw new Error(errorMsg);
    }
  },

  setCurrentStep: (step) => set({ currentStep: step }),

  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),

  setSelectedAlgorithm: (algorithm) => set({ selectedAlgorithm: algorithm }),

  setSelectedStructure: (structure) => set({ selectedStructure: structure }),

  reset: () => set({
    simulationState: null,
    isRunning: false,
    currentStep: 0,
    error: null,
  }),

  clearError: () => set({ error: null }),
}));
