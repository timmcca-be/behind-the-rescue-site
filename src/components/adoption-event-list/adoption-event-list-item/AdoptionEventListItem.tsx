import React from 'react';
import { Link } from 'react-router-dom';
import { AdoptionEvent } from '../../../models/AdoptionEvent';
import { FaCalendar, FaDotCircle } from 'react-icons/fa';
import styles from './AdoptionEventListItem.module.css';
import { AdoptionEventIcon } from './adoption-event-icon/AdoptionEventIcon';
import { format, parseISO } from 'date-fns';

export type AdoptionEventListItemProps = {
  adoptionEvent: AdoptionEvent;
}

export const AdoptionEventListItem = ({ adoptionEvent }: AdoptionEventListItemProps) => {
  const dayOfWeek = `${adoptionEvent.dayOfWeek[0]}${adoptionEvent.dayOfWeek.substring(1).toLowerCase()}`;
  const nextOccurrenceDate = format(parseISO(adoptionEvent.nextOccurrenceDate), 'MMM d');

  return (
    <Link
      to={`/adoption-events/${adoptionEvent.id}`}
      className={styles.link}
    >
      <li className={styles.adoptionEvent}>
        <AdoptionEventIcon adoptionEvent={adoptionEvent} />
        <section>
          <h3 className={styles.eventName}>{adoptionEvent.name}</h3>
          <span className={styles.date}>
            <span><FaCalendar className={styles.icon} /> {dayOfWeek}s</span>
            <span><FaDotCircle className={styles.icon} /> Upcoming on {nextOccurrenceDate}</span>
          </span>
        </section>
      </li>
    </Link>
  );
}
