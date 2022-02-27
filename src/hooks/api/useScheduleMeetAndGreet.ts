import { useMutation } from 'react-query';
import { apiRequest } from '../../utils/api';

export type ScheduleMeetAndGreetRequest = {
  animalID: number;
  timestamp: string;
  potentialAdopterName: string,
  fullyVaccinated: boolean;
}

export const useScheduleMeetAndGreet = (
  adoptionEventID: number,
  date?: string,
) => useMutation(
  ['reserve-crate', adoptionEventID, 'date', date],
  (request: ScheduleMeetAndGreetRequest) => apiRequest(`/adoption-events/${adoptionEventID}/dates/${date}/meet-and-greets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request),
  }),
);
