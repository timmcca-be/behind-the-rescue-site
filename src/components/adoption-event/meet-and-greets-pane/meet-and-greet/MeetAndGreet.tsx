import React from 'react';
import { useCancelMeetAndGreet } from '../../../../hooks/api/useCancelMeetAndGreet';
import { MeetAndGreetDto } from '../../../../models/MeetAndGreetDto';
import { AnimalLink } from '../../../common/animal/animal-link/AnimalLink';
import styles from './MeetAndGreet.module.css';
import sharedStyles from '../../../common/sharedStyles.module.css';
import { FaClock } from 'react-icons/fa';
import { CancelButton } from '../../../common/cancel-button/CancelButton';
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import { NotFullyVaccinatedWarning } from '../../../common/not-fully-vaccinated-warning/NotFullyVaccinatedWarning';

export type MeetAndGreetProps = {
  meetAndGreet: MeetAndGreetDto;
  timeZone: string;
};

export const MeetAndGreet = ({ meetAndGreet, timeZone }: MeetAndGreetProps) => {
  const cancelMeetAndGreetMutation = useCancelMeetAndGreet(meetAndGreet.id);

  const time = format(
    utcToZonedTime(meetAndGreet.timestamp, timeZone),
    'h:mm a',
  );

  return (
    <article className={styles.meetAndGreet}>
      <header className={styles.header}>
        <span className={styles.time}>
          <FaClock title="Crate size" className={sharedStyles.icon} />
          {time} with {meetAndGreet.potentialAdopterName}
        </span>
        <CancelButton
          confirmationMessage="Are you sure you want to cancel this reservation?"
          onCancel={() => cancelMeetAndGreetMutation.mutate()}
        />
      </header>
      {!meetAndGreet.fullyVaccinated && <NotFullyVaccinatedWarning />}
      <AnimalLink animal={meetAndGreet.animal} />
    </article>
  );
};
