import { useQuery } from "react-query";
import { AdoptionEvent } from "../models/AdoptionEvent";
import { apiRequest } from "../utils/api";

export type GetAdoptionEventsResponse = {
  adoptionEvents: AdoptionEvent[];
}

export const useAdoptionEvents = () => useQuery(
  'adoption-events',
  async () => apiRequest<GetAdoptionEventsResponse>('/adoption-events'),
);
