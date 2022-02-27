import { useQuery } from 'react-query';
import { Species } from '../../models/Species';
import { apiRequest } from '../../utils/api';
import { GetAnimalsResponse } from './useAvailableAnimals';

export const useAnimals = (species: Species) => useQuery(
  ['animals', species],
  () => apiRequest<GetAnimalsResponse>(`/animals/${species.toLowerCase()}s`),
);
