import { useQuery } from 'react-query';
import { AdoptionEventDto } from '../../models/AdoptionEventDto';
import { apiRequest } from '../../utils/api';

export type GetAdoptionEventResponse = {
  adoptionEvent: AdoptionEventDto;
};

export const useAdoptionEvent = (adoptionEventID: number) =>
  useQuery(['adoption-event', adoptionEventID], () =>
    apiRequest<GetAdoptionEventResponse>(`/adoption-events/${adoptionEventID}`),
  );
