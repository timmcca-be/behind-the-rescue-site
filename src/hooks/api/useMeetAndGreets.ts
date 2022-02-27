import { useQuery } from 'react-query';
import { MeetAndGreetDto } from '../../models/MeetAndGreetDto';
import { apiRequest } from '../../utils/api';

export type GetMeetAndGreetsResponse = {
  meetAndGreets: MeetAndGreetDto[];
};

export const makeMeetAndGreetsKey = (
  adoptionEventID: number,
  date?: string,
) => ['adoption-event', adoptionEventID, 'date', date, 'meet-and-greets'];

export const useMeetAndGreets = (adoptionEventID: number, date?: string) =>
  useQuery(
    makeMeetAndGreetsKey(adoptionEventID, date),
    () =>
      apiRequest<GetMeetAndGreetsResponse>(
        `/adoption-events/${adoptionEventID}/dates/${date}/meet-and-greets`,
      ),
    { enabled: date !== undefined },
  );
