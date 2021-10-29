import React from 'react';
import { format, parseISO } from 'date-fns';
import { FaCalendar } from 'react-icons/fa';
import { useParams } from 'react-router';
import { CrateStacks } from '../../components/adoption-event/crate-stacks/CrateStacks';
import { useAdoptionEvent } from '../../hooks/useAdoptionEvent';
import { useCrateReservations } from '../../hooks/useCrateReservations';
import styles from './AdoptionEvent.module.css';
import sharedStyles from '../../components/common/sharedStyles.module.css';
import { CrateReservation } from '../../components/adoption-event/crate-reservation/CrateReservation';
import { Link } from 'react-router-dom';

export type AdoptionEventParams = {
  adoptionEventID: string;
}

export const AdoptionEvent = () => {
  const params = useParams<AdoptionEventParams>();
  const adoptionEventID = Number.parseInt(params.adoptionEventID);

  const adoptionEvent = useAdoptionEvent(adoptionEventID).data?.adoptionEvent;
  const { data: crateData } = useCrateReservations(adoptionEventID, adoptionEvent?.nextOccurrenceDate);

  const nextOccurrenceDate = adoptionEvent ? format(parseISO(adoptionEvent.nextOccurrenceDate), 'EEEE, MMM d') : '';

  return (
    <>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{adoptionEvent?.name}</h1>
          <span><FaCalendar className={sharedStyles.icon} /> {nextOccurrenceDate}</span>
        </div>
        <Link
          to={`/adoption-events/${adoptionEventID}/reserve-crate`}
          className={styles.reserveButton}
        >
          Reserve a crate
        </Link>
      </div>
      {
        crateData && (
          <>
            <CrateStacks crateStacks={crateData.crateStacks} />
            {
              crateData.crateReservations.map((crateReservation) => (
                <CrateReservation
                  key={crateReservation.id}
                  crateReservation={crateReservation}
                />
              ))
            }
          </>
        )
      }
    </>
  );
}
