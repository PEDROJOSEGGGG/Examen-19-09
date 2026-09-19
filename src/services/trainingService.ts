import { apiClient } from './api';
import type { Training } from '../types';

export type CreateTrainingDto = Omit<Training, 'id'>;

export const trainingService = {
  getAll: async (): Promise<Training[]> => {
    const response = await apiClient.get<Training[]>('/trainings');
    return response.data;
  },

  create: async (data: CreateTrainingDto): Promise<Training> => {
    const response = await apiClient.post<Training>('/trainings', data);
    return response.data;
  },
};