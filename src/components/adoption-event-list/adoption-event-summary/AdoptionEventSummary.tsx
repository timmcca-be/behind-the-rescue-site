import React from 'react';
import { Link } from 'react-router-dom';
import { AdoptionEventDto } from '../../../models/AdoptionEventDto';
import { FaCalendar, FaDotCircle } from 'react-icons/fa';
import styles from './AdoptionEventSummary.module.css';
import sharedStyles from '../../common/sharedStyles.module.css';
import { AdoptionEventIcon } from './adoption-event-icon/AdoptionEventIcon';
import { format, parseISO } from 'date-fns';

export type AdoptionEventSummaryProps = {
  adoptionEvent: AdoptionEventDto;
};

export const AdoptionEventSummary = ({
  adoptionEvent,
}: AdoptionEventSummaryProps) => {
  const dayOfWeek = `${adoptionEvent.dayOfWeek[0]}${adoptionEvent.dayOfWeek
    .substring(1)
    .toLowerCase()}`;
  const nextOccurrenceDate = format(
    parseISO(adoptionEvent.nextOccurrenceDate),
    'MMM d',
  );

  return (
    <li>
      <Link
        to={`/adoption-events/${adoptionEvent.id}`}
        className={styles.adoptionEvent}
      >
        <AdoptionEventIcon adoptionEvent={adoptionEvent} />
        <section>
          <h3 className={styles.eventName}>{adoptionEvent.name}</h3>
          <span className={styles.date}>
            <span>
              <FaCalendar title="Day of week" className={sharedStyles.icon} />
              {dayOfWeek}s
            </span>
            <span>
              <FaDotCircle
                title="Next occurrence"
                className={sharedStyles.icon}
              />
              Upcoming on {nextOccurrenceDate}
            </span>
          </span>
        </section>
      </Link>
    </li>
  );
};
