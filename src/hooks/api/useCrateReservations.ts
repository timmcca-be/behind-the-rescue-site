import { useQuery } from 'react-query';
import { CrateReservationDto } from '../../models/CrateReservationDto';
import { CrateStackDto } from '../../models/CrateStackDto';
import { apiRequest } from '../../utils/api';

export type GetCrateReservationsResponse = {
  crateReservations: CrateReservationDto[];
  crateStacks: CrateStackDto[];
};

export const makeCrateReservationsKey = (
  adoptionEventID: number,
  date?: string,
) => ['adoption-event', adoptionEventID, 'date', date, 'crate-reservations'];

export const useCrateReservations = (adoptionEventID: number, date?: string) =>
  useQuery(
    makeCrateReservationsKey(adoptionEventID, date),
    () =>
      apiRequest<GetCrateReservationsResponse>(
        `/adoption-events/${adoptionEventID}/dates/${date}/crate-reservations`,
      ),
    { enabled: date !== undefined },
  );
