import { useMutation, useQueryClient } from 'react-query';
import { CanceledMeetAndGreetDto } from '../../models/CanceledMeetAndGreetDto';
import { apiRequest } from '../../utils/api';
import { makeMeetAndGreetsKey } from './useMeetAndGreets';

type CancelMeetAndGreetResponse = {
  meetAndGreet: CanceledMeetAndGreetDto;
};

export const useCancelMeetAndGreet = (meetAndGreetID: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['cancel-meet-and-greet', meetAndGreetID],
    () =>
      apiRequest<CancelMeetAndGreetResponse>(
        `/meet-and-greets/${meetAndGreetID}`,
        {
          method: 'DELETE',
        },
      ),
    {
      onSuccess: (response) => {
        const { adoptionEventID, date } = response.meetAndGreet;
        const key = makeMeetAndGreetsKey(adoptionEventID, date);
        queryClient.invalidateQueries(key);
      },
    },
  );
};
