import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { trainingService, type CreateTrainingDto } from '../services/trainingService';

export const trainingKeys = {
  all: ['trainings'] as const,
};

export function useTrainings() {
  return useQuery({
    queryKey: trainingKeys.all,
    queryFn: trainingService.getAll,
  });
}

export function useCreateTraining() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTrainingDto) => trainingService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trainingKeys.all });
    },
  });
}