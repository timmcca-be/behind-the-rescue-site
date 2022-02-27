import React from 'react';
import { useMeetAndGreets } from '../../../hooks/api/useMeetAndGreets';
import styles from './MeetAndGreetsPane.module.css';
import sharedStyles from '../../common/sharedStyles.module.css';
import { Spinner } from '../../common/spinner/Spinner';
import { MeetAndGreet } from './meet-and-greet/MeetAndGreet';

export type MeetAndGreetsPaneProps = {
  adoptionEventID: number;
  date: string;
  timeZone: string;
};

export const MeetAndGreetsPane = ({
  adoptionEventID,
  date,
  timeZone,
}: MeetAndGreetsPaneProps) => {
  const { data, isLoading } = useMeetAndGreets(adoptionEventID, date);

  return (
    <>
      {data != null && data.meetAndGreets.length > 0 && (
        <ul className={[sharedStyles.list, styles.meetAndGreets].join(' ')}>
          {data?.meetAndGreets.map((meetAndGreet) => (
            <MeetAndGreet
              key={meetAndGreet.id}
              meetAndGreet={meetAndGreet}
              timeZone={timeZone}
            />
          ))}
        </ul>
      )}
      {isLoading && <Spinner />}
      {data?.meetAndGreets.length === 0 && 'None yet!'}
    </>
  );
};
