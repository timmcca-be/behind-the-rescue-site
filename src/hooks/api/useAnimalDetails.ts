import { useQuery } from "react-query";
import { AnimalDetailsDto } from "../../models/AnimalDetailsDto";
import { apiRequest } from "../../utils/api";

export type GetAnimalDetailsResponse = {
  animal: AnimalDetailsDto;
}

export const useAnimalDetails = (animalID: number) => useQuery(
  ['animal', animalID],
  () => apiRequest<GetAnimalDetailsResponse>(`/animals/${animalID}`),
);
