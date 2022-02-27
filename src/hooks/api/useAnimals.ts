import { useQuery } from 'react-query';
import { Species } from '../../models/Species';
import { apiRequest } from '../../utils/api';
import { GetAnimalsResponse } from './useAvailableAnimals';

export type UseAnimalsOptions = {
  enabled: boolean;
};

export const useAnimals = (species: Species, options?: UseAnimalsOptions) =>
  useQuery(
    ['animals', species],
    () => apiRequest<GetAnimalsResponse>(`/animals/${species.toLowerCase()}s`),
    options,
  );
