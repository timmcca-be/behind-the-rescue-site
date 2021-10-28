import { useMutation } from 'react-query';
import { CrateSize } from '../models/CrateSize';
import { apiRequest } from '../utils/api';

export type ReserveCrateRequest = {
  crateSize: CrateSize;
  animalIDs: number[];
  fullyVaccinated: boolean;
}

export const useReserveCrate = (
  adoptionEventID: number,
  date?: string,
) => useMutation(
  ['reserve-crate', adoptionEventID, 'date', date],
  (request: ReserveCrateRequest) => apiRequest(`/adoption-events/${adoptionEventID}/dates/${date}/crate-reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request),
  }),
);
