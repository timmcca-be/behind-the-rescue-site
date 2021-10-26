import { useQuery } from "react-query";
import { AdoptionEventDto } from "../models/AdoptionEventDto";
import { apiRequest } from "../utils/api";

export type GetAdoptionEventsResponse = {
  adoptionEvents: AdoptionEventDto[];
}

export const useAdoptionEvents = () => useQuery(
  'adoption-events',
  async () => apiRequest<GetAdoptionEventsResponse>('/adoption-events'),
);
