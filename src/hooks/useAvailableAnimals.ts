import { useQuery, UseQueryOptions } from 'react-query';
import { AnimalDto } from '../models/AnimalDto';
import { Species } from '../models/Species';
import { apiRequest } from '../utils/api';

export type GetAnimalsResponse = {
  animals: AnimalDto[];
}

export const useAvailableAnimals = (
  species: Species,
  date: string,
  options?: UseQueryOptions<GetAnimalsResponse>
) => useQuery(
  'animals',
  async () => apiRequest<GetAnimalsResponse>(`/available-animals/${date}/${species.toLowerCase()}s`),
);
