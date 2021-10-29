import React, { useState } from 'react';
import { AdoptionEventSummary } from '../../components/adoption-event-list/adoption-event-summary/AdoptionEventSummary';
import { useAdoptionEvents } from '../../hooks/useAdoptionEvents';
import { AdoptionEventDto } from '../../models/AdoptionEventDto';
import styles from './AdoptionEventList.module.css';

export const AdoptionEventList = () => {
  const { data } = useAdoptionEvents();
  const [filter, setFilter] = useState<string | null>(null);
  const locations = new Set<string>();
  data?.adoptionEvents.forEach((adoptionEvent) => locations.add(adoptionEvent.location));
  let adoptionEvents: AdoptionEventDto[] | undefined;
  if (filter) {
    adoptionEvents = data?.adoptionEvents.filter((adoptionEvent) => adoptionEvent.location === filter);
  } else {
    adoptionEvents = data?.adoptionEvents;
  }

  return (
    <>
      <h2>Adoption Events</h2>
      <section className={styles.filters}>
        <label>Location:</label>
        {
          Array.from(locations).map((location) => (
            <button
              key={location}
              className={location === filter ? styles.selectedFilterButton : styles.filterButton}
              onClick={() => setFilter(location === filter ? null : location)}
            >
              {location}
            </button>
          ))
        }
        {
          filter && (
            <button
              className={styles.clearFilterButton}
              onClick={() => setFilter(null)}
            >
              Clear filter
            </button>
          )
        }
      </section>
      <ul className={styles.adoptionEvents}>
        {
          adoptionEvents?.map((adoptionEvent) => (
            <AdoptionEventSummary
              adoptionEvent={adoptionEvent}
              key={adoptionEvent.id}
            />
          ))
        }
      </ul>
    </>
  )
}
