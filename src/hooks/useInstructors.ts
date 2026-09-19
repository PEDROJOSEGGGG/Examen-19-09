import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instructorService, type CreateInstructorDto } from '../services/instructorService';

export const instructorKeys = {
  all: ['instructors'] as const,
};

export function useInstructors() {
  return useQuery({
    queryKey: instructorKeys.all,
    queryFn: instructorService.getAll,
  });
}

export function useCreateInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInstructorDto) => instructorService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: instructorKeys.all });
    },
  });
}