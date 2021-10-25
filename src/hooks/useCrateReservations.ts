import { useQuery } from "react-query";
import { CrateReservation } from "../models/CrateReservation";
import { apiRequest } from "../utils/api";

export type GetCrateReservationsResponse = {
  crateReservations: CrateReservation[];
}

export const useCrateReservations = (adoptionEventID: number, date?: string) => useQuery(
  ['adoption-event', adoptionEventID, 'date', date, 'crate-reservations'],
  () => apiRequest<GetCrateReservationsResponse>(
    `/adoption-events/${adoptionEventID}/dates/${date}/crate-reservations`
  ),
  { enabled: date !== undefined },
)