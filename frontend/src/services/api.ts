import axios from 'axios';
import { HabitabilityResult, PlanetClassification, TransitResult } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  async predictHabitability(data: {
    radius: number;
    orbit: number;
    starType: string;
    starMass?: number;
    starTemp?: number;
  }): Promise<HabitabilityResult> {
    const response = await axios.post(`${API_BASE_URL}/habitability`, data);
    return response.data;
  },

  async classifyPlanet(data: {
    radius: number;
    mass: number;
    orbit: number;
  }): Promise<PlanetClassification> {
    const response = await axios.post(`${API_BASE_URL}/classify`, data);
    return response.data;
  },

  async generateTransit(planetName: string): Promise<TransitResult> {
    const response = await axios.post(`${API_BASE_URL}/transit/generate`, { planetName });
    return response.data;
  },

  async analyzeAll(data: {
    radius: number;
    orbit: number;
    mass: number;
    starType: string;
    starMass?: number;
    starTemp?: number;
  }) {
    const response = await axios.post(`${API_BASE_URL}/analyze`, data);
    return response.data;
  }
};
