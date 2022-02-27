import { useQuery } from 'react-query';
import { AnimalDto } from '../../models/AnimalDto';
import { Species } from '../../models/Species';
import { apiRequest } from '../../utils/api';

export type GetAnimalsResponse = {
  animals: AnimalDto[];
};

export type UseAvailableAnimalsOptions = {
  enabled: boolean;
};

export const useAvailableAnimals = (
  species: Species,
  date: string,
  options?: UseAvailableAnimalsOptions,
) =>
  useQuery(
    ['animals', species],
    () =>
      apiRequest<GetAnimalsResponse>(
        `/animals/available/${date}/${species.toLowerCase()}s`,
      ),
    options,
  );
