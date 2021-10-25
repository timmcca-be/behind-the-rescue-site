import { useQuery } from "react-query";
import { AdoptionEvent } from "../models/AdoptionEvent";
import { apiRequest } from "../utils/api";

export type GetAdoptionEventResponse = {
  adoptionEvent: AdoptionEvent;
}

export const useAdoptionEvent = (adoptionEventID: number) => useQuery(
  ['adoption-event', adoptionEventID],
  () => apiRequest<GetAdoptionEventResponse>(`/adoption-events/${adoptionEventID}`),
);
