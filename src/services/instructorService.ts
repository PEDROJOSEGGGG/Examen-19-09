import { apiClient } from './api';
import type { Instructor } from '../types';

export type CreateInstructorDto = Omit<Instructor, 'id'>;

export const instructorService = {
  getAll: async (): Promise<Instructor[]> => {
    const response = await apiClient.get<Instructor[]>('/instructors');
    return response.data;
  },

  create: async (data: CreateInstructorDto): Promise<Instructor> => {
    const response = await apiClient.post<Instructor>('/instructors', data);
    return response.data;
  },
};