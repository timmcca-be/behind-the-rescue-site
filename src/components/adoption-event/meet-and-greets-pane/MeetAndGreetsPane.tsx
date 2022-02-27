import React from 'react';
import { useMeetAndGreets } from '../../../hooks/api/useMeetAndGreets';
import styles from './MeetAndGreetsPane.module.css';
import sharedStyles from '../../common/sharedStyles.module.css';
import { AnimalLink } from '../../common/animal/animal-link/AnimalLink';
import { Spinner } from '../../common/spinner/Spinner';

export type MeetAndGreetsPaneProps = {
  adoptionEventID: number;
  date: string;
};

export const MeetAndGreetsPane = ({
  adoptionEventID,
  date,
}: MeetAndGreetsPaneProps) => {
  const { data, isLoading } = useMeetAndGreets(adoptionEventID, date);

  return (
    <>
      {data != null && data.meetAndGreets.length > 0 && (
        <ul className={[sharedStyles.list, styles.meetAndGreets].join(' ')}>
          {data?.meetAndGreets.map((meetAndGreet) => (
            <AnimalLink key={meetAndGreet.id} animal={meetAndGreet.animal} />
          ))}
        </ul>
      )}
      {isLoading && <Spinner />}
      {data?.meetAndGreets.length === 0 && 'None yet!'}
    </>
  );
};
