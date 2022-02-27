import { useMutation, useQueryClient } from 'react-query';
import { CanceledCrateReservationDto } from '../../models/CanceledCrateReservationDto';
import { apiRequest } from '../../utils/api';
import { makeCrateReservationsKey } from './useCrateReservations';

type CancelCrateReservationResponse = {
  crateReservation: CanceledCrateReservationDto;
};

export const useCancelCrateReservation = (crateReservationID: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['cancel-crate-reservation', crateReservationID],
    () =>
      apiRequest<CancelCrateReservationResponse>(
        `/crate-reservations/${crateReservationID}`,
        {
          method: 'DELETE',
        },
      ),
    {
      onSuccess: (response) => {
        const { adoptionEventID, date } = response.crateReservation;
        const key = makeCrateReservationsKey(adoptionEventID, date);
        queryClient.invalidateQueries(key);
      },
    },
  );
};
