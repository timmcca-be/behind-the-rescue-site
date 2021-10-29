import { useQuery } from 'react-query';
import { apiRequest } from '../utils/api';
import { GetAnimalsResponse } from './useAvailableAnimals';

export const useAllAnimals = () => useQuery(
  'animals',
  () => apiRequest<GetAnimalsResponse>('/animals'),
);
