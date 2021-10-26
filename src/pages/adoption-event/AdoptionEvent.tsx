import { format, parseISO } from 'date-fns';
import React from 'react';
import { FaCalendar } from 'react-icons/fa';
import { useParams } from 'react-router';
import { CrateStacks } from '../../components/adoption-event/crate-stacks/CrateStacks';
import { useAdoptionEvent } from '../../hooks/useAdoptionEvent';
import { useCrateReservations } from '../../hooks/useCrateReservations';
import { CrateSize } from '../../models/CrateSize';
import styles from './AdoptionEvent.module.css';

export type AdoptionEventParams = {
  adoptionEventID: string;
}

export const AdoptionEvent = () => {
  const adoptionEventID = Number.parseInt(useParams<AdoptionEventParams>().adoptionEventID);
  const adoptionEvent = useAdoptionEvent(adoptionEventID).data?.adoptionEvent;
  const crateReservations = useCrateReservations(adoptionEventID, adoptionEvent?.nextOccurrenceDate).data?.crateReservations;
  const nextOccurrenceDate = adoptionEvent ? format(parseISO(adoptionEvent.nextOccurrenceDate), 'EEEE, MMM d') : '';
  
  return (
    <>
      <h1 className={styles.title}>{adoptionEvent?.name}</h1>
      <span><FaCalendar className={styles.icon} /> {nextOccurrenceDate}</span>
      <CrateStacks crateStacks={[
        [{ size: CrateSize.ExtraLarge }],
        [{ size: CrateSize.Large }, { size: CrateSize.Large }],
        [{ size: CrateSize.Large, isEmpty: true }, { size: CrateSize.Large }],
        [{ size: CrateSize.Medium }, { size: CrateSize.Medium }],
        [{ size: CrateSize.Medium }, { size: CrateSize.Small }],
        [{ size: CrateSize.Medium }],
        [{ size: CrateSize.Small }],
        [{ size: CrateSize.Small }],
      ]}/>
      <ul>
        {
          crateReservations?.map((crateReservation) => (
            <p key={crateReservation.id}>{crateReservation.crateSize}</p>
          ))
        }
      </ul>
    </>
  );
}
